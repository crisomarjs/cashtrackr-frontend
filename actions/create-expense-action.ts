"use server"

import { getToken } from "@/src/auth/token"
import { DraftExpenseShcema, ErrorResponseShcema, SuccessShcema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}


export default async function createExpense(budgetId: number, prevState: ActionStateType, formData: FormData) {

    const expenseData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const expense = DraftExpenseShcema.safeParse(expenseData)

    if (!expense.success) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    //generar gasto
    const token = await getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
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
    revalidatePath(`/admin/budget/${budgetId}`)

    return {
        errors: [],
        success
    }

}