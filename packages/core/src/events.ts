import { z } from "zod";

export const eventSchemas = {
  "App Started": z.object({
    reason: z.enum(["cold", "warm", "hot"]).optional(),
  }),
  "Page Viewed": z.object({
    path: z.string().optional(),
    title: z.string().optional(),
    referrer: z.string().optional(),
  }),
  "User Logged In": z.object({
    method: z.enum(["email", "oauth", "sso", "magic_link", "otp"]).optional(),
  }),
  "User Signed Up": z.object({
    method: z.enum(["email", "oauth", "sso", "magic_link", "otp"]).optional(),
  }),
  "Product Viewed": z.object({
    productId: z.string(),
    name: z.string().optional(),
    price: z.number().nonnegative().optional(),
    currency: z.string().length(3).optional(), // ISO-4217
  }),
  "Product Added": z.object({
    productId: z.string(),
    name: z.string().optional(),
    quantity: z.number().int().positive().default(1),
    price: z.number().nonnegative().optional(),
    currency: z.string().length(3).optional(),
  }),
  "Checkout Started": z.object({
    cartValue: z.number().nonnegative(),
    currency: z.string().length(3),
    items: z.array(z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().nonnegative().optional(),
      name: z.string().optional(),
    })).min(1),
  }),
  "Purchase Completed": z.object({
    orderId: z.string(),
    value: z.number().nonnegative(),
    currency: z.string().length(3),
    items: z.array(z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().nonnegative().optional(),
      name: z.string().optional(),
    })).min(1),
  }),
} as const satisfies Record<string, z.ZodTypeAny>;

export type EventName = keyof typeof eventSchemas;
export type PropsOf<E extends EventName> = z.infer<(typeof eventSchemas)[E]>;

export function defineEvents<S extends Record<string, z.ZodTypeAny>>(schemas: S) {
  return schemas;
}
