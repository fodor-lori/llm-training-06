import { z } from 'zod/v4';

export const productSchema = z.object({
	name: z.string(),
	description: z.string(),
	price: z.number()
});
