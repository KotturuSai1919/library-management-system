"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Book, BookText, Calendar, User } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { requestBook } from "@/lib/actions/book-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

const bookRequestSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author must be at least 2 characters.",
  }),
  isbn: z.string().optional(),
  publishYear: z
    .string()
    .regex(/^\d{4}$/, {
      message: "Please enter a valid 4-digit year.",
    })
    .optional(),
  reason: z.string().min(10, {
    message: "Please provide a reason with at least 10 characters.",
  }),
})

export function UserBookRequest() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const form = useForm<z.infer<typeof bookRequestSchema>>({
    resolver: zodResolver(bookRequestSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      publishYear: "",
      reason: "",
    },
  })

  async function onSubmit(values: z.infer<typeof bookRequestSchema>) {
    setIsLoading(true)
    setSuccess(false)

    try {
      // In a real app, this would call a server action to submit the book request
      await requestBook(values)

      // Show success message and reset form
      setSuccess(true)
      form.reset()
    } catch (error) {
      console.error("Failed to submit book request:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-lg font-medium">Request a New Book</h3>
        <p className="text-sm text-muted-foreground">
          Can&apos;t find the book you&apos;re looking for? Submit a request and our librarians will consider adding it
          to our collection.
        </p>
      </div>

      {success && (
        <Alert className="bg-green-50 text-green-800">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Request submitted!</AlertTitle>
          <AlertDescription>
            Your book request has been submitted successfully. Our librarians will review it shortly.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <div className="relative">
                    <BookText className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter book title" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter author name" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Book className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="e.g., 978-3-16-148410-0" className="pl-8" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publishYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publication Year (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="e.g., 2023" className="pl-8" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Request</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please explain why you'd like this book to be added to our collection..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This helps our librarians prioritize book acquisitions.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Book Request"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
