"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CommandList } from "cmdk"

const genres = [
  {
    value: "Action",
    label: "Action",
  },
  {
    value: "Comedy",
    label: "Comedy",
  },
  {
    value: "Drama",
    label: "Drama",
  },
  {
    value: "Horror",
    label: "Horror",
  },
  {
    value: "Thriller",
    label: "Thriller",
  },
]

interface ChildComponentProps {
    onStateChange: (value: string) => void;
}

export default function FilterSelector({ onStateChange }: ChildComponentProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-[200px] justify-between"
        >
          {value
            ? genres.find((genres) => genres.value === value)?.label
            : "Select Genre..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent">
        <Command>
            <CommandList>
          <CommandInput placeholder="Search genre..." />
          <CommandEmpty>No genre found.</CommandEmpty>
          <CommandGroup>
            {genres.map((genre) => (
              <CommandItem
                key={genre.value}
                value={genre.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  onStateChange(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === genre.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {genre.label}
              </CommandItem>
            ))}
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
