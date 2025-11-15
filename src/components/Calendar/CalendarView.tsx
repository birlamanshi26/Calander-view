// src/components/Calendar/CalendarView.tsx
import { useState, useCallback } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import type { CalendarViewProps, ViewMode } from '@/types';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { Button } from '../primitives/Button';
import { Select } from '../primitives/Select';
import { formatDate } from '@/utils/date.utils';
import { cn } from '@/utils/classnames.utils';
// Line 12
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';  // Remove , List

export const CalendarView: React.FC<CalendarViewProps> = ({
  events = [],
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = 'month',
  initialDate = new Date(),
  className,
}) => {
  const {
    currentDate,
    view,
    setView,
    goToNextMonth,
    goToPreviousMonth,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    selectedDate,
    selectDate,
    clearSelection,
  } = useCalendar(initialDate, initialView);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = useCallback(
    (date: Date) => {
      selectDate(date);
      setIsModalOpen(true);
    },
    [selectDate]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    clearSelection();
  }, [clearSelection]);

  const viewOptions = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
  ];

  return (
    <div className={cn('bg-white rounded-xl shadow-lg p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={view === 'month' ? goToPreviousMonth : goToPreviousWeek}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={view === 'month' ? goToNextMonth : goToNextWeek}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <h2 className="text-xl font-semibold text-neutral-900">
            {formatDate(currentDate, view === 'month' ? 'MMMM yyyy' : 'MMM d, yyyy')}
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            value={view}
            onChange={(value) => setView(value as ViewMode)}
            options={viewOptions}
            aria-label="View mode"
          />
          <Button onClick={() => setIsModalOpen(true)}>
            <Calendar className="h-5 w-5 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      {view === 'month' ? (
        <MonthView
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
        />
      ) : (
        <WeekView
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
        />
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedDate={selectedDate}
        events={events}
        onEventAdd={onEventAdd}
        onEventUpdate={onEventUpdate}
        onEventDelete={onEventDelete}
      />
    </div>
  );
};


