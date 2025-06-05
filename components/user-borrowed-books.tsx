"use client"

import { useState } from "react"
import { Book, Calendar, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { returnBook } from "@/lib/actions/book-actions"

// Mock data for borrowed books
const mockBorrowedBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    borrowDate: "2023-05-15",
    dueDate: "2023-06-15",
    isOverdue: false,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    borrowDate: "2023-04-20",
    dueDate: "2023-05-20",
    isOverdue: true,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    borrowDate: "2023-05-01",
    dueDate: "2023-06-01",
    isOverdue: false,
  },
]

export function UserBorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState(mockBorrowedBooks)
  const [returningBook, setReturningBook] = useState<string | null>(null)

  const handleReturnBook = async (bookId: string) => {
    setReturningBook(bookId)

    try {
      // In a real app, this would call a server action to return the book
      await returnBook(bookId)

      // Update the UI by removing the returned book
      setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId))
    } catch (error) {
      console.error("Failed to return book:", error)
    } finally {
      setReturningBook(null)
    }
  }

  if (borrowedBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <Book className="mb-2 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-1 text-lg font-medium">No books borrowed</h3>
        <p className="text-sm text-muted-foreground">
          You haven&apos;t borrowed any books yet. Browse the available books to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {borrowedBooks.map((book) => (
        <Card key={book.id}>
          <CardHeader>
            <CardTitle className="flex items-start justify-between">
              <span className="line-clamp-1">{book.title}</span>
              {book.isOverdue && <Badge variant="destructive">Overdue</Badge>}
            </CardTitle>
            <CardDescription>{book.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Borrowed: {book.borrowDate}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className={book.isOverdue ? "text-destructive" : ""}>Due: {book.dueDate}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleReturnBook(book.id)}
              disabled={returningBook === book.id}
            >
              {returningBook === book.id ? (
                "Returning..."
              ) : (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Return Book
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
