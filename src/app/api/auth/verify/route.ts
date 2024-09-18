import createUser from "@/app/models/createUser";
import { handleCryptoDecodeValue } from "@/lib/handlers/handleCrypto";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { postRequest } from "@/lib/types";
import { statusCodes } from "@/lib/enums";

export async function POST(req: postRequest) {
  try {
    const cookie = await req.json();
    if (!cookie) {
      throw new Error("No cookie found!");
    } else {
      const decodeCookie = handleCryptoDecodeValue(cookie.jwtToken);
      await connectDB();
      const findUser = await createUser.findOne({
        email: decodeCookie.email,
      });
      if (!findUser) {
        throw new Error("User not found!");
      } else if (findUser.password !== decodeCookie.password) {
        throw new Error("Password is incorrect!");
      }
      return NextResponse.json({
        message: "User verified!",
        status: statusCodes.OK,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: statusCodes.BAD_REQUEST });
  }
}
