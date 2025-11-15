// src/utils/event.utils.ts
import type { CalendarEvent } from '@/types';
// Line 3
import { daysBetween, formatDate } from './date.utils';  // Remove , isSameDay

/**
 * Get all events for a specific day
 */
export const getEventsForDay = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    return eventStart <= dayEnd && eventEnd >= dayStart;
  });
};

/**
 * Sort events by start date
 */
export const sortEventsByDate = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

/**
 * Filter events by category
 */
export const filterEventsByCategory = (
  events: CalendarEvent[],
  category: string
): CalendarEvent[] => {
  return events.filter(event => event.category === category);
};

/**
 * Get unique categories from events
 */
export const getUniqueCategories = (events: CalendarEvent[]): string[] => {
  const categories = events.map(e => e.category).filter(Boolean) as string[];
  return Array.from(new Set(categories));
};

/**
 * Check if an event overlaps with another
 */
export const eventsOverlap = (event1: CalendarEvent, event2: CalendarEvent): boolean => {
  return (
    event1.startDate < event2.endDate &&
    event1.endDate > event2.startDate
  );
};

/**
 * Get overlapping events for a given event
 */
export const getOverlappingEvents = (
  event: CalendarEvent,
  allEvents: CalendarEvent[]
): CalendarEvent[] => {
  return allEvents.filter(e => e.id !== event.id && eventsOverlap(event, e));
};

/**
 * Format the duration of an event
 */
export const formatEventDuration = (event: CalendarEvent): string => {
  const start = event.startDate;
  const end = event.endDate;
  const minutes = (end.getTime() - start.getTime()) / (1000 * 60);
  const hours = minutes / 60;
  const days = daysBetween(start, end);

  if (days >= 1) {
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  if (hours >= 1) {
    return `${Math.round(hours)} hour${hours >= 2 ? 's' : ''}`;
  }
  return `${Math.round(minutes)} minute${minutes >= 2 ? 's' : ''}`;
};

/**
 * Check if an event is an all-day event
 */
export const isAllDayEvent = (event: CalendarEvent): boolean => {
  const start = event.startDate;
  const end = event.endDate;
  return (
    start.getHours() === 0 &&
    start.getMinutes() === 0 &&
    end.getHours() === 23 &&
    end.getMinutes() === 59
  );
};

/**
 * Get the display time for an event
 */
export const getEventTimeDisplay = (event: CalendarEvent): string => {
  if (isAllDayEvent(event)) {
    return 'All day';
  }
  return `${formatDate(event.startDate, 'HH:mm a')} - ${formatDate(event.endDate, 'HH:mm a')}`;
};