import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const SidebarComponent = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-award-blue/5 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-award-gold mb-4 font-cinzel">Featured Winners</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Image
              src={`/placeholder.svg?height=80&width=80`}
              alt={`Featured Winner ${i}`}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-award-silver font-poppins">John Doe {i}</h3>
              <p className="text-sm text-white font-poppins">Innovation Award 202{i + 2}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-award-gold mb-4 font-cinzel">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Button variant="link" className="text-award-silver hover:text-award-gold">
              Nomination Process
            </Button>
          </li>
          <li>
            <Button variant="link" className="text-award-silver hover:text-award-gold">
              Award Categories
            </Button>
          </li>
          <li>
            <Button variant="link" className="text-award-silver hover:text-award-gold">
              Upcoming Events
            </Button>
          </li>
        </ul>
      </div>
    </motion.aside>
  )
}

export default SidebarComponent

