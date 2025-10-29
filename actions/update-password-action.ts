"use server"

import { getToken } from "@/src/auth/token"
import { ErrorResponseShcema, SuccessShcema, UpdatePasswordSchema } from "@/src/schemas"


type ActionStateType = {
    errors: string[]
    success: string
}

export default async function updatePassword(prevState: ActionStateType, formData: FormData) {

    const userPassword = UpdatePasswordSchema.safeParse({
        current_password: formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    })

    if (!userPassword.success) {
        return {
            errors: userPassword.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    //actualizar gasto
    const token = await getToken()
    const url = `${process.env.API_URL}/auth/update-password`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            current_password: userPassword.data.current_password,
            password: userPassword.data.password
        })
    })

    const json = await req.json()

    if (!req.ok) {
        const { error } = ErrorResponseShcema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessShcema.parse(json)

    return {
        errors: [],
        success
    }
}