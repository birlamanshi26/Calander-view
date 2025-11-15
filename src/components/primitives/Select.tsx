import { cn } from '@/utils/classnames.utils';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  'aria-label'?: string;
}

export const Select: React.FC<SelectProps> = ({ value, onChange, options, className, ...props }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'h-10 px-3 rounded-md border border-neutral-300 bg-white text-neutral-900 focus-ring',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};