import { useState } from 'react';
import { CalendarView } from '@/components/Calendar/CalendarView';
import type { CalendarEvent } from '@/types';

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly sync with the team',
      startDate: new Date(2025, 9, 25, 10, 0),
      endDate: new Date(2025, 9, 25, 11, 0),
      color: '#3b82f6',
      category: 'Work',
    },
    {
      id: '2',
      title: 'Project Review',
      description: 'Q4 project review',
      startDate: new Date(2025, 9, 26, 14, 0),
      endDate: new Date(2025, 9, 26, 16, 0),
      color: '#10b981',
      category: 'Meeting',
    },
  ]);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, { ...event, id: crypto.randomUUID() }]);
    console.log('Event added:', event);
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
    console.log('Event updated:', id, updates);
  };

  const handleEventDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    console.log('Event deleted:', id);
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Professional Calendar
          </h1>
          <p className="text-neutral-600">
            A Google Calendar-inspired component for scheduling and managing events
          </p>
        </header>
        <CalendarView
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          initialDate={new Date(2025, 9, 1)}
          initialView="month"
          className="shadow-lg rounded-xl"
        />
      </div>
    </div>
  );
}

export default App;