"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import NomineeConfirmation from "@/components/Nomination-Process-Alt/NomineeComfirmation"
import VotingPhase from "@/components/Nomination-Process-Alt/VotingPhase"
import { Navbar } from "@/components/shared/Navigation/Navbar"
import NominationLanding from "@/components/Nomination-Process-Alt/NominationLanding"
import SelectCategory from "@/components/Nomination-Process-Alt/SelectCategory"
import NomineeDetails from "@/components/Nomination-Process-Alt/NomineeDetails"
import JustificationAndDocuments from "@/components/Nomination-Process-Alt/JustificationAndDocuments"
import NominatorDetails from "@/components/Nomination-Process-Alt/NominatorDetails"
import ApprovalAndListing from "@/components/Nomination-Process-Alt/ApprovalAndListing"
import ProgressBar from "@/components/Nomination-Process-Alt/ProgressBar"

const steps = [
  "Landing",
  "Select Category",
  "Nominee Details",
  "Justification & Documents",
  "Nominator Details",
  "Nominee Confirmation",
  "Approval & Listing",
  "Voting Phase",
]

export default function NominationProcessPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    category: "",
    nominee: {
      fullName: "",
      institution: "",
      department: "",
      levelOfStudy: "",
      email: "",
      phone: "",
    },
    justification: "",
    documents: [],
    socialMediaLink: "",
    nominator: {
      name: "",
      email: "",
      relationship: "",
    },
  })

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleUpdateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <NominationLanding onStart={handleNext} />
      case 1:
        return <SelectCategory formData={formData} updateFormData={handleUpdateFormData} onNext={handleNext} />
      case 2:
        return (
          <NomineeDetails
            formData={formData}
            updateFormData={handleUpdateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 3:
        return (
          <JustificationAndDocuments
            formData={formData}
            updateFormData={handleUpdateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 4:
        return (
          <NominatorDetails
            formData={formData}
            updateFormData={handleUpdateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 5:
        return <NomineeConfirmation formData={formData} onNext={handleNext} onPrevious={handlePrevious} />
      case 6:
        return <ApprovalAndListing formData={formData} onNext={handleNext} onPrevious={handlePrevious} />
      case 7:
        return <VotingPhase />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative top-20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-center text-award-gold mb-8 font-cinzel">Nomination Process</h1>
        <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

