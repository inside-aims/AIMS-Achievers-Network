// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { AlertCircle } from "lucide-react"

// interface NomineeConfirmationProps {
//   formData: any
//   onNext: () => void
//   onPrevious: () => void
// }

// export default function NomineeConfirmation({ formData, onNext, onPrevious }: NomineeConfirmationProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-6"
//     >
//       <h2 className="text-2xl font-bold text-award-gold mb-4 font-cinzel">Nominee Confirmation</h2>
//       <Alert className="bg-award-blue/10 border-award-gold/20">
//         <AlertCircle className="h-4 w-4" />
//         <AlertTitle>Confirmation Required</AlertTitle>
//         <AlertDescription>
//           An email has been sent to {formData.nominee.email} with a verification link. The nominee must confirm their
//           nomination to proceed.
//         </AlertDescription>
//       </Alert>
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold mb-2">Next Steps:</h3>
//         <ol className="list-decimal list-inside space-y-2">
//           <li>The nominee will receive an email with a confirmation link.</li>
//           <li>They must click the link to verify and accept the nomination.</li>
//           <li>Once confirmed, the nomination will be reviewed by our team.</li>
//           <li>If approved, the nominee's profile will be listed for voting.</li>
//         </ol>
//       </div>
//       <div className="flex justify-between mt-6">
//         <Button onClick={onPrevious} variant="outline">
//           Previous
//         </Button>
//         <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white">
//           Continue
//         </Button>
//       </div>
//     </motion.div>
//   )
// }

