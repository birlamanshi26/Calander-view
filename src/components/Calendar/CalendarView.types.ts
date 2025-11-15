// src/components/Calendar/CalendarView.types.ts
import type { CalendarEvent, ViewMode, FormErrors } from '@/types';  // Add `type`
/**
 * Props for the CalendarView component
 */
export interface CalendarViewProps {
  /** Array of events to display */
  events?: CalendarEvent[];
  /** Callback when a new event is added */
  onEventAdd?: (event: CalendarEvent) => void;
  /** Callback when an event is updated */
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  /** Callback when an event is deleted */
  onEventDelete?: (id: string) => void;
  /** Initial view mode */
  initialView?: ViewMode;
  /** Initial date to display */
  initialDate?: Date;
  /** Additional CSS classes */
  className?: string;
}

/**
 * State for the CalendarView component, extending the global CalendarState
 */
export interface CalendarViewState {
  /** Current date being viewed */
  currentDate: Date;
  /** Current view mode (month or week) */
  view: ViewMode;
  /** Selected date for event creation/editing */
  selectedDate: Date | null;
  /** Array of selected dates for range selection */
  selectedDates: Date[];
  /** Whether the event modal is open */
  isModalOpen: boolean;
}

/**
 * Props for the MonthView component
 */
export interface MonthViewProps {
  /** Current date for the month view */
  currentDate: Date;
  /** Array of events to display */
  events: CalendarEvent[];
  /** Callback for when a date is clicked */
  onDateClick: (date: Date) => void;
  /** Selected date for highlighting */
  selectedDate: Date | null;
}

/**
 * Props for the WeekView component
 */
export interface WeekViewProps {
  /** Current date for the week view */
  currentDate: Date;
  /** Array of events to display */
  events: CalendarEvent[];
  /** Callback for when a time slot or event is clicked */
  onDateClick: (date: Date) => void;
  /** Selected date for highlighting */
  selectedDate: Date | null;
}

/**
 * Props for the CalendarCell component
 */
export interface CalendarCellProps {
  /** Date for the cell */
  date: Date;
  /** Events for the specific date */
  events: CalendarEvent[];
  /** Whether the date is in the current month */
  isCurrentMonth: boolean;
  /** Whether the date is today */
  isToday: boolean;
  /** Whether the date is selected */
  isSelected: boolean;
  /** Callback for when the cell is clicked */
  onClick: () => void;
}

/**
 * Props for the EventModal component
 */
export interface EventModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Selected date for the event */
  selectedDate: Date | null;
  /** Array of all events for reference */
  events: CalendarEvent[];
  /** Callback for adding a new event */
  onEventAdd?: (event: CalendarEvent) => void;
  /** Callback for updating an existing event */
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  /** Callback for deleting an event */
  onEventDelete?: (id: string) => void;
}

/**
 * Form data for event creation/editing
 */
export interface EventFormData {
  /** Event title */
  title: string;
  /** Event description */
  description?: string;
  /** Start date and time */
  startDate: Date;
  /** End date and time */
  endDate: Date;
  /** Event color */
  color?: string;
  /** Event category */
  category?: string;
}

/**
 * Re-export types from calendar.types.ts for convenience
 */
export type { CalendarEvent, ViewMode, FormErrors };