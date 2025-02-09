"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/shared/Navigation/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/NominationProcess/TextArea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { AnimatedButton } from "@/components/ui/animated-button"
import Footer from "@/components/shared/Footer/Footer"

const steps = [
  { id: 1, title: "Nominee Information" },
  { id: 2, title: "Award Category" },
  { id: 3, title: "Achievements" },
  { id: 4, title: "Supporting Documents" },
  { id: 5, title: "Review & Submit" },
]

const NominationProgressPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    nomineeName: "",
    nomineeEmail: "",
    nomineeInstitution: "",
    awardCategory: "",
    achievements: "",
    supportingDocuments: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, awardCategory: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, supportingDocuments: e.target.files?.[0] || null }))
    }
  }

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    // For now, let's just move to a "thank you" step
    setCurrentStep(steps.length + 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-2xl font-bold text-award-gold mb-4">Nominee Information</h2>
            <div className="space-y-4">
              <Input
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleInputChange}
                placeholder="Nominee's Full Name"
              />
              <Input
                name="nomineeEmail"
                value={formData.nomineeEmail}
                onChange={handleInputChange}
                placeholder="Nominee's Email"
                type="email"
              />
              <Input
                name="nomineeInstitution"
                value={formData.nomineeInstitution}
                onChange={handleInputChange}
                placeholder="Nominee's Institution"
              />
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-2xl font-bold text-award-gold mb-4">Award Category</h2>
            <Select onValueChange={handleSelectChange} value={formData.awardCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Award Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="academic-excellence">Academic Excellence</SelectItem>
                <SelectItem value="innovation">Innovation</SelectItem>
                <SelectItem value="community-impact">Community Impact</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
                <SelectItem value="lifetime-achievement">Lifetime Achievement</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        )
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-2xl font-bold text-award-gold mb-4">Achievements</h2>
            <Textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleInputChange}
              placeholder="Describe the nominee's key achievements and why they deserve this award"
              rows={6}
            />
          </motion.div>
        )
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-2xl font-bold text-award-gold mb-4">Supporting Documents</h2>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-award-blue file:text-award-gold hover:file:bg-award-blue/80"
            />
            <p className="text-sm text-award-silver mt-2">
              Upload any supporting documents (e.g., CV, recommendation letters) in PDF or DOC format.
            </p>
          </motion.div>
        )
      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-2xl font-bold text-award-gold mb-4">Review & Submit</h2>
            <div className="space-y-4">
              <p>
                <strong>Nominee:</strong> {formData.nomineeName}
              </p>
              <p>
                <strong>Email:</strong> {formData.nomineeEmail}
              </p>
              <p>
                <strong>Institution:</strong> {formData.nomineeInstitution}
              </p>
              <p>
                <strong>Award Category:</strong> {formData.awardCategory}
              </p>
              <p>
                <strong>Achievements:</strong> {formData.achievements}
              </p>
              <p>
                <strong>Supporting Documents:</strong>{" "}
                {formData.supportingDocuments ? formData.supportingDocuments.name : "No file uploaded"}
              </p>
            </div>
          </motion.div>
        )
      default:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <h2 className="text-3xl font-bold text-award-gold mb-4">Thank You!</h2>
            <p className="text-xl text-award-silver">
              Your nomination has been submitted successfully. We appreciate your participation in recognizing
              excellence in academia.
            </p>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative top-20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-award-gold mb-8 text-center">Nomination Process</h1>
        <div className="max-w-3xl mx-auto">
          {currentStep <= steps.length && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center ${
                      step.id === currentStep ? "text-award-gold" : "text-award-silver"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                        step.id === currentStep
                          ? "bg-award-gold text-black"
                          : step.id < currentStep
                            ? "bg-award-blue text-award-gold"
                            : "bg-award-blue/30 text-award-silver"
                      }`}
                    >
                      {step.id}
                    </div>
                    <span className="text-sm hidden md:block">{step.title}</span>
                  </div>
                ))}
              </div>
              <div className="h-2 bg-award-blue/30 mt-4 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-award-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {renderStep()}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && currentStep <= steps.length && (
                <Button onClick={handlePrevious} variant="outline">
                  Previous
                </Button>
              )}
              {currentStep < steps.length && (
                <AnimatedButton onClick={handleNext} className="ml-auto">
                  Next
                </AnimatedButton>
              )}
              {currentStep === steps.length && (
                <AnimatedButton type="submit" className="ml-auto">
                  Submit Nomination
                </AnimatedButton>
              )}
            </div>
          </form>
        </div>
        <div className="relative top-32">
        <Footer/>
        </div>
      </main>
    </div>
  )
}

export default NominationProgressPage

