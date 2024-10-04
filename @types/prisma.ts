import { Ingredient, Product, ProductItem } from '@prisma/client';

export type ProductWhithRelations = Product & { items: ProductItem[]; ingredients: Ingredient[] };
