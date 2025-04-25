"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const socialPosts = [
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "User Generated Content 1",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "User Generated Content 2",
  },
  {
    src: "/placeholder.svg?height=300&width=300",
    alt: "User Generated Content 3",
  },
  // Add more social posts...
];

export default function SocialWall() {
  const [posts, setPosts] = useState(socialPosts);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a photo before uploading.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newPost = {
        src: reader.result as string,
        alt: `User Uploaded Content ${posts.length + 1}`,
      };
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setSelectedFile(null); // Reset input
    };

    reader.readAsDataURL(selectedFile); // Convert image to base64
  };

  return (
    <section className="container mx-auto py-12">
      <h2 className="mb-6 font-cinzel text-3xl text-award-gold">Social Wall</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={post.src}
              alt={post.alt}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:px-8 "
      >
        <h3 className="mb-4 text-center font-cinzel text-xl sm:text-left">
          Submit Your Event Photos
        </h3>

        <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full rounded border p-2 font-poppins sm:flex-1"
          />
          <Button type="submit" className="w-full font-poppins sm:w-auto">
            Upload
          </Button>
        </div>
      </form>
    </section>
  );
}
