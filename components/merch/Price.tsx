import { clsx } from 'clsx';

export function Price({
  amount,
  currencyCode = 'USD',
  className,
}: {
  amount: string;
  currencyCode?: string;
  className?: string;
}) {
  return (
    <span className={clsx('text-white', className)}>
      {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol',
      }).format(parseFloat(amount))}
    </span>
  );
}
