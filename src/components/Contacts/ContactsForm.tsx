"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-award-blue/10 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl text-award-gold mb-6 font-cinzel">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-award-silver">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-black border-award-gold/20 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-award-silver">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-black border-award-gold/20 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="subject" className="text-award-silver">
            Subject
          </Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="bg-black border-award-gold/20 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="message" className="text-award-silver">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="bg-black border-award-gold/20 text-white"
            rows={5}
            required
          />
        </div>
        <Button type="submit" className="bg-award-gold hover:bg-award-gold/80 text-black font-bold w-full">
          Send Message
        </Button>
      </form>
    </motion.section>
  )
}

