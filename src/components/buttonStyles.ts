import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'neutral';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white shadow-brand hover:bg-brand-hover',
  secondary: 'border border-brand text-brand-text bg-transparent hover:bg-brand-tint',
  neutral: 'border border-line text-navy bg-surface hover:bg-paper',
};

export function buttonStyles(variant: ButtonVariant = 'primary', className?: string) {
  return cn(
    'tap-target flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out active:scale-[0.98]',
    VARIANT_CLASSES[variant],
    className
  );
}
