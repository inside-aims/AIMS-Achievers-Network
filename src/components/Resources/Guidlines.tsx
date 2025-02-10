"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const guidelines = [
  {
    title: "Nomination Guidelines",
    items: [
      "Ensure the nominee meets all eligibility criteria for the chosen category.",
      "Provide detailed and specific examples of the nominee's achievements.",
      "Submit all required documentation before the nomination deadline.",
      "Obtain consent from the nominee before submitting their nomination.",
      "Adhere to the word limit for each section of the nomination form.",
    ],
  },
  {
    title: "Evaluation Criteria",
    items: [
      "Impact: The significance and reach of the nominee's contributions.",
      "Innovation: The originality and creativity of the nominee's work.",
      "Leadership: The nominee's ability to inspire and guide others.",
      "Academic Excellence: The nominee's scholarly achievements and recognition.",
      "Community Engagement: The nominee's involvement in and impact on their community.",
    ],
  },
  {
    title: "Submission Process",
    items: [
      "Create an account on the AAN Awards portal.",
      "Select the appropriate award category for your nomination.",
      "Fill out all required fields in the nomination form.",
      "Upload any supporting documents (e.g., CV, recommendation letters).",
      "Review your submission carefully before final submission.",
    ],
  },
]

export default function GuidelinesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl text-award-gold mb-6 font-cinzel">Guidelines</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidelines.map((guideline, index) => (
          <Card key={index} className="bg-award-blue/10 border-award-gold/20">
            <CardHeader>
              <CardTitle className="text-award-gold font-cinzel">{guideline.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {guideline.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-award-silver font-poppins">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  )
}

