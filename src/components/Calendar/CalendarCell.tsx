// src/components/Calendar/CalendarCell.tsx
import React from 'react';
import type { CalendarEvent } from '@/types';

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isSelected?: boolean;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  onClick?: (date: Date) => void;
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  events,
  isSelected = false,
  isToday = false,
  isCurrentMonth = true,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(date);
  };

  return (
    <div
      className={`
        calendar-cell p-2 min-h-20 bg-white border border-neutral-200 cursor-pointer
        ${!isCurrentMonth ? 'text-neutral-400' : ''}
        ${isToday ? 'ring-2 ring-blue-500' : ''}
        ${isSelected ? 'bg-blue-100' : ''}
      `}
      onClick={handleClick}
    >
      <div className="text-sm font-medium">{date.getDate()}</div>
      {events.length > 0 && (
        <div className="mt-1 space-y-1">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="text-xs truncate rounded px-1"
              style={{ backgroundColor: (event.color || '#3b82f6') + '20' }}
              title={event.title}
            >
              {event.title}
            </div>
          ))}
          {events.length > 3 && (
            <div className="text-xs text-neutral-500">+{events.length - 3} more</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarCell;  // default export