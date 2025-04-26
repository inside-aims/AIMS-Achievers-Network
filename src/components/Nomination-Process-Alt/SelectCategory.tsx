/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Book, Users, Lightbulb, Star } from "lucide-react"

interface SelectCategoryProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

const categories = [
  { id: "academic", name: "Academic Excellence", icon: Book },
  { id: "innovation", name: "Innovation", icon: Lightbulb },
  { id: "leadership", name: "Leadership", icon: Users },
  { id: "community", name: "Community Impact", icon: Star },
  { id: "overall", name: "Overall Achievement", icon: Award },
]

export default function SelectCategory({ formData, updateFormData, onNext }: SelectCategoryProps) {
  const handleSelectCategory = (categoryId: string) => {
    updateFormData({ category: categoryId })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-award-gold mb-4 font-cinzel">Select Award Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card
              className={`cursor-pointer bg-award-blue/10 border-award-gold/20 ${
                formData.category === category.id ? "border-award-gold bg-award-blue/20" : ""
              }`}
              onClick={() => handleSelectCategory(category.id)}
            >
              <CardContent className="flex flex-col items-center p-4">
                <category.icon className="w-12 h-12 text-award-gold mb-2" />
                <h3 className="font-semibold text-lg text-center text-award-silver font-poppins">{category.name}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={onNext}
          disabled={!formData.category}
          className="bg-award-gold hover:bg-award-gold/80 text-black font-bold"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

