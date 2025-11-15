/**
 * Format a date using a simple pattern
 * @param date - Date to format
 * @param format - Format pattern (e.g., 'yyyy-MM-dd', 'MMMM yyyy')
 * @returns Formatted date string
 */
export const formatDate = (date: Date, format: string): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const map: Record<string, string> = {
    'MMMM': months[date.getMonth()],
    'MMM': months[date.getMonth()].slice(0, 3),
    'MM': String(date.getMonth() + 1).padStart(2, '0'),
    'M': String(date.getMonth() + 1),
    'yyyy': String(date.getFullYear()),
    'yy': String(date.getFullYear()).slice(-2),
    'dd': String(date.getDate()).padStart(2, '0'),
    'd': String(date.getDate()),
    'EEEE': days[date.getDay()],
    'EEE': days[date.getDay()].slice(0, 3),
    'HH': String(date.getHours()).padStart(2, '0'),
    'mm': String(date.getMinutes()).padStart(2, '0'),
    'a': date.getHours() >= 12 ? 'PM' : 'AM',
  };
  return format.replace(/MMMM|MMM|MM|M|yyyy|yy|dd|d|EEEE|EEE|HH|mm|a/g, match => map[match] || match);
};

/**
 * Check if two dates fall on the same day (ignores time)
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Get the first day of the month
 */
export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get the last day of the month
 */
export const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Get the start of the week (Sunday)
 */
export const startOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

/**
 * Add days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add months to a date
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Calculate the number of days between two dates
 * @returns Number of days (can be negative if end is before start)
 */
export const daysBetween = (start: Date, end: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((end.getTime() - start.getTime()) / msPerDay);
};

/**
 * Get the calendar grid (42 cells for month view)
 * Includes days from previous and next months to fill a 6x7 grid
 */
export const getCalendarGrid = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    grid.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return grid;
};

/**
 * Get all days in a specific month
 */
export const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysCount = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysCount }, (_, i) => new Date(year, month, i + 1));
};

/**
 * Generate time slots for a given day (e.g., 30-minute intervals)
 * @param date - Base date for the time slots
 * @param intervalMinutes - Interval between time slots (default: 30 minutes)
 * @returns Array of Date objects representing time slots
 */
export const generateTimeSlots = (date: Date, intervalMinutes: number = 30): Date[] => {
  const slots: Date[] = [];
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  for (let minutes = 0; minutes < 24 * 60; minutes += intervalMinutes) {
    const slot = new Date(startOfDay);
    slot.setMinutes(minutes);
    slots.push(slot);
  }
  return slots;
};