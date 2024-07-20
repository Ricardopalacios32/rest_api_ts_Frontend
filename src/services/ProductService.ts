
import {safeParse } from "valibot";
import { arrayProductsSchema, ProductSchema, ProductWidSchema } from "../schemas";
import axios from "axios";

import type { Product } from "../types";





type Productdata = {
    [k: string]: FormDataEntryValue
}

export async function addproduct(data: Productdata){

    try {
        const result = safeParse(ProductSchema,{
            name : data.name,
            price : +data.price
        })

        if(result.success){

            const url = `${import.meta.env.VITE_API_URL}/api/productos`
            
            await axios.post(url,{
                name: result.output.name,
                price: result.output.price
            })
            
        }else{
            throw new Error
        }

    } catch (error) {
        console.log(error)
    }
    
}

export async function editProduct(id : Product['id'], data: Productdata) {
    try {

        const availability = data.availability === 'true' ? true : false

        const result = safeParse(ProductWidSchema,{
            id : id,
            name : data.name,
            price : +data.price,
            availability: availability
        })

        if(result.success){

            const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`

            await axios.put(url,{
                name: result.output.name,
                price: result.output.price,
                availability: result.output.availability
            })
            

        }else{
            throw new Error
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getproducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos`
        
        const {data} = await axios.get(url)
        
        const result = safeParse(arrayProductsSchema, data.data)

        if(result.success){
            return data.data
        }
        else{
            throw new Error
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getproductbyID(id : Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
        
        const {data} = await axios.get(url)
        
        const result = safeParse(ProductSchema, data.data)

        if(result.success){
            return data.data
        }
        else{
            throw new Error
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function updateavailability(id : Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/availability/${id}`

        await axios.patch(url)

    } catch (error) {
        console.log(error)
    }
}

export async function deleteproduct(id : Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`

        await axios.delete(url)

    } catch (error) {
        console.log(error)
    }
}