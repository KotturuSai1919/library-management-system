"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, LogOut, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminBookInventory } from "@/components/admin-book-inventory"
import { AdminBorrowRequests } from "@/components/admin-borrow-requests"
import { AdminUserManagement } from "@/components/admin-user-management"
import { AdminAnalytics } from "@/components/admin-analytics"

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock admin data - in a real app, this would come from authentication
  const admin = {
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
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
            <span className="text-sm text-primary-foreground">Welcome, {admin.name}</span>
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
        <h1 className="mb-6 text-3xl font-bold">Librarian Dashboard</h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books or users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Book Inventory</TabsTrigger>
            <TabsTrigger value="requests">Borrow Requests</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="inventory">
            <AdminBookInventory searchQuery={searchQuery} />
          </TabsContent>
          <TabsContent value="requests">
            <AdminBorrowRequests />
          </TabsContent>
          <TabsContent value="users">
            <AdminUserManagement searchQuery={searchQuery} />
          </TabsContent>
          <TabsContent value="analytics">
            <AdminAnalytics />
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
