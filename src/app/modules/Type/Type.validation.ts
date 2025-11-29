import { z } from "zod";


export const typeValidationSchema = z.object({
    name: z
        .string({
            invalid_type_error: "name must be string",
            required_error: "name is required",
        })
        .min(1, "name is required")
        .trim()
        .regex(/^[^0-9]*$/, {
            message: "name cannot contain numbers",
        })
        .regex(/^[^~!@#$%\^*\+\?><=;:"]*$/, {
            message: 'name cannot contain special characters: ~ ! @ # $ % ^ * + ? > < = ; : "',
        }),
    description: z
        .string({
            invalid_type_error: "description must be string",
        })
        .trim()
        .optional(),
    image: z
        .string({
            invalid_type_error: "image must be string",
        })
        .trim()
        .optional(),
});

export const updateTypeValidationSchema = z.object({
    name: z
        .string({
            invalid_type_error: "name must be string",
            required_error: "name is required",
        })
        .min(1, "name is required")
        .trim()
        .regex(/^[^0-9]*$/, {
            message: "name cannot contain numbers",
        })
        .regex(/^[^~!@#$%\^*\+\?><=;:"]*$/, {
            message: 'name cannot contain special characters: ~ ! @ # $ % ^ * + ? > < = ; : "',
        })
        .optional(),
    description: z
        .string({
            invalid_type_error: "description must be string",
        })
        .trim()
        .optional(),
    image: z
        .string({
            invalid_type_error: "image must be string",
        })
        .trim()
        .optional(),
});