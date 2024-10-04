import { Ingredient, Product, ProductItem } from '@prisma/client';

export type ProductWhithRelations = Product & { item: ProductItem[]; ingredients: Ingredient[] };
