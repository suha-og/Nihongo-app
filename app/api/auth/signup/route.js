import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Scramble the password securely before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save the new user
    await User.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}