"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react";

export default function CustomCalendar() {
  const [date, setDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  
  // Generate a list of years (100 years range)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => 
    currentYear - 50 + i
  );
  
  // Month names for the month picker (full names for reference)
  const fullMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Abbreviated month names (first three letters)
  const months = fullMonths.map(month => month.slice(0, 3));
  
  // Function to handle year selection
  const handleYearSelection = (year: number) => {
    const newDate = new Date(calendarDate);
    newDate.setFullYear(year);
    setCalendarDate(newDate);
    setShowYearPicker(false);
  };
  
  // Function to handle month selection
  const handleMonthSelection = (monthIndex: number) => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(monthIndex);
    setCalendarDate(newDate);
    setShowMonthPicker(false);
  };
  
  // Navigate to previous/next month
  const navigateMonth = (direction: number) => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(calendarDate.getMonth() + direction);
    setCalendarDate(newDate);
  };
  
  // Navigate to previous/next year
  const navigateYear = (direction: number) => {
    const newDate = new Date(calendarDate);
    newDate.setFullYear(calendarDate.getFullYear() + direction);
    setCalendarDate(newDate);
  };

  // When component mounts, scroll to the current year in the year picker
  useEffect(() => {
    if (showYearPicker) {
      const currentYearElement = document.getElementById(`year-${calendarDate.getFullYear()}`);
      if (currentYearElement) {
        currentYearElement.scrollIntoView({ block: "center", behavior: "auto" });
      }
    }
  }, [showYearPicker, calendarDate]);

  // When component mounts, scroll to the current month in the month picker
  useEffect(() => {
    if (showMonthPicker) {
      const currentMonthElement = document.getElementById(`month-${calendarDate.getMonth()}`);
      if (currentMonthElement) {
        currentMonthElement.scrollIntoView({ block: "center", behavior: "auto" });
      }
    }
  }, [showMonthPicker, calendarDate]);
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="border rounded-lg p-4 shadow-sm w-full">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => setDate(day || new Date())}
          month={calendarDate}
          onMonthChange={setCalendarDate}
          className="rounded-md border w-full"
          components={{
            Caption: () => {
              return (
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => navigateMonth(-1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex gap-1">
                    <Popover open={showMonthPicker} onOpenChange={setShowMonthPicker}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="font-medium h-8 px-2 text-sm"
                        >
                          <span>{months[calendarDate.getMonth()]}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-20 p-0" align="center">
                        <div className="max-h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                          <div className="flex flex-col">
                            {months.map((month, i) => (
                              <Button
                                id={`month-${i}`}
                                key={month}
                                variant={calendarDate.getMonth() === i ? "default" : "ghost"}
                                className="justify-center rounded-none h-8 text-sm"
                                onClick={() => handleMonthSelection(i)}
                              >
                                {month}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Popover open={showYearPicker} onOpenChange={setShowYearPicker}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="font-medium h-8 px-2 text-sm"
                        >
                          <span>{calendarDate.getFullYear()}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-20 p-0" align="center">
                        <div className="max-h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                          <div className="flex flex-col">
                            {years.map((year) => (
                              <Button
                                id={`year-${year}`}
                                key={year}
                                variant={calendarDate.getFullYear() === year ? "default" : "ghost"}
                                className="justify-center rounded-none h-8 text-sm"
                                onClick={() => handleYearSelection(year)}
                              >
                                {year}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => navigateMonth(1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              );
            }
          }}
        />
      </div>
      
      <div className="text-center">
        <p>Selected date: {date ? date.toDateString() : "None"}</p>
      </div>
    </div>
  );
}