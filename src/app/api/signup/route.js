import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConn";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";

const SALT_ROUNDS = 10; 

export async function POST(req, res) {
    try {
        const body = await req.json();

        const { username, email, password } = body;
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Username, email, and password are required" },
                { status: 400 }
            );
        }

        await dbConnect();


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }


        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);


       
        await User.create({ username, email, password: hashedPassword });

        return NextResponse.json(
            { message: "Signup successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Server error, please try again" },
            { status: 500 }
        );
    }
}
