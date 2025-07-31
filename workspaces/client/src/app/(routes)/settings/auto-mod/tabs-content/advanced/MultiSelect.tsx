// MultiSelect.tsx
import React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface MultiSelectProps {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  className,
  id,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const translation = useTranslation();

  const safeValue = Array.isArray(value) ? value : [];

  const handleSelect = (selectedValue: string) => {
    const newSelected = safeValue.includes(selectedValue)
      ? safeValue.filter((item) => item !== selectedValue)
      : [...safeValue, selectedValue];
    onChange(newSelected);
  };

  const handleRemove = (selectedValue: string) => {
    onChange(safeValue.filter((item) => item !== selectedValue));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex flex-wrap gap-1.5 min-h-8">
          {safeValue.length > 0
            ? safeValue.map((selectedValue) => (
                <Badge
                  key={selectedValue}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {options.find((option) => option.value === selectedValue)
                    ?.label || selectedValue}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(selectedValue);
                    }}
                  />
                </Badge>
              ))
            : null}
        </div>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              !safeValue.length && "text-muted-foreground",
              className,
            )}
          >
            {safeValue.length > 0
              ? `${safeValue.length} ${translation("selected")}`
              : translation(placeholder)}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandList>
            <CommandInput placeholder={translation("Search options...")} />
            <CommandEmpty>{translation("No options found.")}</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      safeValue.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
