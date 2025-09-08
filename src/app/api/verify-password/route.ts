import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const uploadPassword = process.env.UPLOAD_PASSWORD || 'admin123'

    if (password === uploadPassword) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Error verifying password' },
      { status: 500 }
    )
  }
}