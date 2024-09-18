import createUser from "@/app/models/createUser";
import {
  handleCryptoEncodeValue,
  handleCryptoVerifyValue,
} from "@/lib/handlers/handleCrypto";
import connectDB from "@/lib/mongodb";
import { postRequest } from "@/lib/types";
import { toastMessages, statusCodes } from "@/lib/enums";
import { NextResponse } from "next/server";

export async function POST(req: postRequest) {
  try {
    var userData = await req.json();
    await connectDB();
    const findUser = await createUser.findOne({
      email: userData.email,
    });
    if (!findUser) {
      throw new Error(toastMessages.USER_NOT_FOUND);
    } else if (handleCryptoVerifyValue(findUser.password, userData.password)) {
      throw new Error(toastMessages.PASSWORD_INCORRECT);
    }

    userData = {
      _id: findUser._id,
      image: findUser.image,
      username: findUser.username,
      email: findUser.email,
      password: findUser.password,
    };
    const encodedUser = handleCryptoEncodeValue(userData);
    return NextResponse.json({
      message: `Welcome back ${userData.username}!`,
      encodedUser: encodedUser,
      status: statusCodes.CREATED,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: statusCodes.BAD_REQUEST });
  }
}

export async function GET() {
  try {
    await connectDB();
    const users = await createUser.find();
    return NextResponse.json({
      users,
      status: statusCodes.OK,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: statusCodes.BAD_REQUEST });
  }
}
