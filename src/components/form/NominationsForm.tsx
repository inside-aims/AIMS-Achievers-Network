/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload } from "lucide-react";
import { getSupabaseBrowserClient } from "@/supabase/client";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  stageName: z.string().min(2, "Stage name must be at least 2 characters"),
  class: z.string().min(1, "Class is required"),
  level: z.string().min(1, "Level is required"),
  department: z.string().min(1, "Department is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  picture: z.any().optional(),
  categories: z
    .array(z.string())
    .min(1, "Select at least 1 category")
    .max(3, "Select maximum 3 categories"),
});

const categories = {
  "Leadership & Executive Portfolios": [
    "HOD/Patron of the Year*",
    "Best Lecturer of the Year*",
    "Best Executive of the Year",
    "Most Hardworking Executive of the Year",
    "Class Rep of the Year",
    "Best Department President of the Year",
  ],
  "Academic Portfolios": [
    "Best Student in Computer Science",
    "Best Student in Fashion",
    "Best Student in Statistics",
    "Best Student in Hospitality",
    "Best Student in Networking",
    "Best Student in Catering",
    "Best Student in Food Technology",
    "Best Student in Actuarial Science",
    "Best Student in AI and Robotics",
  ],
  "Lifestyle & Influence Portfolios": [
    "Gentleman of the Year",
    "Lady of the Year",
    "Most Influential Student of the Year",
    "Most Fashionable Student of the Year",
    "Most Popular Male Student of the Year",
    "Most Popular Female Student of the Year",
    "Best Female Political Activist of the Year",
    "Best Male Political Activist of the Year",
  ],
  "Entrepreneurship & Creativity": [
    "Best Male Student Entrepreneur of the Year",
    "Best Female Student Entrepreneur of the Year",
    "Graphic Designer of the Year",
    "Student Artist of the Year",
    "Best Dancer",
  ],
  "Sports & Versatility": [
    "Male Sport Student of the Year",
    "Female Sport Student of the Year",
    "Most Versatile Student of the Year",
    "Innovative Student of the Year",
  ],
  "Character & Miscellaneous": [
    "Perfect Gentleman of the Year",
    "Perfect Lady of the Year",
    "Course Rep of the Year",
    "Most Disciplined Student of the Year",
    "Best Student MC",
  ],
};

const departments = [
  "Computer Science",
  "Fashion",
  "Statistics",
  "Hospitality",
  "Networking",
  "Catering",
  "Food Technology",
  "Actuarial Science",
  "AI and Robotics",
];

