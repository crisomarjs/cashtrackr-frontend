import { z } from "zod"

export const RegisterSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es obligatorio' })
        .email({ message: 'Email no válido' }),
    name: z.string()
        .min(1, { message: 'Tu nombre no puede ir vacio ' }),
    password: z.string()
        .min(8, { message: 'El password es muy corto, mínimo 8 caracteres' }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Los passwords no son iguales',
    path: ['password_confirmation']
})


export const SuccessShcema = z.string()
export const ErrorResponseShcema = z.object({
    error: z.string()
})

export const TokenSchema = z.string({ message: 'Token no válido' })
    .length(6, { message: 'Token no válido' })

export const ForgotPasswordSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
})

export const ResetPasswordSchema = z.object({
        password: z.string()
                .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
        password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
        message: "Los Passwords no son iguales",
        path: ["password_confirmation"]
});

export const LoginSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
    password: z.string()
        .min(1, { message: 'El Password no puede ir vacio' })
})

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

export type User = z.infer<typeof UserSchema>