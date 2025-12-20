import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  allowCustom?: boolean;
  customLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  allowCustom = true,
  customLabel = "Add custom value",
  disabled = false,
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [showCustomInput, setShowCustomInput] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    if (!search) return options;
    const lowerSearch = search.toLowerCase();
    return options.filter((option) =>
      option.toLowerCase().includes(lowerSearch)
    );
  }, [options, search]);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
    setSearch("");
    setShowCustomInput(false);
    setCustomValue("");
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onChange(customValue.trim());
      setOpen(false);
      setSearch("");
      setShowCustomInput(false);
      setCustomValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && showCustomInput) {
      e.preventDefault();
      handleCustomSubmit();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[200px] p-0" align="start">
        <div className="p-2">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 && !allowCustom && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          )}
          {filteredOptions.map((option) => (
            <div
              key={option}
              className={cn(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground mx-1",
                value === option && "bg-accent text-accent-foreground"
              )}
              onClick={() => handleSelect(option)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === option ? "opacity-100" : "opacity-0"
                )}
              />
              {option}
            </div>
          ))}
          {allowCustom && (
            <>
              {!showCustomInput ? (
                <div
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground mx-1 border-t mt-1 pt-2 text-muted-foreground"
                  onClick={() => setShowCustomInput(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {customLabel}
                </div>
              ) : (
                <div className="p-2 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter custom value..."
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={handleCustomSubmit}
                      disabled={!customValue.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
