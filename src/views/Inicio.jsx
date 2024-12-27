
import Producto from "../components/Producto";
 import useSWR from "swr";
import useQuiosco from '../hooks/useQuiosco.js'
import clienteAxios from "../config/axios.js";

export default function Inicio() {
  //Consulta SWR
  const token = localStorage.getItem('AUTH_TOKEN')
 const { categoriaActual } = useQuiosco()
  const fetcher =()=>clienteAxios('/api/productos',{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then(data=>data.data)
   const { data, error, isLoading } = useSWR("/api/productos", fetcher,{
    refreshInterval:1000
   })

  if (isLoading)return 'Cargando...'
  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)
  return (
    <>
      <h1 className="text-4xl font-bold">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">Elige y personaliza tu pedido a continuacion</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {productos.map(producto => (
          <Producto
            key={producto.imagen}
            producto={producto}
            botonAgregar={true}
             />
        ))}
      </div>
    </>
  )
}
