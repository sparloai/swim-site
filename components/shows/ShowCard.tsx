type ShowCardProps = {
  date: string;
  title: string;
  venue: string;
  city: string;
  time: string;
  ticketLink?: string;
};

export function ShowCard({ date, title, venue, city, time, ticketLink }: ShowCardProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-8">
        <span className="text-sm font-semibold uppercase tracking-widest text-white">
          {date}
        </span>
        <span className="text-lg font-semibold text-white">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted">{venue}</span>
        <span className="text-sm text-muted">&middot;</span>
        <span className="text-sm text-muted">{city}</span>
        <span className="text-sm text-muted">&middot;</span>
        <span className="text-sm text-muted">{time}</span>
        {ticketLink && (
          <a
            href={ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 min-h-[44px] inline-flex items-center border border-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Tickets
          </a>
        )}
      </div>
    </div>
  );
}
