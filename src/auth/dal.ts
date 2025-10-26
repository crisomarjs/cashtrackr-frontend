//DAL : Data Access Layer
import "server-only"
import { cache } from "react"
import { redirect } from "next/navigation"
import { UserSchema } from "../schemas"
import {getToken} from "./token"

export const vaerifySession = cache( async () => {

    const token = await getToken()
    if (!token) {
        redirect('/auth/login')
    }

    //verificar token usuario
    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const sesion = await req.json()
    const result = UserSchema.safeParse(sesion)

    if (!result) {
        redirect('/auth/login')
    }

    return {
        user: result.data,
        isAuth: true
    }
})
