
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type React from "react" // Import React

type FormData = {
  category: string;
  nominee: {
    fullName: string;
    institution: string;
    department: string;
    levelOfStudy: string;
    email: string;
    phone: string;
  };
  justification: string;
  documents: string[]; // Assuming these are file URLs or file names
  socialMediaLink: string;
  nominator: {
    name: string;
    email: string;
    relationship: string;
  };
};


interface NominatorDetailsProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export default function NominatorDetails({ formData, updateFormData, onNext, onPrevious }: NominatorDetailsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ nominator: { ...formData.nominator, [name]: value } })
  }

  const handleSelectChange = (value: string) => {
    updateFormData({ nominator: { ...formData.nominator, relationship: value } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-award-gold mb-4 font-cinzel">Nominator Details</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nominatorName">Full Name</Label>
          <Input
            id="nominatorName"
            name="name"
            value={formData.nominator.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="bg-award-blue/10 border-award-gold/20 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nominatorEmail">Email</Label>
          <Input
            id="nominatorEmail"
            name="email"
            type="email"
            value={formData.nominator.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className="bg-award-blue/10 border-award-gold/20 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="relationship">Relationship to Nominee</Label>
          <Select onValueChange={handleSelectChange} value={formData.nominator.relationship}>
            <SelectTrigger id="relationship" className="bg-award-blue/10 border-award-gold/20 text-white">
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="peer">Peer</SelectItem>
              <SelectItem value="lecturer">Lecturer</SelectItem>
              <SelectItem value="clubPresident">Club President</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button onClick={onPrevious} variant="outline">
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!formData.nominator.name || !formData.nominator.email || !formData.nominator.relationship}
          className="bg-award-gold hover:bg-award-gold/80 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  )
}

