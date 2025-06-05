"use client"

import { useState } from "react"
import { Book, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { borrowBook } from "@/lib/actions/book-actions"

// Mock data for available books
const mockAvailableBooks = [
  {
    id: "1",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    publishedYear: 1951,
    availableCopies: 3,
  },
  {
    id: "2",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    publishedYear: 1813,
    availableCopies: 2,
  },
  {
    id: "3",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedYear: 1937,
    availableCopies: 0,
  },
  {
    id: "4",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publishedYear: 1997,
    availableCopies: 5,
  },
  {
    id: "5",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publishedYear: 1954,
    availableCopies: 1,
  },
]

interface UserBookSearchProps {
  searchQuery: string
}

export function UserBookSearch({ searchQuery }: UserBookSearchProps) {
  const [borrowingBook, setBorrowingBook] = useState<string | null>(null)

  // Filter books based on search query
  const filteredBooks = mockAvailableBooks.filter((book) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    )
  })

  const handleBorrowBook = async (bookId: string) => {
    setBorrowingBook(bookId)

    try {
      // In a real app, this would call a server action to borrow the book
      await borrowBook(bookId)

      // Show success message or update UI
      alert("Book borrowed successfully!")
    } catch (error) {
      console.error("Failed to borrow book:", error)
    } finally {
      setBorrowingBook(null)
    }
  }

  if (filteredBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <BookOpen className="mb-2 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-1 text-lg font-medium">No books found</h3>
        <p className="text-sm text-muted-foreground">
          {searchQuery ? "No books match your search criteria." : "There are no books available at the moment."}
        </p>
      </div>
    )
  }

  return (
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
                <span className="text-muted-foreground">Available:</span>
                <Badge variant={book.availableCopies > 0 ? "outline" : "secondary"}>
                  {book.availableCopies} {book.availableCopies === 1 ? "copy" : "copies"}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={book.availableCopies === 0 || borrowingBook === book.id}
              onClick={() => handleBorrowBook(book.id)}
            >
              {borrowingBook === book.id ? (
                "Processing..."
              ) : book.availableCopies === 0 ? (
                "Not Available"
              ) : (
                <>
                  <Book className="mr-2 h-4 w-4" />
                  Borrow Book
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
