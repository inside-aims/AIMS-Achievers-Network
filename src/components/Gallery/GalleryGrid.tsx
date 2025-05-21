"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Info,
  Calendar,
  User,
  Award,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

// Define comprehensive image type with metadata
type ImageType = {
  id: string
  src: string
  alt: string
  title: string
  description: string
  size: "small" | "medium" | "large"
  category: string
  year: number
  artist: string
  awardType: "Nominee" | "Winner" | "Honorable Mention"
  highResSrc?: string // For zoom functionality
  focalPoint?: string // For custom positioning (e.g., "top", "center", "top center", etc.)
}

// Sample gallery data with comprehensive metadata
const galleryData: ImageType[] = [
  {
    id: "img1",
    src: "/assets/gallery/gallery4.webp",
    highResSrc: "/assets/gallery/gallery4-hires.webp",
    alt: "Best Director Award Ceremony",
    title: "Best Director Award",
    description:
      "James Cameron accepting the prestigious Best Director award for his groundbreaking work on 'Avatar: The Way of Water'.",
    size: "large",
    category: "Ceremony",
    year: 2023,
    artist: "James Cameron",
    awardType: "Winner",
    focalPoint: "top center", // Ensure face visibility
  },
  {
    id: "img2",
    src: "/assets/gallery/gallery2.webp",
    alt: "Best Actress Nominee",
    title: "Best Actress Nomination",
    description: "Emma Stone during the nomination announcement for her role in 'Poor Things'.",
    size: "small",
    category: "Nominees",
    year: 2023,
    artist: "Emma Stone",
    awardType: "Nominee",
    focalPoint: "top center", // Ensure face visibility
  },
  {
    id: "img3",
    src: "/assets/gallery/gallery3.webp",
    alt: "Audience Reaction",
    title: "Emotional Moment",
    description: "The audience's reaction during the In Memoriam segment honoring industry legends.",
    size: "medium",
    category: "Behind-the-Scenes",
    year: 2023,
    artist: "Various",
    awardType: "Honorable Mention",
  },
  {
    id: "img4",
    src: "/assets/gallery/gallery5.webp",
    alt: "Best Picture Announcement",
    title: "Best Picture Award",
    description: "The cast and crew of 'Oppenheimer' accepting the Best Picture award.",
    size: "large",
    category: "Ceremony",
    year: 2023,
    artist: "Christopher Nolan",
    awardType: "Winner",
  },
  {
    id: "img5",
    src: "/assets/gallery/gallery6.webp",
    alt: "Supporting Actor Nominee",
    title: "Supporting Actor Recognition",
    description: "Robert Downey Jr. during his nomination for Best Supporting Actor.",
    size: "small",
    category: "Nominees",
    year: 2023,
    artist: "Robert Downey Jr.",
    awardType: "Nominee",
  },
  {
    id: "img6",
    src: "/assets/gallery/gallery6.webp",
    alt: "Backstage Moment",
    title: "Candid Backstage",
    description: "A candid moment backstage with the presenters preparing for their segment.",
    size: "medium",
    category: "Behind-the-Scenes",
    year: 2023,
    artist: "Various",
    awardType: "Honorable Mention",
  },
  {
    id: "img7",
    src: "/assets/gallery/gallery8.webp",
    alt: "Lifetime Achievement Award",
    title: "Lifetime Achievement",
    description: "Martin Scorsese receiving the Lifetime Achievement Award for his contributions to cinema.",
    size: "large",
    category: "Winners",
    year: 2022,
    artist: "Martin Scorsese",
    awardType: "Winner",
  },
  {
    id: "img8",
    src: "/assets/gallery/gallery9.webp",
    alt: "Best Screenplay Nominee",
    title: "Best Screenplay",
    description: "Greta Gerwig nominated for Best Original Screenplay for 'Barbie'.",
    size: "small",
    category: "Nominees",
    year: 2023,
    artist: "Greta Gerwig",
    awardType: "Nominee",
  },
  {
    id: "img9",
    src: "/assets/gallery/gallery10.webp",
    alt: "Red Carpet Arrival",
    title: "Red Carpet Moment",
    description: "Celebrities arriving on the red carpet before the ceremony begins.",
    size: "medium",
    category: "Ceremony",
    year: 2023,
    artist: "Various",
    awardType: "Honorable Mention",
  },
  {
    id: "img10",
    src: "/assets/gallery/gallery11.webp",
    alt: "Best Actor Winner",
    title: "Best Actor Triumph",
    description: "Cillian Murphy accepting the Best Actor award for his role in 'Oppenheimer'.",
    size: "large",
    category: "Winners",
    year: 2023,
    artist: "Cillian Murphy",
    awardType: "Winner",
  },
  {
    id: "img11",
    src: "/assets/gallery/gallery12.webp",
    alt: "Technical Award Nominee",
    title: "Technical Excellence",
    description: "The visual effects team nominated for their groundbreaking work.",
    size: "small",
    category: "Nominees",
    year: 2022,
    artist: "VFX Team",
    awardType: "Nominee",
  },
  {
    id: "img12",
    src: "/assets/gallery/gallery13.webp",
    alt: "Rehearsal Shot",
    title: "Ceremony Rehearsal",
    description: "Behind the scenes during the technical rehearsal before the live broadcast.",
    size: "medium",
    category: "Behind-the-Scenes",
    year: 2023,
    artist: "Production Team",
    awardType: "Honorable Mention",
  },
  {
    id: "img13",
    src: "/assets/gallery/gallery14.webp",
    alt: "Foreign Film Winner",
    title: "International Cinema",
    description: "The team behind 'Parasite' accepting the award for Best International Feature.",
    size: "large",
    category: "Winners",
    year: 2022,
    artist: "Bong Joon-ho",
    awardType: "Winner",
  },
  {
    id: "img14",
    src: "/assets/gallery/gallery15.webp",
    alt: "Documentary Nominee",
    title: "Documentary Recognition",
    description: "The director of 'American Symphony' at the nomination ceremony.",
    size: "small",
    category: "Nominees",
    year: 2023,
    artist: "Matthew Heineman",
    awardType: "Nominee",
  },
  {
    id: "img15",
    src: "/assets/gallery/gallery16.webp",
    alt: "Press Room Interview",
    title: "Press Moment",
    description: "Winners answering questions in the press room after receiving their awards.",
    size: "medium",
    category: "Behind-the-Scenes",
    year: 2023,
    artist: "Various",
    awardType: "Winner",
  },
  {
    id: "img16",
    src: "/assets/gallery/gallery17.webp",
    alt: "Best Actress Winner",
    title: "Best Actress Award",
    description: "Emma Stone accepting the Best Actress award for her performance in 'Poor Things'.",
    size: "large",
    category: "Winners",
    year: 2023,
    artist: "Emma Stone",
    awardType: "Winner",
  },
  {
    id: "img17",
    src: "/assets/gallery/gallery18.webp",
    alt: "Animation Award Nominee",
    title: "Animation Excellence",
    description: "The team behind 'Spider-Man: Across the Spider-Verse' at the nomination announcement.",
    size: "small",
    category: "Nominees",
    year: 2023,
    artist: "Animation Team",
    awardType: "Nominee",
  },
]

