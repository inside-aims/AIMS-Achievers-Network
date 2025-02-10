"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface FilterSortProps {
  onFilterChange: (filters: any) => void
  onSortChange: (sortBy: string) => void
}

const FilterSortComponent: React.FC<FilterSortProps> = ({ onFilterChange, onSortChange }) => {
  const [year, setYear] = useState("")
  const [category, setCategory] = useState("")
  const [sortBy, setSortBy] = useState("date")

  const handleFilterChange = () => {
    onFilterChange({ year, category })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    onSortChange(value)
  }

  const clearFilters = () => {
    setYear("")
    setCategory("")
    onFilterChange({})
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-award-blue/5 p-6 rounded-lg shadow-md mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="design">Best Design</SelectItem>
            <SelectItem value="innovation">Innovation Award</SelectItem>
            <SelectItem value="impact">Community Impact</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="name">Winner Name</SelectItem>
            <SelectItem value="event">Event Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between items-center">
        <Button onClick={handleFilterChange} variant="default">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline">
          Clear Filters
        </Button>
      </div>
    </motion.div>
  )
}

export default FilterSortComponent

