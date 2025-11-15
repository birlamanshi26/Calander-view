// src/components/Calendar/MonthView.tsx
import { useMemo } from 'react';
import CalendarCell from './CalendarCell';  // default import
import { getCalendarGrid, isSameDay } from '@/utils/date.utils';
import { getEventsForDay } from '@/utils/event.utils';
import type { CalendarEvent } from '@/types';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  selectedDate: Date | null;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onDateClick,
  selectedDate,
}) => {
  const calendarGrid = useMemo(() => getCalendarGrid(currentDate), [currentDate]);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-px bg-neutral-200 rounded-lg overflow-hidden">
      {/* Weekday Headers */}
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="bg-neutral-100 text-neutral-600 text-sm font-medium text-center py-2"
        >
          {day}
        </div>
      ))}

      {/* Calendar Grid */}
      {calendarGrid.map((date) => {
        const dayEvents = getEventsForDay(events, date);
        const isCurrentMonth = date.getMonth() === currentDate.getMonth();
        const isToday = isSameDay(date, new Date());
        const isSelected = selectedDate && isSameDay(date, selectedDate);

        return (
          <CalendarCell
            key={date.toISOString()}
            date={date}
            events={dayEvents}
            isCurrentMonth={isCurrentMonth}
            isToday={isToday}
           isSelected={!!isSelected}
            onClick={() => onDateClick(date)}
          />
        );
      })}
    </div>
  );
};