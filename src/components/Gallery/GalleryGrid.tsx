"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
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
  Search,
  Heart,
  Grid3X3,
  List,
  LayoutGrid,
  Star,
  Download,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { useSwipeable } from "react-swipeable";
// Enhanced image type with additional metadata
type ImageType = {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  size: "small" | "medium" | "large";
  category: string;
  year: number;
  artist: string;
  awardType: "Nominee" | "Winner" | "Honorable Mention" | "Guest" | "MC";
  highResSrc?: string;
  focalPoint?: string;
  tags?: string[];
  rating?: number;
  downloadUrl?: string;
};

// View mode types
type ViewMode = "masonry" | "grid" | "list";

// Enhanced gallery data with more comprehensive metadata
const galleryData: ImageType[] = [
  {
    id: "img1",
    src: "/assets/gallery/gallery3.webp",
    highResSrc: "/assets/gallery/gallery3.webp",
    alt: "Red Carpet",
    title: "Red Carpet Episode",
    description:
      "She strikes a confident pose, one hand on her hip, her gown flowing elegantly as she smiles for the cameras.",
    size: "medium",
    category: "Red Carpet",
    year: 2024,
    artist: "Guest",
    awardType: "Guest",
    tags: ["red carpet", "paparazzi", "ceremony", "awards"],
    rating: 5,
    focalPoint: "top",
  },
  {
    id: "img2",
    src: "/assets/gallery/gallery2.webp",
    highResSrc: "/assets/gallery/gallery2.webp",
    alt: "Best Actress Nominee - Emma Stone at nomination announcement",
    title: "Radiance on the Red Carpet",
    description:
      "He stands tall in a tailored suit, hands in pockets, exuding quiet confidence as the cameras flash",
    size: "small",
    category: "Red Carpet",
    year: 2024,
    artist: "Guest",
    awardType: "Guest",
    tags: ["red carpet", "paparazzi", "ceremony", "awards"],
    rating: 4,
    focalPoint: "top",
  },
  {
    id: "img3",
    src: "/assets/gallery/gallery4.webp",
    highResSrc: "/assets/gallery/gallery4.webp",
    alt: "Red Carpet",
    title: "A Vision in Motion",
    description:
      "Her gaze commands attention, every movement a blend of poise and quiet power.",
    size: "small",
    category: "Red Carpet",
    year: 2023,
    artist: "Guest",
    awardType: "Guest",
    tags: ["audience", "emotional", "memoriam"],
    rating: 5,
    focalPoint: "top",
  },
  {
    id: "img4",
    src: "/assets/gallery/gallery.webp",
    highResSrc: "/assets/gallery/gallery.webp",
    alt: "Spotlight",
    title: "Smile for the camera.",
    description: "Smiles that lits up the entire room",
    size: "small",
    category: "Spotlight",
    year: 2024,
    artist: "Guest",
    awardType: "Guest",
    tags: ["best picture", "oppenheimer", "nolan"],
    rating: 5,
    downloadUrl: "/downloads/best-picture-2023.jpg",
    focalPoint: "top",
  },
  {
    id: "img5",
    src: "/assets/gallery/gallery6.webp",
    highResSrc: "/assets/gallery/gallery6.webp",
    alt: "Red Carpet",
    title: "Poise & Power",
    description:
      "A slight smile on his face, he stands tall, hands in pockets, effortlessly commanding the room.",
    size: "small",
    category: "Red Carpet",
    year: 2024,
    artist: "Guest.",
    awardType: "Guest",
    rating: 3,
    focalPoint: "top",
  },
  {
    id: "img6",
    src: "/assets/gallery/gallery5.webp",
    highResSrc: "/assets/gallery/gallery5.webp",
    alt: "Spotlight",
    title: "Steeze in pair",
    description: "Steeze doesn't get any colder than these two.",
    size: "medium",
    category: "Spotlight",
    year: 2024,
    artist: "Guest.",
    awardType: "Guest",
    rating: 4,
    focalPoint: "top",
  },
  {
    id: "img7",
    src: "/assets/gallery/gallery7.webp",
    highResSrc: "/assets/gallery/gallery7.webp",
    alt: "Red Carpet",
    title: "Light, Camera, Charisma",
    description:
      "The flashbulbs burst, capturing a silhouette of grace in the heart of the spotlight.",
    size: "small",
    category: "Red Carpet",
    year: 2024,
    artist: "Guest.",
    awardType: "Guest",
    rating: 5,
    focalPoint: "top",
  },
  {
    id: "img8",
    src: "/assets/gallery/gallery8.webp",
    highResSrc: "/assets/gallery/gallery8.webp",
    alt: "Red Carpet",
    title: "Together in the Spotlight",
    description:
      "Poised together, their gaze steady and confident, they capture the essence of effortless charm",
    size: "large",
    category: "Red Carpet",
    year: 2024,
    artist: "Guest.",
    awardType: "Guest",
    rating: 5,
    focalPoint: "top",
  },
  {
    id: "img9",
    src: "/assets/gallery/gallery9.webp",
    highResSrc: "/assets/gallery/gallery9.webp",
    alt: "Red Carpet",
    title: "If Beauty Was A Person",
    description:
      "Dressed in an exquisite modesty, she radiates effortless elegance with a touch of boldness",
    size: "medium",
    category: "Red Carpet",
    year: 2024,
    artist: "Guest.",
    awardType: "Guest",
    rating: 5,
    focalPoint: "top",
  },
  {
    id: "img10",
    src: "/assets/gallery/gallery10.webp",
    highResSrc: "/assets/gallery/gallery10.webp",
    alt: "Red Carpet",
    title: "Master of Ceremonies",
    description:
      "With every word, he ignite energy and excitement, keeping the audience engaged.",
    size: "medium",
    category: "Red Carpet",
    year: 2024,
    artist: "MC",
    awardType: "MC",
    rating: 3,
    focalPoint: "top",
  },
  {
    id: "img11",
    src: "/assets/gallery/gallery11.webp",
    highResSrc: "/assets/gallery/gallery11.webp",
    alt: "Red Carpet",
    title: "Side by Side",
    description:
      "With subtle smiles and a quiet presence, they steal the moment—unapologetically in sync.",
    size: "small",
    category: "Red Carpet",
    year: 2024,
    artist: "Guest",
    awardType: "Guest",
    rating: 5,
    focalPoint: "top",
  },
  {
    id: "img12",
    src: "/assets/gallery/gallery14.webp",
    highResSrc: "/assets/gallery/gallery14.webp",
    alt: "Spotlight",
    title: "Her Moment in the Spotlight",
    description:
      "Her beauty whispers like the moonlight on emerald leaves—soft, radiant, and timeless.",
    size: "small",
    category: "Spotlight",
    year: 2024,
    artist: "Guest",
    awardType: "Guest",
    rating: 4,
    focalPoint: "top",
  },
  {
    id: "img13",
    src: "/assets/gallery/gallery19.webp",
    highResSrc: "/assets/gallery/gallery19.webp",
    alt: "Red Carpet",
    title: "Elegance in Gentility",
    description:
      "A Gentleman Is an Understatement",
    size: "small",
    category: "Red Carpet",
    year: 2024,
    artist: "Guest",
    awardType: "Guest",
    rating: 3,
    focalPoint: "top",
  },
  // Add more sample data...
];

