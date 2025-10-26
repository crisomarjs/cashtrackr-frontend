import { cookies } from "next/headers";

export async function getToken() {
    const token = (await cookies()).get('CASHTRACKR_TOKEN')?.value
    return token
}