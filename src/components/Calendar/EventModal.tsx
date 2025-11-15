// src/components/Calendar/EventModal.tsx
import { useState, useEffect } from 'react';
import type { CalendarEvent, FormErrors } from '@/types';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';
import { formatDate, addDays, isSameDay } from '@/utils/date.utils';
import { cn } from '@/utils/classnames.utils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  events: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete?: (id: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
}) => {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    startDate: selectedDate || new Date(),
    endDate: addDays(selectedDate || new Date(), 1),
    color: '#0ea5e9',
    category: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate) {
      const event = events.find((e) => isSameDay(e.startDate, selectedDate));
      if (event) {
        setFormData(event);
        setEditingEventId(event.id);
      } else {
        setFormData({
          title: '',
          description: '',
          startDate: selectedDate,
          endDate: addDays(selectedDate, 1),
          color: '#0ea5e9',
          category: '',
        });
        setEditingEventId(null);
      }
    }
  }, [selectedDate, events]);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (formData.title && formData.title.length > 100)
      newErrors.title = 'Title must be 100 characters or less';
    if (formData.description && formData.description.length > 500)
      newErrors.description = 'Description must be 500 characters or less';
    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate)
      newErrors.endDate = 'End date must be after start date';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const event: CalendarEvent = {
      id: editingEventId || crypto.randomUUID(),
      title: formData.title || '',
      description: formData.description,
      startDate: formData.startDate || new Date(),
      endDate: formData.endDate || addDays(new Date(), 1),
      color: formData.color,
      category: formData.category,
    };

    if (editingEventId) {
      onEventUpdate?.(editingEventId, event);
    } else {
      onEventAdd?.(event);
    }
    onClose();
  };

  const handleDelete = () => {
    if (editingEventId) {
      onEventDelete?.(editingEventId);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingEventId ? 'Edit Event' : 'New Event'}>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={cn(
              'mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2',
              errors.title && 'border-red-500'
            )}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={cn(
              'mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2',
              errors.description && 'border-red-500'
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700">
            Start Date
          </label>
          <input
            id="startDate"
            type="datetime-local"
            value={formatDate(formData.startDate || new Date(), 'yyyy-MM-ddTHH:mm')}
            onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
            className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700">
            End Date
          </label>
          <input
            id="endDate"
            type="datetime-local"
            value={formatDate(formData.endDate || new Date(), 'yyyy-MM-ddTHH:mm')}
            onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
            className={cn(
              'mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2',
              errors.endDate && 'border-red-500'
            )}
          />
          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium text-neutral-700">
            Color
          </label>
          <input
            id="color"
            type="color"
            value={formData.color || '#0ea5e9'}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="mt-1 block w-full h-10 rounded-md border border-neutral-300"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-700">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>

        <div className="flex justify-end space-x-2">
          {editingEventId && (
            <Button variant="outline" onClick={handleDelete} className="text-red-500">
              Delete
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};