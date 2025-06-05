"use server"

import { redirect } from "next/navigation"

// Mock user database - in a real app, this would be a proper database
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "user@example.com",
    password: "password123", // In real app, this would be hashed
    role: "user",
    studentId: "STU12345",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In real app, this would be hashed
    role: "admin",
    staffId: "LIB12345",
    department: "Reference Section",
  },
]

export async function registerUser(userData: {
  name: string
  email: string
  password: string
  role: string
  studentId?: string
  staffId?: string
  department?: string
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  const existingUser = mockUsers.find((user) => user.email === userData.email)
  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // In a real app, you would:
  // 1. Hash the password
  // 2. Save to database
  // 3. Send verification email

  const newUser = {
    id: `${mockUsers.length + 1}`,
    name: userData.name,
    email: userData.email,
    password: userData.password, // In real app, this would be hashed
    role: userData.role,
    ...(userData.studentId && { studentId: userData.studentId }),
    ...(userData.staffId && { staffId: userData.staffId }),
    ...(userData.department && { department: userData.department }),
  }

  mockUsers.push(newUser as any)

  console.log("New user registered:", newUser)
  return { success: true, message: "User registered successfully" }
}

export async function loginUser(credentials: {
  email: string
  password: string
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find user by email
  const user = mockUsers.find((user) => user.email === credentials.email)

  if (!user || user.password !== credentials.password) {
    throw new Error("Invalid email or password")
  }

  // In a real app, you would:
  // 1. Verify hashed password
  // 2. Create JWT token
  // 3. Set secure cookies

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export async function logoutUser() {
  // In a real app, you would:
  // 1. Clear JWT token
  // 2. Clear cookies
  // 3. Invalidate session

  redirect("/login")
}
