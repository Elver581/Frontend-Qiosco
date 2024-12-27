import { data } from "autoprefixer";
import clienteAxios from "../config/axios"
import { Await } from "react-router-dom";
import { toast } from "react-toastify";

export const useProduct=()=>{
    
    const registroProducto = async (formData, setErrores)=>{
        try {
            const  respuesta  = await clienteAxios.post('/api/productos', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
              },
            });
            setErrores([]);
            console.log('Respuesta Exitosa',respuesta )
            toast(respuesta.data.message)
          } catch (error) {
            setErrores(Object.values(error.response.data.errors)) 
          }
    }



    const registroCategoria = async(formData, setErrores)=>{
      const token = localStorage.getItem('AUTH_TOKEN')

      try {
  
        const respuesta = await clienteAxios.post('/api/categorias',formData,{
          headers:{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer  ${token}`,
          }
        })  
        setErrores([])
        
        console.log('Respuesta Exitosa', respuesta.data)
        toast(respuesta.data.message)
        
      } catch (error) {
        setErrores(Object.values(error.response.data.errors))
        
      }
    }


    return{
    registroProducto,
    registroCategoria
    }
}