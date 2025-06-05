"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, LogOut, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserBorrowedBooks } from "@/components/user-borrowed-books"
import { UserBookSearch } from "@/components/user-book-search"
import { UserBookRequest } from "@/components/user-book-request"

export default function UserDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary-foreground">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">LibraryHub</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-primary-foreground">Welcome, {user.name}</span>
            <Link href="/login">
              <Button variant="secondary" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container flex-1 py-8">
        <h1 className="mb-6 text-3xl font-bold">Reader Dashboard</h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for books..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="borrowed" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="borrowed">My Borrowed Books</TabsTrigger>
            <TabsTrigger value="available">Available Books</TabsTrigger>
            <TabsTrigger value="request">Request New Book</TabsTrigger>
          </TabsList>
          <TabsContent value="borrowed">
            <UserBorrowedBooks />
          </TabsContent>
          <TabsContent value="available">
            <UserBookSearch searchQuery={searchQuery} />
          </TabsContent>
          <TabsContent value="request">
            <UserBookRequest />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LibraryHub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
