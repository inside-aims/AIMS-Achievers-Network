"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "./Logo"
import { Search, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const menuItems = [
  {
    title: "About",
    submenu: ["Our Mission", "History", "Team"],
  },
  {
    title: "Awards",
    submenu: ["Categories", "Past Winners", "Nomination Process"],
  },
  {
    title: "Events",
    submenu: ["Upcoming", "Past Events", "Gallery"],
  },
  {
    title: "Resources",
    submenu: ["FAQs", "Guidelines", "Contact"],
  },
]

const NavItem = ({ title, submenu }: { title: string; submenu: string[] }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center px-4 py-2 font-cinzel text-lg text-award-silver hover:text-award-gold transition-colors">
        {title}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-black/90 ring-1 ring-award-gold ring-opacity-20"
          >
            <div className="py-1">
              {submenu.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block px-4 py-2 text-sm font-poppins text-award-silver hover:bg-award-blue/20 hover:text-award-gold"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-cinzel text-2xl font-bold text-award-gold">AAN</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <NavItem key={item.title} {...item} />
            ))}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-award-silver hover:text-award-gold transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <Button className="bg-award-gold text-black hover:bg-award-gold/90">Nominate Now</Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-award-silver hover:text-award-gold transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-black/90 p-4"
          >
            <div className="container mx-auto flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="flex-grow mr-2 bg-award-blue/10 border-award-gold/20 text-white"
              />
              <Button className="bg-award-gold text-black hover:bg-award-gold/90">Search</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90"
          >
            <div className="container mx-auto px-4 py-4">
              {menuItems.map((item) => (
                <div key={item.title} className="py-2">
                  <h3 className="font-cinzel text-lg font-bold text-award-gold mb-2">{item.title}</h3>
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem}
                      href="#"
                      className="block py-1 font-poppins text-sm text-award-silver hover:text-award-gold"
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="mt-4">
                <Button className="w-full bg-award-gold text-black hover:bg-award-gold/90">Nominate Now</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

