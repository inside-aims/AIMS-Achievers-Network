import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SidebarComponent = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg bg-award-blue/5 p-6 shadow-md"
    >
      <h2 className="mb-4 font-cinzel text-2xl text-award-gold">
        Featured Winners
      </h2>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center space-x-4">
            <Image
              src={`/placeholder.svg?height=80&width=80`}
              alt={`Featured Winner ${i}`}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h3 className="font-poppins text-lg font-semibold text-award-silver">
                John Doe {i}
              </h3>
              <p className="font-poppins text-sm text-white">
                Innovation Award 202{i + 2}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="mb-4 font-cinzel text-xl text-award-gold">
          Quick Links
        </h3>
        <ul className="space-y-2">
          <li>
            <Button
              variant="link"
              className="text-award-silver hover:text-award-gold"
            >
              <Link href="/nomination-process-alt">Nomination Process</Link>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="text-award-silver hover:text-award-gold"
            >
              <Link href="/#awards-category">Awards Category</Link>
              </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="text-award-silver hover:text-award-gold"
            >
              <Link href="/events#upcoming-events">Upcoming Events</Link>
              </Button>
          </li>
        </ul>
      </div>
    </motion.aside>
  );
};

export default SidebarComponent;
