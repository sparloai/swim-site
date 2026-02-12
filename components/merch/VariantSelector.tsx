'use client';

import { clsx } from 'clsx';
import type { ProductOption, ProductVariant } from '@/lib/types';

export function VariantSelector({
  options,
  variants,
  selectedOptions,
  onSelect,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  selectedOptions: Record<string, string>;
  onSelect: (name: string, value: string) => void;
}) {
  const filteredOptions = options.filter((opt) => opt.values.length > 0);

  return (
    <div className="space-y-6">
      {filteredOptions.map((option) => (
        <div key={option.id}>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
            {option.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              const matchingVariant = variants.find((v) =>
                v.selectedOptions.some(
                  (so) => so.name === option.name && so.value === value,
                ),
              );
              const isAvailable = matchingVariant?.availableForSale ?? false;

              return (
                <button
                  key={value}
                  onClick={() => onSelect(option.name, value)}
                  disabled={!isAvailable}
                  className={clsx(
                    'min-h-[44px] min-w-[44px] border px-4 py-2 text-sm uppercase tracking-wider transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                    isSelected
                      ? 'border-white bg-white text-black'
                      : 'border-border text-white hover:border-white/50',
                    !isAvailable && 'cursor-not-allowed opacity-30',
                  )}
                  aria-pressed={isSelected}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
