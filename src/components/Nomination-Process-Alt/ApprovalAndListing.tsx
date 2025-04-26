import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock } from "lucide-react"

interface ApprovalAndListingProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any
  onNext: () => void
  onPrevious: () => void
}

export default function ApprovalAndListing({ formData, onNext, onPrevious }: ApprovalAndListingProps) {
  // In a real application, you would check the actual status from the backend
  const isApproved = Math.random() > 0.5 // Simulating approval status

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-award-gold mb-4 font-cinzel">Approval & Listing Status</h2>
      <Card className="bg-award-blue/10 border-award-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            {isApproved ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                Approved
              </>
            ) : (
              <>
                <Clock className="w-6 h-6 text-yellow-500 mr-2" />
                Pending Approval
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isApproved ? (
            <p>
              Congratulations! The nomination for {formData.nominee.fullName} has been approved. Their profile is now
              listed for voting.
            </p>
          ) : (
            <p>
              The nomination for {formData.nominee.fullName} is currently under review. We&apos;ll notify you once it&apos;s
              approved.
            </p>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between mt-6">
        <Button onClick={onPrevious} variant="outline">
          Previous
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white">
          Proceed to Voting
        </Button>
      </div>
    </motion.div>
  )
}

