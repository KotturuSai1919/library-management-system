"use client"

import { useState } from "react"
import { Edit, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminAddBookDialog } from "@/components/admin-add-book-dialog"
import { AdminEditBookDialog } from "@/components/admin-edit-book-dialog"
import { deleteBook } from "@/lib/actions/book-actions"

// Mock data for books
const mockBooks = [
  {
    id: "1",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    publishedYear: 1951,
    isbn: "978-0-316-76948-0",
    totalCopies: 5,
    availableCopies: 3,
  },
  {
    id: "2",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    publishedYear: 1813,
    isbn: "978-0-14-143951-8",
    totalCopies: 4,
    availableCopies: 2,
  },
  {
    id: "3",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedYear: 1937,
    isbn: "978-0-618-00221-4",
    totalCopies: 3,
    availableCopies: 0,
  },
  {
    id: "4",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publishedYear: 1997,
    isbn: "978-0-7475-3269-9",
    totalCopies: 8,
    availableCopies: 5,
  },
  {
    id: "5",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedYear: 1954,
    isbn: "978-0-618-57498-5",
    totalCopies: 6,
    availableCopies: 1,
  },
]

interface AdminBookInventoryProps {
  searchQuery: string
}

export function AdminBookInventory({ searchQuery }: AdminBookInventoryProps) {
  const [books, setBooks] = useState(mockBooks)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<(typeof mockBooks)[0] | null>(null)
  const [deletingBook, setDeletingBook] = useState<string | null>(null)

  // Filter books based on search query
  const filteredBooks = books.filter((book) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query)
    )
  })

  const handleAddBook = (newBook: any) => {
    // In a real app, this would call a server action to add the book
    const bookWithId = {
      ...newBook,
      id: `${books.length + 1}`,
      availableCopies: newBook.totalCopies,
    }
    setBooks([...books, bookWithId])
    setIsAddDialogOpen(false)
  }

  const handleEditBook = (updatedBook: any) => {
    // In a real app, this would call a server action to update the book
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)))
    setEditingBook(null)
  }

  const handleDeleteBook = async (bookId: string) => {
    setDeletingBook(bookId)

    try {
      // In a real app, this would call a server action to delete the book
      await deleteBook(bookId)

      // Update the UI by removing the deleted book
      setBooks(books.filter((book) => book.id !== bookId))
    } catch (error) {
      console.error("Failed to delete book:", error)
    } finally {
      setDeletingBook(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Book Inventory</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle className="line-clamp-1">{book.title}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Genre:</span>
                  <span>{book.genre}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Published:</span>
                  <span>{book.publishedYear}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="font-mono text-xs">{book.isbn}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Copies:</span>
                  <span>
                    <Badge variant={book.availableCopies > 0 ? "outline" : "secondary"}>
                      {book.availableCopies}/{book.totalCopies} available
                    </Badge>
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingBook(book)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleDeleteBook(book.id)}
                disabled={deletingBook === book.id}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {deletingBook === book.id ? "Deleting..." : "Delete"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-1 text-lg font-medium">No books found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? "No books match your search criteria." : "There are no books in the inventory."}
          </p>
        </div>
      )}

      <AdminAddBookDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAddBook={handleAddBook} />

      {editingBook && (
        <AdminEditBookDialog
          open={!!editingBook}
          onOpenChange={() => setEditingBook(null)}
          book={editingBook}
          onEditBook={handleEditBook}
        />
      )}
    </div>
  )
}
