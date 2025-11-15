// src/components/Calendar/CalendarView.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';  // Single type-only import (correct package for React)
import type { CalendarEvent } from '@/types';  // Type-only for CalendarEvent
import { CalendarView } from './CalendarView';

const meta: Meta<typeof CalendarView> = {
  title: 'Components/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialView: { control: 'radio', options: ['month', 'week'] },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialDate: new Date(),
    initialView: 'month',
  },
};

export const WithEvents: Story = {
  args: {
    events: [
      {
        id: '1',
        title: 'Meeting',
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 60 * 1000),
        color: '#3b82f6',
      } as CalendarEvent,
    ],
  },
};