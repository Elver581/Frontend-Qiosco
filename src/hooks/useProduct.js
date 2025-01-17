import { data } from "autoprefixer";
import clienteAxios from "../config/axios"
import { Await } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";

export const useProduct=()=>{
    

  //ACTUALIZAR FUNCION PARA AGREGAGAR USWR
  
    const registroProducto = async (formData, setErrores)=>{
        try {
            const  respuesta  = await clienteAxios.post('/api/productos', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
              },
            });
            setErrores({});
            console.log('Respuesta Exitosa',respuesta )
            toast(respuesta.data.message)
          } catch (error) {
            if(error.response.data.errors){
              const erroresPorCampo ={}
              Object.keys(error.response.data.errors).forEach((campo)=>{
                erroresPorCampo[campo]=error.response.data.errors[campo][0]
              })
              setErrores(erroresPorCampo)
              console.log('Errores', erroresPorCampo)
            }
    
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

        setErrores({})

        toast(respuesta.data.message)
        
      } catch (error) {
        if( error.response && error.response.data.errors){
          const erroresPorCampo ={}
          Object.keys(error.response.data.errors).forEach((campo)=>{
            erroresPorCampo[campo]=error.response.data.errors[campo][0]
          })
          setErrores(erroresPorCampo)
          console.log('Errores', erroresPorCampo)
        }
      
      }
    }


    return{
    registroProducto,
    registroCategoria
    }
}