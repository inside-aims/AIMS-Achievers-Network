"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HeroComponent from "@/components/PastWinners/Hero"
import FilterSortComponent from "@/components/PastWinners/FilterSort"
import WinnersGridComponent from "@/components/PastWinners/WinnersGrid"
import PaginationComponent from "@/components/PastWinners/Pagination"
import SidebarComponent from "@/components/PastWinners/SideBar"

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

// Mock data
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
  const [loading, setLoading] = useState(false)

  const winnersPerPage = 9

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      let filteredWinners = mockWinners

      if (filters.year) {
        filteredWinners = filteredWinners.filter((w) => w.year.toString() === filters.year)
      }
      if (filters.category) {
        filteredWinners = filteredWinners.filter((w) =>
          w.eventTitle.toLowerCase().includes(filters.category!.toLowerCase()),
        )
      }

      filteredWinners.sort((a, b) => {
        if (sortBy === "date") return b.year - a.year
        if (sortBy === "name") return a.name.localeCompare(b.name)
        if (sortBy === "event") return a.eventTitle.localeCompare(b.eventTitle)
        return 0
      })

      setWinners(filteredWinners)
      setCurrentPage(1)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [filters, sortBy])

  const currentWinners = winners.slice((currentPage - 1) * winnersPerPage, currentPage * winnersPerPage)
  const totalPages = Math.ceil(winners.length / winnersPerPage)

  // ✨ Fancy Shimmering Skeleton Card
  const SkeletonCard = () => (
    <div className="relative overflow-hidden rounded-lg bg-gray-800 p-4">
      <div className="h-40 bg-gray-700 rounded-md mb-4 relative shimmer" />
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2 shimmer" />
      <div className="h-4 bg-gray-700 rounded w-1/2 shimmer" />
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
      <HeroComponent />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <FilterSortComponent onFilterChange={(newFilters) => setFilters(newFilters)} onSortChange={setSortBy} />

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {Array.from({ length: winnersPerPage }).map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key="winners"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <WinnersGridComponent winners={currentWinners} />
                  <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 w-full">
            <SidebarComponent />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PastWinnersPage
