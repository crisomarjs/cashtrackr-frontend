"use server"

import { getToken } from "@/src/auth/token"
import { Budget, ErrorResponseShcema, PasswordValidationSchema, SuccessShcema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function deleteBudget(budgetId: Budget['id'], prevState: ActionStateType, formData: FormData) {

    const currentPassword = PasswordValidationSchema.safeParse(formData.get('password'))

    if (!currentPassword.success) {
        return {
            errors: currentPassword.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    //comprobar password
    const token = await getToken()
    const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`
    const checkPasswordReq = await fetch(checkPasswordUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            password: currentPassword.data
        })
    })

    const checkPasswordJson = await checkPasswordReq.json()

    if (!checkPasswordReq.ok) {
        const { error } = ErrorResponseShcema.parse(checkPasswordJson)
        return {
            errors: [error],
            success: ''
        }
    }

    //eliminar presupuesto
    const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
    const deleteBudgetReq = await fetch(deleteBudgetUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const deleteBudgetJson = await deleteBudgetReq.json()

    if (!deleteBudgetReq.ok) {
        const { error } = ErrorResponseShcema.parse(deleteBudgetJson)
        return {
            errors: [error],
            success: ''
        }
    }
    
    const success = SuccessShcema.parse(deleteBudgetJson)
    return {
        errors: [],
        success
    }

}