import createUser from "@/app/models/createUser";
import { handleCryptoHashValue } from "@/lib/handlers/handleCrypto";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { postRequest } from "@/lib/types";
import { statusCodes, toastMessages } from "@/lib/enums";

export async function POST(req: postRequest) {
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
