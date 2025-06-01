import React from 'react'
import { Dialog,DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from '../ui/dialog'
import { Button } from '../ui/button'
import { useState } from 'react'

const PfaTerms = () => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
            <Button
            variant='link'
            className="font-bold text-blue-500 hover:text-blue-600 text-lg"
            onClick={()=> console.log("clicked")}
          >
            PFA Terms and Conditions
          </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-yellow-500 bg-black">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-yellow-500">
                    Pinnacle FAST Awards Terms and Conditions
                    </DialogTitle>
                    <DialogDescription>
                    By participating, you agree to the following...
                    </DialogDescription>
                </DialogHeader>

            <div>
                <p className="text-lg font-bold text-yellow-500">Voting System</p>

                <ul className=' list-disc list-inside'>
                    <li>⁠Each vote = GHS 1</li>
                    <li>Minimum votes to win: 400 votes (GHS 400)</li>
                    <li>Voting methods: Mobile Money or designated cash points</li>
                </ul>
                <p className=''> <span className="font-bold text-yellow-500">NB:</span> Organizers may introduce 2x,3x,4x..voting along the way</p>
            </div>

            <div>
                <p className='text-lg font-bold text-yellow-500'>Voting Period</p>

                <ul className=' list-disc list-inside'>
                    <li>⁠Organizers determine the voting closing date</li>
                    <li>Voting may close one week before the event</li>
                </ul>
            </div>

            <div>
                <p className='text-lg font-bold text-yellow-500'>Awards and Prizes</p>

                <ul className=' list-disc list-inside'>
                    <li>⁠Basic package (400+ votes): Certificate, citation, and plaque</li>
                    <li>Enhanced package (over GHS 800): Basic package + free event ticket</li>
                    <li>Nominees with over GHS 100 in votes: Free ticket and certificate</li>
                </ul>
            </div>

            <div>
                <p className='text-lg font-bold text-yellow-500'>Policies</p>

                <ul className=' list-disc list-inside'>
                    <li>Non-refundable votes and nomination monies</li>
                    <li>Winner determined by highest votes</li>
                    <li>No refunds for withdrawals</li>
                </ul>
            </div>

            <div>
                <p className='text-lg font-bold text-yellow-500'>Additional Note</p>

                <ul className=' list-disc list-inside'>
                    <li>Nominees with less than GHS 100 in votes will not receive any awards or benefits.</li>
                </ul>
            </div>

            <div>
                <p className='text-lg font-bold text-yellow-500'>Agreement</p>

                <p>By participating, you agree to these terms and conditions.</p>
            </div>

            </DialogContent>
        </Dialog>
    </>
  )
}

export default PfaTerms