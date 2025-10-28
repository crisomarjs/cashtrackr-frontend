"use server"

import { getToken } from "@/src/auth/token"
import { Budget, ErrorResponseShcema, Expense, SuccessShcema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type BudgetAndExpenseId = {
    budgetId: Budget['id'],
    expenseId: Expense['id']
}

type ActionStateType = {
    errors: string[]
    success: string
}

export default async function deleteExpense({ budgetId, expenseId }: BudgetAndExpenseId, prevState: ActionStateType) {

    const token = await getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
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