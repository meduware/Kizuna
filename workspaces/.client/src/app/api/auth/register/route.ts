import createUser from "@/app/models/createUser";
import { statusCodes, toastMessages } from "@/lib/enums";
import { handleCryptoHashValue } from "@/lib/handlers/handleCrypto";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request | NextRequest) {
  try {
    const userData = await req.json();
    userData.password = handleCryptoHashValue(userData.password).hash;
    await connectDB();
    await createUser.create(userData);
    return NextResponse.json({
      message: toastMessages.USER_CREATED,
      status: statusCodes.CREATED,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: statusCodes.BAD_REQUEST });
  }
}
