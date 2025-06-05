import Link from "next/link"
import { BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary-foreground">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">LibraryHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/20 to-background py-20">
          <div className="container text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Welcome to LibraryHub</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Your comprehensive library management solution for readers and librarians
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register/user">
                <Button size="lg">Register as Reader</Button>
              </Link>
              <Link href="/register/admin">
                <Button size="lg" variant="outline">
                  Register as Librarian
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border p-6">
                <h3 className="mb-3 text-xl font-semibold">For Readers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Browse available books</li>
                  <li>• Track borrowed books</li>
                  <li>• Request new titles</li>
                  <li>• Manage your reading history</li>
                </ul>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-3 text-xl font-semibold">For Librarians</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Manage book inventory</li>
                  <li>• Process borrowing requests</li>
                  <li>• Track user activity</li>
                  <li>• Generate reports and analytics</li>
                </ul>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-3 text-xl font-semibold">Security</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Role-based access control</li>
                  <li>• Secure authentication</li>
                  <li>• Data encryption</li>
                  <li>• Privacy protection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LibraryHub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
