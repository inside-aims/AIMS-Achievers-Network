"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const socialPosts = [
  { src: "/placeholder.svg?height=300&width=300", alt: "User Generated Content 1" },
  { src: "/placeholder.svg?height=300&width=300", alt: "User Generated Content 2" },
  { src: "/placeholder.svg?height=300&width=300", alt: "User Generated Content 3" },
  // Add more social posts...
]

export default function SocialWall() {
  const [posts, setPosts] = useState(socialPosts)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle photo submission logic here
    alert("Photo submitted successfully!")
  }

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl mb-6 font-cinzel text-award-gold">Social Wall</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={post.src || "/placeholder.svg"}
              alt={post.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-8">
        <h3 className="text-xl font-bold mb-4 font-cinzel">Submit Your Event Photos</h3>
        <div className="flex gap-4">
          <input type="file" accept="image/*" className="flex-grow p-2 border rounded font-poppins" />
          <Button type="submit" className="font-poppins">
            Upload
          </Button>
        </div>
      </form>
    </section>
  )
}

