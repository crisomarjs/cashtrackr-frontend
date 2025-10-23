"use server"

import { ErrorResponseShcema, ForgotPasswordSchema, SuccessShcema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function forgotPassword(prevState: ActionStateType, formData: FormData ) {
    
    const forgotPassword = ForgotPasswordSchema.safeParse({
        email: formData.get('email')
    })

    if(!forgotPassword.success){
        return{
            errors: forgotPassword.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    
    const url = `${process.env.API_URL}/auth/forgot-password`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: forgotPassword.data.email
        })
    })

    const json = await req.json()

    if(!req.ok){
        const {error} = ErrorResponseShcema.parse(json)
        return{
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