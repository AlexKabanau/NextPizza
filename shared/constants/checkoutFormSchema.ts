import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, 'Please enter your first name'),
  lastName: z.string().min(2, 'Please enter your last name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(15, 'Please enter a valid phone number'),
  address: z.string().min(2, 'Please enter your address'),
  comment: z.string().optional(),
});

export type CheckoutFormSchemaTypes = z.infer<typeof checkoutFormSchema>;
