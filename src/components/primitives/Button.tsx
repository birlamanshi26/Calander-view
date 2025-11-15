import { cn } from '@/utils/classnames.utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-ring',
          variant === 'default' &&
            'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
          variant === 'outline' &&
            'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100',
          variant === 'ghost' && 'bg-transparent text-neutral-900 hover:bg-neutral-100',
          size === 'default' && 'h-10 px-4 py-2',
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'lg' && 'h-12 px-6 text-lg',
          size === 'icon' && 'h-10 w-10',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';