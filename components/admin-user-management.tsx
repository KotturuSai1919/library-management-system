"use client"

import { useState } from "react"
import { Edit, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
    studentId: "STU001",
    joinDate: "2023-01-15",
    borrowedBooks: 2,
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "user",
    studentId: "STU002",
    joinDate: "2023-02-20",
    borrowedBooks: 1,
    status: "active",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    role: "user",
    studentId: "STU003",
    joinDate: "2023-03-10",
    borrowedBooks: 0,
    status: "suspended",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david@example.com",
    role: "admin",
    staffId: "LIB001",
    joinDate: "2022-09-01",
    borrowedBooks: 0,
    status: "active",
  },
]

interface AdminUserManagementProps {
  searchQuery: string
}

export function AdminUserManagement({ searchQuery }: AdminUserManagementProps) {
  const [users, setUsers] = useState(mockUsers)
  const [processingUser, setProcessingUser] = useState<string | null>(null)

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (user.studentId && user.studentId.toLowerCase().includes(query)) ||
      (user.staffId && user.staffId.toLowerCase().includes(query))
    )
  })

  const handleToggleUserStatus = async (userId: string) => {
    setProcessingUser(userId)

    try {
      // In a real app, this would call a server action to update user status
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the UI
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: user.status === "active" ? "suspended" : "active" } : user,
        ),
      )
    } catch (error) {
      console.error("Failed to update user status:", error)
    } finally {
      setProcessingUser(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    setProcessingUser(userId)

    try {
      // In a real app, this would call a server action to delete the user
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the UI
      setUsers(users.filter((user) => user.id !== userId))
    } catch (error) {
      console.error("Failed to delete user:", error)
    } finally {
      setProcessingUser(null)
    }
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <User className="mb-2 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-1 text-lg font-medium">No users found</h3>
        <p className="text-sm text-muted-foreground">
          {searchQuery ? "No users match your search criteria." : "There are no users registered."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">User Management ({filteredUsers.length} users)</h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span className="line-clamp-1">{user.name}</span>
                <div className="flex gap-1">
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                  <Badge variant={user.status === "active" ? "outline" : "destructive"}>{user.status}</Badge>
                </div>
              </CardTitle>
              <CardDescription className="line-clamp-1">{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-mono text-xs">{user.studentId || user.staffId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Joined:</span>
                  <span>{user.joinDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Borrowed:</span>
                  <span>{user.borrowedBooks} books</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleToggleUserStatus(user.id)}
                disabled={processingUser === user.id}
              >
                <Edit className="mr-2 h-4 w-4" />
                {user.status === "active" ? "Suspend" : "Activate"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleDeleteUser(user.id)}
                disabled={processingUser === user.id || user.borrowedBooks > 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
