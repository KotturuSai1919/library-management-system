"use client"

import { BarChart3, BookOpen, TrendingUp, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock analytics data
const analyticsData = {
  totalBooks: 1247,
  totalUsers: 342,
  activeBorrows: 89,
  overdueBooks: 12,
  monthlyBorrows: [
    { month: "Jan", borrows: 45 },
    { month: "Feb", borrows: 52 },
    { month: "Mar", borrows: 48 },
    { month: "Apr", borrows: 61 },
    { month: "May", borrows: 73 },
    { month: "Jun", borrows: 67 },
  ],
  popularGenres: [
    { genre: "Fiction", count: 156 },
    { genre: "Science", count: 89 },
    { genre: "History", count: 67 },
    { genre: "Biography", count: 45 },
    { genre: "Fantasy", count: 123 },
  ],
}

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Library Analytics</h3>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalBooks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Borrows</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.activeBorrows}</div>
            <p className="text-xs text-muted-foreground">+15% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{analyticsData.overdueBooks}</div>
            <p className="text-xs text-muted-foreground">-3% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Borrows Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Borrowing Trends</CardTitle>
          <CardDescription>Number of books borrowed per month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.monthlyBorrows.map((data) => (
              <div key={data.month} className="flex items-center">
                <div className="w-12 text-sm font-medium">{data.month}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-primary" style={{ width: `${(data.borrows / 80) * 100}%` }} />
                    <span className="text-sm text-muted-foreground">{data.borrows}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Genres */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Genres</CardTitle>
          <CardDescription>Most borrowed book genres</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.popularGenres.map((data) => (
              <div key={data.genre} className="flex items-center">
                <div className="w-20 text-sm font-medium">{data.genre}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-4 bg-primary" style={{ width: `${(data.count / 160) * 100}%` }} />
                    <span className="text-sm text-muted-foreground">{data.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
