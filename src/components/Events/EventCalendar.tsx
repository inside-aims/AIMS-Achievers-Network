"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
// import { Calendar } from "../ui/calender"
import type { SelectSingleEventHandler } from "react-day-picker"

const EventCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleSelect: SelectSingleEventHandler = (day, selected) => {
    setDate(selected)
  }

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold mb-6 flex items-center text-award-gold">
        <CalendarIcon className="mr-2" />
        Event Calendar
      </h2>
      <div className="flex justify-center">
        {/* <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border border-award-gold bg-black text-award-silver"
        /> */}
      </div>
    </div>
  )
}

export default EventCalendar

