// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { ThumbsUp } from "lucide-react"

// export default function VotingPhase() {
//   // In a real application, you would fetch this data from an API
//   const nominees = [
//     { id: 1, name: "John Doe", category: "Academic Excellence", votes: 120, image: "/placeholder.svg" },
//     { id: 2, name: "Jane Smith", category: "Innovation", votes: 98, image: "/placeholder.svg" },
//     { id: 3, name: "Alex Johnson", category: "Leadership", votes: 85, image: "/placeholder.svg" },
//   ]

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-6"
//     >
//       <h2 className="text-2xl font-bold text-award-gold mb-4 font-cinzel">Voting Phase</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {nominees.map((nominee) => (
//           <Card key={nominee.id} className="bg-award-blue/10 border-award-gold/20">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2 text-award-gold">
//                 <Avatar>
//                   <AvatarImage src={nominee.image} alt={nominee.name} />
//                   <AvatarFallback>
//                     {nominee.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <span>{nominee.name}</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-award-silver mb-2">{nominee.category}</p>
//               <div className="flex justify-between items-center">
//                 <span className="text-lg font-semibold text-award-gold">{nominee.votes} votes</span>
//                 <Button size="sm" className="bg-award-gold hover:bg-award-gold/80 text-black font-bold">
//                   <ThumbsUp className="w-4 h-4 mr-2" /> Vote
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       <div className="mt-6">
//         <p className="text-center text-award-silver">
//           Voting closes in <span className="font-bold text-award-gold">14 days, 6 hours, 32 minutes</span>
//         </p>
//       </div>
//     </motion.div>
//   )
// }

