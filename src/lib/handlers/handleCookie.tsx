"use server"
import axios from "axios"
import { cookies } from "next/headers"
import { statusCodes, toastMessages } from "@/lib/enums";

export async function handleCookieAuthVerify() {
  try {
    var cookie = cookies().get("jwtToken")
    if (cookie === undefined) {
      throw new Error(toastMessages.NO_COOKIE)
    }
    const res = await axios.post(process.env.VERIFY_API!, { jwtToken: cookie.value })
    if (res.data.status === statusCodes.BAD_REQUEST) {
      throw new Error(res.data.error)
    }
    return ({ message: res.data.message, status: res.data.status })
  } catch (error) {
    return ({ error: String(error), status: statusCodes.BAD_REQUEST })
  }
}
