
import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import Errormessage from "../components/Errormessage";
import {editProduct, getproductbyID } from "../services/ProductService";

import type { Product } from "../types";

export async function loader({params} : LoaderFunctionArgs) {
    
    if(params.id === undefined){
        return {}
    }

    const product = getproductbyID(+params.id)

    if(!product){
        //throw new Response('', {status: 404, statusText: 'No encontrado'})
        return redirect('/')
    }
    return product
}

export async function action({request, params}: ActionFunctionArgs) {

    const data = Object.fromEntries(await request.formData())

    
    let error = '';


    if(Object.values(data).includes('')){
        error = 'todos los campos son obligatorios'
    }
    if(error.length>0){
        return error
    }
    if(params.id === undefined){
        return redirect('/')
    }

    await editProduct(+params.id,data)

    return redirect('/')
}



export default function Editproduct() {
    
    const availabilityOptions = [
        { name: 'Disponible', value: true},
        { name: 'No Disponible', value: false}
     ]

    const product =  useLoaderData() as Product

    const error = useActionData() as string

  return (
    <>
        <div className=" flex justify-between">
            <h2 className=" text-4xl font-black text-slate-500">Editar Producto</h2>
            <Link 
                to="/"
                className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-800"
            >
                Lista de Productos
            </Link>
        </div>
        {error && (
            <Errormessage>{error}</Errormessage>
        )}
        
        <Form
            className="mt-10"   
            method="POST" 
        >
        
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input 
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="name"
                    defaultValue={product.name}
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >Precio:</label>
                <input 
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                    defaultValue={product.price}
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="availability"
                >Disponibilidad:</label>
                <select 
                    id="availability"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="availability"
                    defaultValue={product?.availability.toString()}
                >
                    {availabilityOptions.map(option => (
                    <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                </select>
            </div>
            <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Editar Producto"
            />
        </Form>
    </>
  )
}
