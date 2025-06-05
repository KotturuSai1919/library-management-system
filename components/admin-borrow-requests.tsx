"use client"

import { useState } from "react"
import { Check, Clock, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for borrow requests
const mockBorrowRequests = [
  {
    id: "1",
    userName: "Alice Johnson",
    userEmail: "alice@example.com",
    bookTitle: "The Great Gatsby",
    bookAuthor: "F. Scott Fitzgerald",
    requestDate: "2023-05-20",
    status: "pending",
  },
  {
    id: "2",
    userName: "Bob Smith",
    userEmail: "bob@example.com",
    bookTitle: "To Kill a Mockingbird",
    bookAuthor: "Harper Lee",
    requestDate: "2023-05-19",
    status: "pending",
  },
  {
    id: "3",
    userName: "Carol Davis",
    userEmail: "carol@example.com",
    bookTitle: "1984",
    bookAuthor: "George Orwell",
    requestDate: "2023-05-18",
    status: "approved",
  },
]

export function AdminBorrowRequests() {
  const [requests, setRequests] = useState(mockBorrowRequests)
  const [processingRequest, setProcessingRequest] = useState<string | null>(null)

  const handleApproveRequest = async (requestId: string) => {
    setProcessingRequest(requestId)

    try {
      // In a real app, this would call a server action to approve the request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the UI
      setRequests(requests.map((req) => (req.id === requestId ? { ...req, status: "approved" } : req)))
    } catch (error) {
      console.error("Failed to approve request:", error)
    } finally {
      setProcessingRequest(null)
    }
  }

  const handleRejectRequest = async (requestId: string) => {
    setProcessingRequest(requestId)

    try {
      // In a real app, this would call a server action to reject the request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the UI
      setRequests(requests.map((req) => (req.id === requestId ? { ...req, status: "rejected" } : req)))
    } catch (error) {
      console.error("Failed to reject request:", error)
    } finally {
      setProcessingRequest(null)
    }
  }

  const pendingRequests = requests.filter((req) => req.status === "pending")
  const processedRequests = requests.filter((req) => req.status !== "pending")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Pending Requests ({pendingRequests.length})</h3>
        {pendingRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Clock className="mb-2 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-1 text-lg font-medium">No pending requests</h3>
            <p className="text-sm text-muted-foreground">All borrow requests have been processed.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {pendingRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{request.bookTitle}</CardTitle>
                  <CardDescription>{request.bookAuthor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Requested by:</span>
                      <span>{request.userName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-xs">{request.userEmail}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{request.requestDate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleApproveRequest(request.id)}
                    disabled={processingRequest === request.id}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleRejectRequest(request.id)}
                    disabled={processingRequest === request.id}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Recent Processed Requests</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {processedRequests.map((request) => (
            <Card key={request.id} className="opacity-75">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span className="line-clamp-1">{request.bookTitle}</span>
                  <Badge variant={request.status === "approved" ? "default" : "destructive"}>{request.status}</Badge>
                </CardTitle>
                <CardDescription>{request.bookAuthor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Requested by:</span>
                    <span>{request.userName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{request.requestDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
