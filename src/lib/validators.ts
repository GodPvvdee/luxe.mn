import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

export const checkoutSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  line1: z.string().min(2),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().optional(),
  zip: z.string().min(3),
  country: z.string().min(2),
  phone: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().max(80).optional(),
  comment: z.string().min(2).max(1000),
});

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  compareAt: z.number().positive().optional(),
  stock: z.number().int().min(0),
  categoryId: z.string(),
  images: z.array(z.string().url()).min(1),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  bestseller: z.boolean().default(false),
  onSale: z.boolean().default(false),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