// Extract unique values for filters
const categories = ["All", ...Array.from(new Set(galleryData.map((img) => img.category)))]
const years = ["All", ...Array.from(new Set(galleryData.map((img) => img.year.toString())))]
const awardTypes = ["All", ...Array.from(new Set(galleryData.map((img) => img.awardType)))]
const artists = ["All", ...Array.from(new Set(galleryData.map((img) => img.artist)))]

export default function GalleryGrid() {
  const isMobile = useMobile()
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedYear, setSelectedYear] = useState("All")
  const [selectedAwardType, setSelectedAwardType] = useState("All")
  const [selectedArtist, setSelectedArtist] = useState("All")
  const [selectedImg, setSelectedImg] = useState<ImageType | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [sortBy, setSortBy] = useState<"year" | "title">("year")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showInfo, setShowInfo] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const lightboxRef = useRef<HTMLDivElement>(null)

  // Filter images based on all selected criteria
  const filteredImages = galleryData.filter((img) => {
    const matchesCategory = activeCategory === "All" || img.category === activeCategory
    const matchesYear = selectedYear === "All" || img.year.toString() === selectedYear
    const matchesAwardType = selectedAwardType === "All" || img.awardType === selectedAwardType
    const matchesArtist = selectedArtist === "All" || img.artist === selectedArtist

    return matchesCategory && matchesYear && matchesAwardType && matchesArtist
  })

  // Sort the filtered images
  const sortedImages = [...filteredImages].sort((a, b) => {
    if (sortBy === "year") {
      return sortOrder === "asc" ? a.year - b.year : b.year - a.year
    } else {
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    }
  })

  // Close lightbox and reset states
  const closeLightbox = useCallback(() => {
    setSelectedImg(null)
    setZoomLevel(1)
    setShowInfo(false)
  }, [])

  // Navigate between images in lightbox
  const navigateImage = useCallback(
    (direction: number) => {
      if (sortedImages.length <= 1) return

      const newIndex = (currentIndex + direction + sortedImages.length) % sortedImages.length
      setCurrentIndex(newIndex)
      setSelectedImg(sortedImages[newIndex])
    },
    [currentIndex, sortedImages],
  )

  // Handle image loading state
  const handleImageLoaded = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }))
  }

  // Update current index when selected image changes
  useEffect(() => {
    if (selectedImg) {
      const index = sortedImages.findIndex((img) => img.id === selectedImg.id)
      if (index !== -1) {
        setCurrentIndex(index)
      }
    }
  }, [selectedImg, sortedImages])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImg) return

      switch (e.key) {
        case "ArrowRight":
          navigateImage(1)
          break
        case "ArrowLeft":
          navigateImage(-1)
          break
        case "Escape":
          closeLightbox()
          break
        case "+":
          setZoomLevel((prev) => Math.min(prev + 0.25, 3))
          break
        case "-":
          setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
          break
        case "i":
          setShowInfo((prev) => !prev)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImg, currentIndex, sortedImages.length, navigateImage, closeLightbox])

  // Reset zoom level when changing images
  useEffect(() => {
    setZoomLevel(1)
  }, [currentIndex])

  // Reset filters
  const resetFilters = () => {
    setActiveCategory("All")
    setSelectedYear("All")
    setSelectedAwardType("All")
    setSelectedArtist("All")
    setSortOrder("desc")
    setSortBy("year")
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center font-cinzel text-4xl font-light tracking-tight md:text-5xl">Feast Your Eyes On Elegance</h1>

      {/* Advanced Filter Bar */}
      <div className="sticky top-20 z-20 mb-8 bg-award-bronze p-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "whitespace-nowrap font-medium transition-all duration-300",
                  activeCategory === category && "border-b-2 border-award-gold",
                )}
                aria-pressed={activeCategory === category}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="grid gap-4 p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Year</h4>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Award Type</h4>
                    <Select value={selectedAwardType} onValueChange={setSelectedAwardType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Award Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {awardTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Artist</h4>
                    <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Artist" />
                      </SelectTrigger>
                      <SelectContent>
                        {artists.map((artist) => (
                          <SelectItem key={artist} value={artist}>
                            {artist}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline" size="sm" onClick={resetFilters} className="mt-2">
                    Reset All Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Controls */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy("year")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className={sortBy === "year" ? "font-bold" : ""}>By Year</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("title")}>
                  <Award className="mr-2 h-4 w-4" />
                  <span className={sortBy === "title" ? "font-bold" : ""}>By Title</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  {sortOrder === "asc" ? <SortAsc className="mr-2 h-4 w-4" /> : <SortDesc className="mr-2 h-4 w-4" />}
                  <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Active Filters Display */}
        {(activeCategory !== "All" ||
          selectedYear !== "All" ||
          selectedAwardType !== "All" ||
          selectedArtist !== "All") && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeCategory !== "All" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Filter className="h-3 w-3" />
                {activeCategory}
                <button
                  onClick={() => setActiveCategory("All")}
                  className="ml-1 rounded-full hover:bg-muted-foreground/20"
                  aria-label={`Remove ${activeCategory} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedYear !== "All" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {selectedYear}
                <button
                  onClick={() => setSelectedYear("All")}
                  className="ml-1 rounded-full hover:bg-muted-foreground/20"
                  aria-label={`Remove ${selectedYear} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedAwardType !== "All" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {selectedAwardType}
                <button
                  onClick={() => setSelectedAwardType("All")}
                  className="ml-1 rounded-full hover:bg-muted-foreground/20"
                  aria-label={`Remove ${selectedAwardType} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedArtist !== "All" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {selectedArtist}
                <button
                  onClick={() => setSelectedArtist("All")}
                  className="ml-1 rounded-full hover:bg-muted-foreground/20"
                  aria-label={`Remove ${selectedArtist} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing {sortedImages.length} {sortedImages.length === 1 ? "result" : "results"}
      </div>

      {/* Enhanced Grid with Animation and Accessibility */}
      {sortedImages.length > 0 ? (
        <div className="grid auto-rows-[150px] grid-cols-1 gap-4 sm:auto-rows-[200px] sm:grid-cols-2 md:auto-rows-[250px] md:grid-cols-3 lg:auto-rows-[300px] lg:grid-cols-4">
          <AnimatePresence>
            {sortedImages.map((img, index) => {
              const sizeClass =
                img.size === "large"
                  ? "sm:col-span-2 sm:row-span-2"
                  : img.size === "medium"
                    ? "sm:col-span-2 sm:row-span-1"
                    : ""

              return (
                <motion.div
                  key={img.id}
                  className={cn("group relative overflow-hidden rounded-lg shadow-md transition-all", sizeClass)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                >
                  <button
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-award-gold focus:ring-offset-2"
                    onClick={() => {
                      setSelectedImg(img)
                      setCurrentIndex(index)
                    }}
                    aria-label={`View ${img.title}`}
                  >
                    <span className="sr-only">View {img.title}</span>
                  </button>

                  {/* Image with loading state */}
                  <div className="relative h-full w-full overflow-hidden">
                    {!loadedImages[img.id] && <Skeleton className="absolute inset-0 h-full w-full rounded-lg" />}
                    <Image
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={cn(
                        "rounded-lg object-cover transition-transform duration-500 group-hover:scale-105",
                        !loadedImages[img.id] && "opacity-0",
                        loadedImages[img.id] && "opacity-100",
                      )}
                      style={{ objectPosition: "top center" }}
                      onLoad={() => handleImageLoaded(img.id)}
                      priority={index < 4} // Prioritize loading for first 4 images
                    />

                    {/* Award type badge */}
                    <div className="absolute left-2 top-2 z-10">
                      <Badge
                        className={cn(
                          "font-medium",
                          img.awardType === "Winner" && "bg-award-gold text-black",
                          img.awardType === "Nominee" && "bg-slate-700",
                          img.awardType === "Honorable Mention" && "bg-slate-600",
                        )}
                      >
                        {img.awardType}
                      </Badge>
                    </div>

                    {/* Year badge */}
                    <div className="absolute right-2 top-2 z-10">
                      <Badge variant="outline" className="bg-black/50 backdrop-blur-sm">
                        {img.year}
                      </Badge>
                    </div>

                    {/* Overlay with info */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                      <h3 className="text-lg font-bold text-white">{img.title}</h3>
                      <p className="line-clamp-2 text-sm text-white/90">{img.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <User className="h-3 w-3 text-white/70" />
                        <span className="text-xs text-white/70">{img.artist}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
          <p className="text-center text-muted-foreground">
            No images match your current filters. Try adjusting your criteria.
          </p>
        </div>
      )}

      {/* Enhanced Lightbox with Zoom, Navigation, and Metadata */}
      <AnimatePresence>
        {selectedImg && (
          <Dialog open={!!selectedImg} onOpenChange={(open) => !open && closeLightbox()}>
            <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-6xl" ref={lightboxRef}>
              <DialogHeader className="flex-row items-center justify-between space-y-0">
                <DialogTitle className="text-xl font-bold">{selectedImg.title}</DialogTitle>
                <div className="flex items-center gap-2">
                  {/* Zoom controls */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))}
                    disabled={zoomLevel <= 0.5}
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm tabular-nums">{Math.round(zoomLevel * 100)}%</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 3))}
                    disabled={zoomLevel >= 3}
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>

                  {/* Info toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setShowInfo((prev) => !prev)}
                    aria-pressed={showInfo}
                    aria-label="Toggle image information"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="relative mt-2 flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg bg-black/50">
                {/* Navigation buttons */}
                {sortedImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 z-10 h-10 w-10 rounded-full bg-black/20 p-0 backdrop-blur-sm hover:bg-black/40"
                      onClick={() => navigateImage(-1)}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className={isMobile ? "h-4 w-4" : "h-6 w-6"} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 z-10 h-10 w-10 rounded-full bg-black/20 p-0 backdrop-blur-sm hover:bg-black/40"
                      onClick={() => navigateImage(1)}
                      aria-label="Next image"
                    >
                      <ChevronRight className={isMobile ? "h-4 w-4" : "h-6 w-6"} />
                    </Button>
                  </>
                )}

                {/* High-resolution image with zoom */}
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    cursor: zoomLevel > 1 ? "move" : "default",
                  }}
                >
                  <div
                    className="relative h-full w-full transition-transform duration-200"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: "center",
                    }}
                  >
                    <Image
                      src={selectedImg.highResSrc || selectedImg.src}
                      alt={selectedImg.alt}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-contain"
                      style={{ objectPosition: "center" }} // Keep centered in lightbox for full context
                      priority
                    />
                  </div>
                </div>

                {/* Image counter */}
                <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
                  {currentIndex + 1} / {sortedImages.length}
                </div>
              </div>

              {/* Image metadata panel */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-lg border p-4">
                      <DialogDescription className="mb-4">{selectedImg.description}</DialogDescription>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Artist:</span>
                            <span className="text-sm">{selectedImg.artist}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Year:</span>
                            <span className="text-sm">{selectedImg.year}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Award Type:</span>
                            <span className="text-sm">{selectedImg.awardType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Category:</span>
                            <span className="text-sm">{selectedImg.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Keyboard shortcuts help */}
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="font-medium">Keyboard shortcuts:</span> Arrow keys to navigate,
                <kbd className="mx-1 rounded border px-1">+</kbd>/<kbd className="mx-1 rounded border px-1">-</kbd> to
                zoom,
                <kbd className="mx-1 rounded border px-1">i</kbd> to toggle info,
                <kbd className="mx-1 rounded border px-1">Esc</kbd> to close
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}
