import { ProductWidSchema } from "../schemas";
import {InferOutput} from 'valibot'

export type Product = InferOutput<typeof ProductWidSchema>

