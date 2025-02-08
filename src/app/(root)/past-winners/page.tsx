"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import HeroComponent from "@/components/PastWinners/Hero"
import FilterSortComponent from "@/components/PastWinners/FilterSort"
import WinnersGridComponent from "@/components/PastWinners/WinnersGrid"
import PaginationComponent from "@/components/PastWinners/Pagination"
import SidebarComponent from "@/components/PastWinners/SideBar"
import { Navbar } from "@/components/shared/Navigation/Navbar"
import Footer from "@/components/shared/Footer/Footer"

interface Winner {
  id: string
  image: string
  name: string
  eventTitle: string
  year: number
  description: string
  link: string
}

interface Filters {
  year?: string
  category?: string
}

// Mock data for winners
const mockWinners: Winner[] = Array.from({ length: 50 }, (_, i) => ({
  id: `winner-${i + 1}`,
  image: `/placeholder.svg?height=300&width=400`,
  name: `Winner ${i + 1}`,
  eventTitle: `Award Category ${(i % 3) + 1}`,
  year: 2025 - Math.floor(i / 10),
  description: `Description for Winner ${i + 1}'s achievement.`,
  link: "#",
}))

const PastWinnersPage = () => {
  const [winners, setWinners] = useState<Winner[]>(mockWinners)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Filters>({})
  const [sortBy, setSortBy] = useState("date")

  const winnersPerPage = 9
  const totalPages = Math.ceil(winners.length / winnersPerPage)

  useEffect(() => {
    // Apply filters and sorting
    let filteredWinners = mockWinners

    // Apply filters
    if (filters.year) {
      filteredWinners = filteredWinners.filter((w) => w.year.toString() === filters.year)
    }
    if (filters.category) {
      filteredWinners = filteredWinners.filter((w) =>
        w.eventTitle.toLowerCase().includes(filters.category!.toLowerCase()),
      )
    }

    // Apply sorting
    filteredWinners.sort((a, b) => {
      if (sortBy === "date") return b.year - a.year
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "event") return a.eventTitle.localeCompare(b.eventTitle)
      return 0
    })

    setWinners(filteredWinners)
    setCurrentPage(1)
  }, [filters, sortBy])

  const currentWinners = winners.slice((currentPage - 1) * winnersPerPage, currentPage * winnersPerPage)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroComponent />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <FilterSortComponent onFilterChange={(newFilters) => setFilters(newFilters)} onSortChange={setSortBy} />
            <WinnersGridComponent winners={currentWinners} />
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
          <div className="lg:w-1/4">
            <SidebarComponent />
          </div>
        </div>
      </motion.div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default PastWinnersPage

