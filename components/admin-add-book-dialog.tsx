"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addBook } from "@/lib/actions/book-actions"

const bookFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author must be at least 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
  publishedYear: z.coerce
    .number()
    .int()
    .min(1000)
    .max(new Date().getFullYear(), {
      message: `Year must be between 1000 and ${new Date().getFullYear()}.`,
    }),
  isbn: z.string().min(10, {
    message: "ISBN must be at least 10 characters.",
  }),
  totalCopies: z.coerce.number().int().min(1, {
    message: "Total copies must be at least 1.",
  }),
})

interface AdminAddBookDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddBook: (book: z.infer<typeof bookFormSchema>) => void
}

export function AdminAddBookDialog({ open, onOpenChange, onAddBook }: AdminAddBookDialogProps) {
  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      publishedYear: new Date().getFullYear(),
      isbn: "",
      totalCopies: 1,
    },
  })

  async function onSubmit(values: z.infer<typeof bookFormSchema>) {
    try {
      // In a real app, this would call a server action to add the book
      await addBook(values)

      // Call the parent component's callback
      onAddBook(values)

      // Reset the form
      form.reset()
    } catch (error) {
      console.error("Failed to add book:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>Enter the details of the book you want to add to the library inventory.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} />
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
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Fiction, Fantasy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publication Year</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 978-3-16-148410-0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalCopies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Copies</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Book</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
