import { Route,  Routes } from "react-router-dom"
import Layout from "../layouts/Layout"
import AuthLayout from "../layouts/AuthLayout"
import Registro from "../views/Registro"
import Login from "../views/Login"
import AdminLayout from "../layouts/AdminLayout"
import Ordenes from "../views/Ordenes"
import Productos from "../views/Productos"
import RegisterProductos from "../views/RegisterProductos"




export const Rutas= ()=> {
  return (

      <Routes>
        {/* Rutas envueltas en AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="auth/registro" element={<Registro/>}/>
         
          {/* Agrega aquí más rutas que usarán AuthLayout */}
        </Route>

        {/* Otras rutas sin AuthLayout pueden ir aquí */}
        <Route path="/inicio" element={<Layout/>}/>

        <Route path="/admin" element={<AdminLayout/>}>
             <Route path="/admin/ordenes" element={<Ordenes/>}/>
             <Route path="/admin/productos" element={<Productos/>}/>
             <Route path="/admin/register" element={<RegisterProductos/>}/>

        </Route>
        
      </Routes>

  )
}
