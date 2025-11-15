// src/hooks/useCalendar.ts
import { useState, useCallback } from 'react';
import type { ViewMode } from '@/types';
import { addMonths, addDays } from '@/utils/date.utils';

export const useCalendar = (
  initialDate: Date = new Date(),
  initialView: ViewMode = 'month'
) => 
  {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [view, setView] = useState<ViewMode>(initialView);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1));
  }, []);

  const goToPreviousMonth = useCallback(() => {

    setCurrentDate((prev) => addMonths(prev, -1));

  }, []);

  const goToNextWeek = useCallback(() => {
    setCurrentDate((prev) => addDays(prev, 7));
  }, []);

  const goToPreviousWeek = useCallback(() => {
    setCurrentDate((prev) => addDays(prev, -7));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedDate(null);
  }, []);

  return {
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
  };
};