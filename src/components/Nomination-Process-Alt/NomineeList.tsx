import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"
import VoteCounter from "./VoteCounter"

interface Nominee {
  id: number
  name: string
  category: string
  votes: number
  image: string
}

interface NomineeListProps {
  nominees: Nominee[]
}

export default function NomineeList({ nominees }: NomineeListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {nominees.map((nominee) => (
        <motion.div
          key={nominee.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-award-blue/10 border-award-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-award-gold">
                <Avatar>
                  <AvatarImage src={nominee.image} alt={nominee.name} />
                  <AvatarFallback>
                    {nominee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{nominee.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-award-silver mb-2">{nominee.category}</p>
              <div className="flex justify-between items-center">
                <VoteCounter votes={nominee.votes} />
                <Button size="sm" className="bg-award-gold hover:bg-award-gold/80 text-black font-bold">
                  <ThumbsUp className="w-4 h-4 mr-2" /> Vote
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

