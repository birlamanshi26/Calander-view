// src/types/index.ts
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  category?: string;
}

export type ViewMode = 'month' | 'week';

export interface FormErrors {
  [key: string]: string;
}

export interface CalendarViewProps {
  events?: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete?: (id: string) => void;
  initialView?: ViewMode;
  initialDate?: Date;
  className?: string;
}