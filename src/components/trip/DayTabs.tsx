import { cn } from "@/lib/utils";
import { format, addDays, differenceInDays } from "date-fns";

interface DayTabsProps {
  startDate: string;
  endDate: string;
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export const DayTabs = ({ startDate, endDate, selectedDay, onSelectDay }: DayTabsProps) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = differenceInDays(end, start) + 1;

  const days = Array.from({ length: totalDays }, (_, i) => ({
    day: i + 1,
    date: addDays(start, i),
  }));

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
      {days.map(({ day, date }) => (
        <button
          key={day}
          onClick={() => onSelectDay(day)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
            selectedDay === day
              ? "bg-foreground text-background"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          {format(date, "MMM d")}
        </button>
      ))}
    </div>
  );
};
