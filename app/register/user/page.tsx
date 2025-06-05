import Link from "next/link"
import { BookOpen } from "lucide-react"

import { UserRegistrationForm } from "@/components/user-registration-form"

export default function UserRegistrationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary-foreground">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">LibraryHub</span>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center bg-muted/40 py-10">
        <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Reader Registration</h1>
            <p className="text-sm text-muted-foreground">Create an account to access the library</p>
          </div>
          <UserRegistrationForm />
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