export default function NominationPage() {
  const supabase = getSupabaseBrowserClient();
  const [hasApplied, setHasApplied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      stageName: "",
      class: "",
      level: "",
      department: "",
      phone: "",
      categories: [],
    },
  });

  useEffect(() => {
    const applied = localStorage.getItem("hasApplied");
    if (applied === "true") {
      setHasApplied(true);
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Nomination submitted:", values);
    console.log("Selected file:", selectedFile);
    setIsLoading(true);
    setErrorMessage(null);

    let uploadedImageUrl: string | null = null;
    let uploadedImageName: string | null = null;

    // 1. Handle profileImage upload to Supabase Storage
    if (selectedFile) {
      const file = selectedFile;
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `nominations.bucket/${fileName}`; // Adjust bucket name if needed
      uploadedImageName = fileName;

      try {
        const { error: uploadError } = await supabase.storage
          .from("nominations.bucket")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          setErrorMessage(`Image upload failed: ${uploadError.message}`);
          setIsLoading(false);
          return; // Stop submission if image upload fails
        }

        // Get the public URL of the uploaded image
        const { data: urlData } = supabase.storage
          .from("nominations.bucket")
          .getPublicUrl(filePath);

        uploadedImageUrl = urlData?.publicUrl || null;
      } catch (storageError: any) {
        console.error("Storage operation failed:", storageError);
        setErrorMessage(`Storage operation failed: ${storageError.message}`);
        setIsLoading(false);
        return;
      }
    }

    // Handle form submission logic here
    // const event_id_to_insert = null; // Replace with actual event_id if available

    try {
      const { data, error } = await supabase
        .from("nominations_form")
        .insert([
          {
            full_name: values.fullName,
            stage_name: values.stageName,
            class: values.class,
            level: values.level,
            department: values.department,
            phone: values.phone,
            categories: values.categories,
            picture_url: uploadedImageUrl,
            picture_name: uploadedImageName,
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting nomination:", error);
        toast.error("Error inserting nomination. Try again!");
        return;
      }

      console.log("Nomination submitted successfully:", data);
      toast.success("Nomination submitted successfully! Undergoing Review...");

      // Store in localStorage to prevent resubmission
      localStorage.setItem("hasApplied", "true");
      setHasApplied(true);
      setIsOpen(false); // Close modal after successful submission
    } catch (error: any) {
      console.error("Failed to submit nomination:", error);
      toast.error("Failed to submit nomination. Try again!");
      // You might want to show an error message to the user here
      return {
        success: false,
        error: error.message || "Failed to submit nomination. Try again!",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-8 text-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            disabled={hasApplied}
            className="bg-yellow-500 px-8 py-3 text-lg font-semibold text-black hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {hasApplied ? "Already Nominated" : "Nominate Someone (PFAs)"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-yellow-500 bg-black">
          <DialogHeader>
            <DialogTitle className="text-2xl text-yellow-500">
              Nomination Form
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Fill out the form below to nominate a student for
              recognition.(Approval sms will be sent to your phone number within
              24 hours)
            </DialogDescription>
          </DialogHeader>

          {errorMessage && (
            <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
              <p>{errorMessage}</p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-yellow-500">Full Name</FormLabel>
                    <FormDescription className="text-gray-400">
                      Name will be on your certificate
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Enter full name"
                        {...field}
                        className="border-gray-700 bg-gray-900 text-white focus:border-yellow-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stageName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-yellow-500">
                      Stage Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter stage name"
                        {...field}
                        className="border-gray-700 bg-gray-900 text-white focus:border-yellow-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-yellow-500">Class</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter class"
                          {...field}
                          className="border-gray-700 bg-gray-900 text-white focus:border-yellow-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-yellow-500">Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-700 bg-gray-900 text-white focus:border-yellow-500">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-gray-700 bg-gray-900">
                          <SelectItem
                            value="lvl 100"
                            className="text-white hover:bg-gray-800"
                          >
                            Level 100
                          </SelectItem>
                          <SelectItem
                            value="lvl 200"
                            className="text-white hover:bg-gray-800"
                          >
                            Level 200
                          </SelectItem>
                          <SelectItem
                            value="lvl 300"
                            className="text-white hover:bg-gray-800"
                          >
                            Level 300
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-yellow-500">
                      Department
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-700 bg-gray-900 text-white focus:border-yellow-500">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-gray-700 bg-gray-900">
                        {departments.map(dept => (
                          <SelectItem
                            key={dept}
                            value={dept}
                            className="text-white hover:bg-gray-800"
                          >
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-yellow-500">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        {...field}
                        className="border-gray-700 bg-gray-900 text-white focus:border-yellow-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <label className="mb-2 block font-medium text-yellow-500">
                  Picture Upload
                </label>
                <div className="rounded-lg border-2 border-dashed border-gray-700 p-6 text-center transition-colors hover:border-yellow-500">
                  <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="picture-upload"
                  />
                  <label
                    htmlFor="picture-upload"
                    className="cursor-pointer text-gray-300 hover:text-yellow-500"
                  >
                    {selectedFile
                      ? selectedFile.name
                      : "Click to upload picture"}
                  </label>
                </div>
              </div>

              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-yellow-500">
                      Categories
                    </FormLabel>
                    <FormDescription className="text-gray-400">
                      Select at least 1 and maximum 3 categories
                    </FormDescription>
                    <div className="space-y-4">
                      {Object.entries(categories).map(
                        ([groupName, groupCategories]) => (
                          <div key={groupName} className="space-y-2">
                            <h4 className="font-semibold text-yellow-400">
                              {groupName}
                            </h4>
                            <div className="grid grid-cols-1 gap-2 pl-4">
                              {groupCategories.map(category => (
                                <FormField
                                  key={category}
                                  control={form.control}
                                  name="categories"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={category}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              category,
                                            )}
                                            onCheckedChange={checked => {
                                              const currentCategories =
                                                field.value || [];
                                              if (checked) {
                                                if (
                                                  currentCategories.length < 3
                                                ) {
                                                  field.onChange([
                                                    ...currentCategories,
                                                    category,
                                                  ]);
                                                }
                                              } else {
                                                field.onChange(
                                                  currentCategories.filter(
                                                    value => value !== category,
                                                  ),
                                                );
                                              }
                                            }}
                                            disabled={
                                              !field.value?.includes(
                                                category,
                                              ) &&
                                              (field.value?.length || 0) >= 3
                                            }
                                            className="border-gray-600 data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal text-gray-300">
                                          {category}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-yellow-500 font-semibold text-black hover:bg-yellow-600"
                >
                  {isLoading ? "Submitting..." : "Submit Nomination"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {hasApplied && (
        <p className="mt-4 text-gray-400">
          You have already submitted a nomination. Thank you for participating!
        </p>
      )}
    </div>
  );
}
