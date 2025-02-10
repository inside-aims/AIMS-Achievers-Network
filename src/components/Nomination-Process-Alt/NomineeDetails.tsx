import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type React from "react" // Added import for React

interface NomineeDetailsProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onPrevious: () => void
}

export default function NomineeDetails({ formData, updateFormData, onNext, onPrevious }: NomineeDetailsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ nominee: { ...formData.nominee, [name]: value } })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    updateFormData({ nominee: { ...formData.nominee, [name]: value } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-award-gold mb-4 font-cinzel">Nominee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.nominee.fullName}
            onChange={handleInputChange}
            placeholder="Enter full name"
            className="bg-award-blue/10 border-award-gold/20 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution">Institution</Label>
          <Select onValueChange={handleSelectChange("institution")} value={formData.nominee.institution}>
            <SelectTrigger id="institution" className="bg-award-blue/10 border-award-gold/20 text-white">
              <SelectValue placeholder="Select institution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="university1">University 1</SelectItem>
              <SelectItem value="university2">University 2</SelectItem>
              <SelectItem value="university3">University 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            name="department"
            value={formData.nominee.department}
            onChange={handleInputChange}
            placeholder="Enter department"
            className="bg-award-blue/10 border-award-gold/20 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="levelOfStudy">Level of Study</Label>
          <Select onValueChange={handleSelectChange("levelOfStudy")} value={formData.nominee.levelOfStudy}>
            <SelectTrigger id="levelOfStudy" className="bg-award-blue/10 border-award-gold/20 text-white">
              <SelectValue placeholder="Select level of study" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="postgraduate">Postgraduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.nominee.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            className="bg-award-blue/10 border-award-gold/20 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.nominee.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            className="bg-award-blue/10 border-award-gold/20 text-white"
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="border-award-gold text-award-gold hover:bg-award-gold hover:text-black"
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!formData.nominee.fullName || !formData.nominee.institution}
          className="bg-award-gold hover:bg-award-gold/80 text-black font-bold"
        >
          Next
        </Button>
      </div>
    </motion.div>
  )
}

