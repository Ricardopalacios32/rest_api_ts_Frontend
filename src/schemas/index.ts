import { object, string, number, boolean, array } from "valibot"

export const ProductSchema = object({
    name: string(),
    price: number()
})

export const ProductWidSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const arrayProductsSchema = array(ProductWidSchema)
