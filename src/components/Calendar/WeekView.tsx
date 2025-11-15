import { useMemo } from 'react';
import { formatDate, startOfWeek, addDays } from '@/utils/date.utils';
import { getEventsForDay } from '@/utils/event.utils';
import type { CalendarEvent } from '@/types';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  selectedDate: Date | null;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDateClick,
}) => {
  const weekStart = startOfWeek(currentDate);
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex flex-col bg-neutral-200 rounded-lg overflow-hidden">
      {/* Weekday Headers */}
      <div className="grid grid-cols-8 gap-px">
        <div className="bg-neutral-100" /> {/* Empty cell for time column */}
        {weekDays.map((date) => (
          <div
            key={date.toISOString()}
            className="bg-neutral-100 text-neutral-600 text-sm font-medium text-center py-2"
          >
            {formatDate(date, 'EEE d')}
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="relative grid grid-cols-8 gap-px h-[720px] overflow-y-auto scrollbar-hide">
        {/* Time Labels */}
        <div className="bg-neutral-100">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-12 text-sm text-neutral-600 text-right pr-2 border-b border-neutral-200"
            >
              {formatDate(new Date(new Date().setHours(hour, 0, 0, 0)), 'HH:mm')}
            </div>
          ))}
        </div>

        {/* Day Columns */}
        {weekDays.map((date) => {
          const dayEvents = getEventsForDay(events, date);

          return (
            <div key={date.toISOString()} className="relative bg-white">
              {Array.from({ length: 24 }).map((_, hour) => (
                <div
                  key={hour}
                  className="h-12 border-b border-neutral-200"
                  onClick={() => onDateClick(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, 0, 0, 0))}
                />
              ))}
              {dayEvents.map((event) => {
                const startHour = event.startDate.getHours();
                const startMinutes = event.startDate.getMinutes();
                const endHour = event.endDate.getHours();
                const endMinutes = event.endDate.getMinutes();
                const top = startHour * 48 + (startMinutes / 60) * 48;
                const height =
                  ((endHour * 60 + endMinutes - (startHour * 60 + startMinutes)) / 60) * 48;

                return (
                  <div
                    key={event.id}
                    className="absolute left-1 right-1 rounded-md p-1 text-sm text-white cursor-pointer"
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      backgroundColor: event.color || '#0ea5e9',
                    }}
                    onClick={() => onDateClick(event.startDate)}
                  >
                    {event.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};