// Extract unique values for filters
const categories = [
  "All",
  ...Array.from(new Set(galleryData.map(img => img.category))),
];
const years = [
  "All",
  ...Array.from(new Set(galleryData.map(img => img.year.toString()))),
];
const awardTypes = [
  "All",
  ...Array.from(new Set(galleryData.map(img => img.awardType))),
];
const artists = [
  "All",
  ...Array.from(new Set(galleryData.map(img => img.artist))),
];

export default function EnhancedGallery() {
  const isMobile = useMobile();

  // Core state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedAwardType, setSelectedAwardType] = useState("All");
  const [selectedArtist, setSelectedArtist] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"year" | "title" | "rating">("year");
  const [viewMode, setViewMode] = useState<ViewMode>("masonry");

  // UI state
  const [selectedImg, setSelectedImg] = useState<ImageType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Refs
  const lightboxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Memoized filtered and sorted images
  const processedImages = useMemo(() => {
    const filtered = galleryData.filter(img => {
      // Text search
      const matchesSearch =
        !searchQuery ||
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.tags?.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      // Filter criteria
      const matchesCategory =
        activeCategory === "All" || img.category === activeCategory;
      const matchesYear =
        selectedYear === "All" || img.year.toString() === selectedYear;
      const matchesAwardType =
        selectedAwardType === "All" || img.awardType === selectedAwardType;
      const matchesArtist =
        selectedArtist === "All" || img.artist === selectedArtist;
      const matchesFavorites = !showFavoritesOnly || favorites.has(img.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesYear &&
        matchesAwardType &&
        matchesArtist &&
        matchesFavorites
      );
    });

    // Sort images
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "year":
          comparison = a.year - b.year;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "rating":
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [
    searchQuery,
    activeCategory,
    selectedYear,
    selectedAwardType,
    selectedArtist,
    sortBy,
    sortOrder,
    showFavoritesOnly,
    favorites,
  ]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== "All") count++;
    if (selectedYear !== "All") count++;
    if (selectedAwardType !== "All") count++;
    if (selectedArtist !== "All") count++;
    if (showFavoritesOnly) count++;
    return count;
  }, [
    activeCategory,
    selectedYear,
    selectedAwardType,
    selectedArtist,
    showFavoritesOnly,
  ]);

  // Favorites management
  const toggleFavorite = useCallback((imageId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(imageId)) {
        newFavorites.delete(imageId);
      } else {
        newFavorites.add(imageId);
      }
      return newFavorites;
    });
  }, []);

  // Image loading handlers
  const handleImageLoaded = useCallback((id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  }, []);

  const handleImageError = useCallback((id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  }, []);

  // Lightbox navigation
  const closeLightbox = useCallback(() => {
    setSelectedImg(null);
    setZoomLevel(1);
    setShowInfo(false);
  }, []);

  const navigateImage = useCallback(
    (direction: number) => {
      if (processedImages.length <= 1) return;
      const newIndex =
        (currentIndex + direction + processedImages.length) %
        processedImages.length;
      setCurrentIndex(newIndex);
      setSelectedImg(processedImages[newIndex]);
    },
    [currentIndex, processedImages],
  );

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateImage(1),
    onSwipedRight: () => navigateImage(-1),
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImg) {
        // Global shortcuts
        if (e.key === "/" && e.ctrlKey) {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
        return;
      }

      // Lightbox shortcuts
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          navigateImage(1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          navigateImage(-1);
          break;
        case "Escape":
          e.preventDefault();
          closeLightbox();
          break;
        case "+":
        case "=":
          e.preventDefault();
          setZoomLevel(prev => Math.min(prev + 0.25, 3));
          break;
        case "-":
          e.preventDefault();
          setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
          break;
        case "i":
          e.preventDefault();
          setShowInfo(prev => !prev);
          break;
        case "f":
          e.preventDefault();
          if (selectedImg) toggleFavorite(selectedImg.id);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImg, navigateImage, closeLightbox, toggleFavorite]);

  // Update current index when selected image changes
  useEffect(() => {
    if (selectedImg) {
      const index = processedImages.findIndex(img => img.id === selectedImg.id);
      if (index !== -1) setCurrentIndex(index);
    }
  }, [selectedImg, processedImages]);

  // Reset zoom when changing images
  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setActiveCategory("All");
    setSelectedYear("All");
    setSelectedAwardType("All");
    setSelectedArtist("All");
    setShowFavoritesOnly(false);
    setSearchQuery("");
    setSortOrder("desc");
    setSortBy("year");
  }, []);

  // Quick filter actions
  const quickFilterWinners = () => setSelectedAwardType("Winner");
  const quickFilterLatest = () => setSelectedYear("2023");
  const quickFilterFavorites = () => setShowFavoritesOnly(true);

  // Grid class based on view mode
  const getGridClass = () => {
    switch (viewMode) {
      case "grid":
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
      case "list":
        return "space-y-4";
      case "masonry":
      default:
        return "grid auto-rows-[150px] grid-cols-1 gap-4 sm:auto-rows-[200px] sm:grid-cols-2 md:auto-rows-[250px] md:grid-cols-3 lg:auto-rows-[300px] lg:grid-cols-4";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link */}
      <a
        href="#gallery-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to gallery content
      </a>

      <section className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-light tracking-tight md:text-5xl">
            Enhanced Gallery Experience
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover award-winning moments with advanced search, filtering, and
            viewing options
          </p>
        </div>

        {/* Search and Quick Actions */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search images, artists, or descriptions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
              aria-label="Search gallery"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 transform p-0"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button size="sm" variant="outline" onClick={quickFilterWinners}>
              <Award className="mr-1 h-4 w-4" />
              Winners Only
            </Button>
            <Button size="sm" variant="outline" onClick={quickFilterLatest}>
              <Calendar className="mr-1 h-4 w-4" />
              Latest Year
            </Button>
            <Button size="sm" variant="outline" onClick={quickFilterFavorites}>
              <Heart className="mr-1 h-4 w-4" />
              Favorites ({favorites.size})
            </Button>
          </div>
        </div>

        {/* Filter and View Controls */}
        <div className="sticky top-4 z-20 mb-8 rounded-lg border bg-background/95 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {/* Desktop Filters */}
          <div className="hidden md:block">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="transition-all duration-200"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={value => value && setViewMode(value as ViewMode)}
              >
                <ToggleGroupItem value="masonry" aria-label="Masonry view">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <Grid3X3 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Advanced Filters Row */}
            <div className="flex flex-wrap items-center gap-4">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedAwardType}
                onValueChange={setSelectedAwardType}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Award Type" />
                </SelectTrigger>
                <SelectContent>
                  {awardTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Artist" />
                </SelectTrigger>
                <SelectContent>
                  {artists.map(artist => (
                    <SelectItem key={artist} value={artist}>
                      {artist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Controls */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {sortOrder === "asc" ? (
                      <SortAsc className="mr-1 h-4 w-4" />
                    ) : (
                      <SortDesc className="mr-1 h-4 w-4" />
                    )}
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("year")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    By Year
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("title")}>
                    <Award className="mr-2 h-4 w-4" />
                    By Title
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    <Star className="mr-2 h-4 w-4" />
                    By Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    {sortOrder === "asc" ? (
                      <SortDesc className="mr-2 h-4 w-4" />
                    ) : (
                      <SortAsc className="mr-2 h-4 w-4" />
                    )}
                    {sortOrder === "asc" ? "Descending" : "Ascending"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Clear Filters ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden">
            <div className="mb-4 flex items-center justify-between">
              <Collapsible
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-1 h-4 w-4" />
                    Filters{" "}
                    {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={
                          activeCategory === category ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setActiveCategory(category)}
                        className="text-xs"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Select
                      value={selectedYear}
                      onValueChange={setSelectedYear}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={selectedAwardType}
                      onValueChange={setSelectedAwardType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Award Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {awardTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={value => value && setViewMode(value as ViewMode)}
              >
                <ToggleGroupItem value="masonry" size="sm">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" size="sm">
                  <Grid3X3 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" size="sm">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span aria-live="polite">
              Showing {processedImages.length}{" "}
              {processedImages.length === 1 ? "result" : "results"}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
          </div>
          {favorites.size > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={showFavoritesOnly ? "bg-red-50 text-red-700" : ""}
            >
              <Heart
                className={cn(
                  "mr-1 h-4 w-4",
                  showFavoritesOnly && "fill-current",
                )}
              />
              {showFavoritesOnly ? "Show All" : "Show Favorites"}
            </Button>
          )}
        </div>

        {/* Gallery Content */}
        <div id="gallery-content">
          {processedImages.length > 0 ? (
            <div className={getGridClass()}>
              <AnimatePresence mode="popLayout">
                {processedImages.map((img, index) => {
                  const sizeClass =
                    viewMode === "masonry" && img.size === "large"
                      ? "sm:col-span-2 sm:row-span-2"
                      : viewMode === "masonry" && img.size === "medium"
                        ? "sm:col-span-2 sm:row-span-1"
                        : "";

                  return (
                    <motion.div
                      key={img.id}
                      className={cn(
                        "group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg",
                        viewMode === "list"
                          ? "flex gap-4 bg-card p-4"
                          : sizeClass,
                        viewMode === "grid" ? "aspect-square" : "",
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      layout
                    >
                      {viewMode === "list" ? (
                        // List View Layout
                        <>
                          <div className="relative h-24 w-32 flex-shrink-0">
                            {!loadedImages[img.id] && !imageErrors[img.id] && (
                              <Skeleton className="absolute inset-0 rounded" />
                            )}
                            {imageErrors[img.id] ? (
                              <div className="absolute inset-0 flex items-center justify-center rounded bg-muted">
                                <AlertCircle className="h-6 w-6 text-muted-foreground" />
                              </div>
                            ) : (
                              <Image
                                src={img.src || "/placeholder.svg"}
                                alt={img.alt}
                                fill
                                sizes="128px"
                                className={cn(
                                  "rounded object-cover transition-opacity",
                                  !loadedImages[img.id] && "opacity-0",
                                )}
                                onLoad={() => handleImageLoaded(img.id)}
                                onError={() => handleImageError(img.id)}
                                loading={index < 6 ? "eager" : "lazy"}
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex items-start justify-between">
                              <h3 className="truncate text-lg font-semibold">
                                {img.title}
                              </h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 flex-shrink-0 p-0"
                                onClick={e => {
                                  e.stopPropagation();
                                  toggleFavorite(img.id);
                                }}
                                aria-label={
                                  favorites.has(img.id)
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                                }
                              >
                                <Heart
                                  className={cn(
                                    "h-4 w-4",
                                    favorites.has(img.id) &&
                                      "fill-red-500 text-red-500",
                                  )}
                                />
                              </Button>
                            </div>
                            <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                              {img.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {img.artist}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {img.year}
                              </span>
                              <Badge
                                variant={
                                  img.awardType === "Winner"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {img.awardType}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedImg(img);
                              setCurrentIndex(index);
                            }}
                            className="self-start"
                          >
                            View
                          </Button>
                        </>
                      ) : (
                        // Grid/Masonry View Layout
                        <>
                          <button
                            className="absolute inset-0 z-10 h-full w-full cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            onClick={() => {
                              setSelectedImg(img);
                              setCurrentIndex(index);
                            }}
                            aria-label={`View ${img.title}`}
                          >
                            <span className="sr-only">View {img.title}</span>
                          </button>

                          <div className="relative h-full w-full overflow-hidden">
                            {!loadedImages[img.id] && !imageErrors[img.id] && (
                              <Skeleton className="absolute inset-0 rounded-lg" />
                            )}

                            {imageErrors[img.id] ? (
                              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-muted">
                                <div className="text-center">
                                  <AlertCircle className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    Failed to load
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <Image
                                src={img.src || "/placeholder.svg"}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className={cn(
                                  "rounded-lg object-cover transition-all duration-500 group-hover:scale-105",
                                  !loadedImages[img.id] && "opacity-0",
                                )}
                                onLoad={() => handleImageLoaded(img.id)}
                                onError={() => handleImageError(img.id)}
                                loading={index < 6 ? "eager" : "lazy"}
                                priority={index < 4}
                              />
                            )}

                            {/* Favorite Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-2 z-20 h-8 w-8 bg-black/20 p-0 opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/40 group-hover:opacity-100"
                              onClick={e => {
                                e.stopPropagation();
                                toggleFavorite(img.id);
                              }}
                              aria-label={
                                favorites.has(img.id)
                                  ? "Remove from favorites"
                                  : "Add to favorites"
                              }
                            >
                              <Heart
                                className={cn(
                                  "h-4 w-4 text-white",
                                  favorites.has(img.id) &&
                                    "fill-red-500 text-red-500",
                                )}
                              />
                            </Button>

                            {/* Award Badge */}
                            <div className="absolute left-2 top-2 z-10">
                              <Badge
                                className={cn(
                                  "text-xs font-medium",
                                  img.awardType === "Winner" &&
                                    "bg-yellow-500 text-black",
                                  img.awardType === "Nominee" &&
                                    "bg-slate-700 text-white",
                                  img.awardType === "Honorable Mention" &&
                                    "bg-slate-600 text-white",
                                )}
                              >
                                {img.awardType}
                              </Badge>
                            </div>

                            {/* Year Badge */}
                            <div className="absolute bottom-2 right-2 z-10">
                              <Badge
                                variant="outline"
                                className="border-white/20 bg-black/50 text-white backdrop-blur-sm"
                              >
                                {img.year}
                              </Badge>
                            </div>

                            {/* Overlay Info */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
                              <h3 className="mb-1 text-lg font-bold text-white">
                                {img.title}
                              </h3>
                              <p className="mb-2 line-clamp-2 text-sm text-white/90">
                                {img.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <User className="h-3 w-3 text-white/70" />
                                  <span className="text-xs text-white/70">
                                    {img.artist}
                                  </span>
                                </div>
                                {img.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-current text-yellow-400" />
                                    <span className="text-xs text-white/70">
                                      {img.rating}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            // Enhanced Empty State
            <div className="flex flex-col items-center justify-center py-16">
              <div className="max-w-md text-center">
                <div className="mb-4">
                  <Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No images found</h3>
                <p className="mb-6 text-muted-foreground">
                  {searchQuery
                    ? `No results match "${searchQuery}". Try adjusting your search terms or filters.`
                    : "No images match your current filters. Try adjusting your criteria."}
                </p>
                <div className="space-y-2">
                  {searchQuery && (
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear search
                    </Button>
                  )}
                  {activeFiltersCount > 0 && (
                    <Button variant="outline" onClick={resetFilters}>
                      Reset all filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Lightbox */}
        <AnimatePresence>
          {selectedImg && (
            <Dialog
              open={!!selectedImg}
              onOpenChange={open => !open && closeLightbox()}
            >
              <DialogContent
                className="max-h-[95vh] max-w-[95vw] overflow-hidden sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-6xl"
                ref={lightboxRef}
                {...(isMobile ? swipeHandlers : {})}
              >
                <DialogHeader className="flex-row items-center justify-between space-y-0 pb-4">
                  <div className="min-w-0 flex-1">
                    <DialogTitle className="truncate text-xl font-bold">
                      {selectedImg.title}
                    </DialogTitle>
                    <div className="mt-1 flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {selectedImg.artist}
                      </span>
                      <Badge variant="outline" className="ml-2">
                        {selectedImg.year}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 items-center gap-2">
                    {/* Favorite Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => toggleFavorite(selectedImg.id)}
                      aria-label={
                        favorites.has(selectedImg.id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          favorites.has(selectedImg.id) &&
                            "fill-red-500 text-red-500",
                        )}
                      />
                    </Button>

                    {/* Zoom Controls */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        setZoomLevel(prev => Math.max(prev - 0.25, 0.5))
                      }
                      disabled={zoomLevel <= 0.5}
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[3rem] text-center text-sm tabular-nums">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        setZoomLevel(prev => Math.min(prev + 0.25, 3))
                      }
                      disabled={zoomLevel >= 3}
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>

                    {/* Info Toggle */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setShowInfo(prev => !prev)}
                      aria-pressed={showInfo}
                      aria-label="Toggle image information"
                    >
                      <Info className="h-4 w-4" />
                    </Button>

                    {/* Download Button */}
                    {selectedImg.downloadUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        asChild
                      >
                        <a
                          href={selectedImg.downloadUrl}
                          download
                          aria-label="Download image"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </DialogHeader>

                <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg bg-black/5">
                  {/* Navigation Buttons */}
                  {processedImages.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 z-10 h-10 w-10 rounded-full bg-black/20 p-0 backdrop-blur-sm hover:bg-black/40"
                        onClick={() => navigateImage(-1)}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6 text-white" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 z-10 h-10 w-10 rounded-full bg-black/20 p-0 backdrop-blur-sm hover:bg-black/40"
                        onClick={() => navigateImage(1)}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6 text-white" />
                      </Button>
                    </>
                  )}

                  {/* High-Resolution Image */}
                  <div
                    className="relative h-full w-full cursor-grab overflow-hidden active:cursor-grabbing"
                    style={{ cursor: zoomLevel > 1 ? "move" : "default" }}
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
                        priority
                      />
                    </div>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
                    {currentIndex + 1} / {processedImages.length}
                  </div>

                  {/* Mobile Swipe Indicator */}
                  {isMobile && processedImages.length > 1 && (
                    <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                      Swipe to navigate
                    </div>
                  )}
                </div>

                {/* Enhanced Metadata Panel */}
                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 rounded-lg border bg-muted/50 p-4">
                        <DialogDescription className="mb-4 text-base">
                          {selectedImg.description}
                        </DialogDescription>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                Artist:
                              </span>
                              <span className="text-sm">
                                {selectedImg.artist}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">Year:</span>
                              <span className="text-sm">
                                {selectedImg.year}
                              </span>
                            </div>
                            {selectedImg.rating && (
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                  Rating:
                                </span>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        "h-3 w-3",
                                        i < (selectedImg.rating || 0)
                                          ? "fill-current text-yellow-400"
                                          : "text-muted-foreground",
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                Award:
                              </span>
                              <Badge
                                variant={
                                  selectedImg.awardType === "Winner"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {selectedImg.awardType}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Filter className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                Category:
                              </span>
                              <span className="text-sm">
                                {selectedImg.category}
                              </span>
                            </div>
                            {selectedImg.tags &&
                              selectedImg.tags.length > 0 && (
                                <div className="space-y-1">
                                  <span className="text-sm font-medium">
                                    Tags:
                                  </span>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedImg.tags.map(tag => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Keyboard Shortcuts Help */}
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Shortcuts:</span>
                  <span className="hidden sm:inline">
                    {" "}
                    Arrow keys (navigate),{" "}
                    <kbd className="mx-1 rounded border px-1">+</kbd>/
                    <kbd className="mx-1 rounded border px-1">-</kbd> (zoom),
                    <kbd className="mx-1 rounded border px-1">
                      i
                    </kbd> (info),{" "}
                    <kbd className="mx-1 rounded border px-1">f</kbd>{" "}
                    (favorite),
                    <kbd className="mx-1 rounded border px-1">Esc</kbd> (close)
                  </span>
                  <span className="sm:hidden">
                    {" "}
                    Swipe to navigate, pinch to zoom
                  </span>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>

        {/* Live Region for Screen Readers */}
        <div aria-live="polite" className="sr-only">
          {processedImages.length > 0 &&
            `Gallery updated. Showing ${processedImages.length} images.`}
        </div>
      </section>
    </div>
  );
}
