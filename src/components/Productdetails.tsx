import { deleteproduct } from "../services/ProductService";
import { Product } from "../types";
import { formatcurrency } from "../utils";
import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom";

type producto = {
    producto : Product
}

export async function action({params} : ActionFunctionArgs) {

    if(!params.id){
        return redirect('/')
    }
    
    deleteproduct(+params.id)

    return redirect('/')
}

export default function Productdetails({producto} : producto) {

    //ojo con use fetcher

    const fetcher = useFetcher()

    const navigate = useNavigate()

    const isavailable = producto.availability

  return (
        <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {producto.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatcurrency(producto.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method="POST">
                <button
                    type="submit"
                    name="id"
                    value={producto.id}
                    className={`${isavailable ? 'text-black' : ' text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                >{isavailable ? 'Disponible' : 'No Disponible'}</button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className=" flex gap-2 items-center">
                <button 
                    onClick={() => navigate(`productos/${producto.id}/editar`)}
                    className=" bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                >Editar</button>

                <Form 
                    className=" w-full"
                    method="POST"
                    action={`productos/${producto.id}/eliminar`}
                    onSubmit={(e) => {
                        if(!confirm('Eliminar?')){
                            e.preventDefault()
                        }
                    }}
                >
                    <input className=" bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer" type="submit" value='Eliminar' />
                </Form>
            </div>
        </td>
    </tr> 
  )
}
