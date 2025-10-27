"use server"

import { getToken } from "@/src/auth/token"
import { Budget, DraftExpenseShcema, ErrorResponseShcema, Expense, SuccessShcema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type BudgetAndExpenseId = {
    budgetId: Budget['id'],
    expenseId: Expense['id']
}

type ActionStateType = {
    errors: string[]
    success: string
}


export default async function editExpense(
    { budgetId, expenseId }: BudgetAndExpenseId,
    prevState: ActionStateType,
    formData: FormData) {

    const expense = DraftExpenseShcema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })

    if (!expense.success) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    //actualizar gasto
    const token = await getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method: 'PUT',
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