import { createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, {Load as loadproductos, action as availabilityupdateaction} from './pages/Products'
import Newproduct, {action as newproductaction} from './pages/Newproduct'
import EditProduct, {loader as loadEditProduct, action as editProductAction} from './pages/EditProduct'
import { action as deleteproductaction } from './components/Productdetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: loadproductos,
                action: availabilityupdateaction
            },
            {
                path: 'productos/nuevo',
                element: <Newproduct/>,
                action: newproductaction
            },
            {
                path: 'productos/:id/editar', //roa pattern resource oriented design
                element: <EditProduct/>,
                loader: loadEditProduct,
                action: editProductAction
            },
            {
                path: 'productos/:id/eliminar',
                action: deleteproductaction
            }
        ]
    }
])