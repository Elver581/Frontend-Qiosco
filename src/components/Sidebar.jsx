
import Categoria from "./Categoria"
import useQuiosco from '../hooks/useQuiosco.js'
import { useAuth } from "../hooks/useAuth.js"

export default function Sidebar() {

  const {categorias}= useQuiosco()
  const{logout,user}= useAuth({middleware: 'auth'})
  

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img 
        src="/public/img/ets.png" alt="Imagen Logo Tipo"
        className="w-40"
         />
      </div>
      <p className="my-10 text-xl text-center">Hola: {user?.name} </p>
      <div className="mt-10">
      {categorias.map(categoria=>(
         <Categoria
         key={categoria.id}
      categoria={categoria}
      />
      ))}

      <div className="my-5 px-5"> 
         <button
         onClick={logout}
         className="text-center bg-red-500 font-bold w-full p-3 text-white truncate"
          type="button">Cancelar Orden</button></div>
     
      </div>
      </aside>
  )
}
