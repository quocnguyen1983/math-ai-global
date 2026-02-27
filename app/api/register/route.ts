import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()

const { name, email, password } = body as {
  name: string
  email: string
  password: string
}

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
  },
});

    return NextResponse.json({ message: 'User created', user })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}