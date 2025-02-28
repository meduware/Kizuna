"use client"
import { toast } from "@/components/ui/use-toast";
import { formValues } from "@/lib/types";
import { statusCodes, toastMessages } from "@/lib/enums";
import axios from "axios";

export default async function handleAuth(api: string, formValues: formValues) {
  try {
    if (!api) {
      throw new Error(toastMessages.MISSING_API)
    }
    const checkUser = await axios.post(api, formValues)
    if (checkUser.data.status === statusCodes.BAD_REQUEST) {
      throw new Error(checkUser.data.error)
    } else {
      toast({ description: checkUser.data.message, variant: "success", duration: 2000 })
      return ({ data: checkUser.data, status: checkUser.data.status })
    }
  } catch (error) {
    toast({ description: String(error), variant: "destructive", duration: 2000 })
    return ({ error: String(error), status: statusCodes.BAD_REQUEST })
  }
}

