import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import type React from "react" // Added import for React

interface JustificationAndDocumentsProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onPrevious: () => void
}

export default function JustificationAndDocuments({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}: JustificationAndDocumentsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateFormData({ documents: Array.from(e.target.files) })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-award-gold mb-4 font-cinzel">Justification & Supporting Documents</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="justification">Why should this student be nominated? (250 words max)</Label>
          <Textarea
            id="justification"
            name="justification"
            value={formData.justification}
            onChange={handleInputChange}
            placeholder="Enter justification"
            rows={6}
            maxLength={250}
            className="bg-award-blue/10 border-award-gold/20 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="documents">Supporting Documents</Label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="documents"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-award-gold/20 border-dashed rounded-lg cursor-pointer bg-award-blue/10 hover:bg-award-blue/20"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-award-gold" />
                <p className="mb-2 text-sm text-award-silver">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-award-silver">PDF, DOC, DOCX (MAX. 10MB)</p>
              </div>
              <Input id="documents" type="file" className="hidden" onChange={handleFileChange} multiple />
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="socialMediaLink">Social Media Link or Website (Optional)</Label>
          <Input
            id="socialMediaLink"
            name="socialMediaLink"
            value={formData.socialMediaLink}
            onChange={handleInputChange}
            placeholder="Enter social media link or website"
            className="bg-award-blue/10 border-award-gold/20 text-white"
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button onClick={onPrevious} variant="outline">
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!formData.justification}
          className="bg-award-gold hover:bg-award-gold-dark text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  )
}

