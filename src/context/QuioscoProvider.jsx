import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify"


import clienteAxios from "../config/axios"
import { Await } from "react-router-dom"
import { set } from "react-hook-form"

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState([])
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)


    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])


    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {

            
            const {data} = await clienteAxios('/api/categorias',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            setCategorias(data.data)
            setCategoriaActual(data.data[0])

        }

         catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
       obtenerCategorias()
    },[])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)

    }
    const handleClicModal = () => {
        setModal(!modal)
    }


    const handleSetProducto = producto => {
        setProducto(producto)
    }
    // const handleAgregarPedido =({categoria_id, imagen, ...producto})=>{
    //    setPedido([...pedido, producto])
    // }
    const handleAgregarPedido = ({ categoria_id, ...producto }, cantidad) => {
        setPedido(prevPedido => {
            const productoExistente = prevPedido.find(item => item.id === producto.id);

            if (productoExistente) {
                // Si el producto ya existe, actualizamos la cantidad con la nueva cantidad seleccionada
                return prevPedido.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad } // Asignar la cantidad seleccionada
                        : item,
                    toast.success('Actualizado Correctamente')
                );
            } else {
                // Si el producto no existe en el pedido, agregarlo con la cantidad seleccionada

                toast.success('Agregado al Pedido')
                return [...prevPedido, { ...producto, cantidad }];

            }
        });
    };

    const handleEditarCantidad = id => {
        const ProductoActualizar = pedido.filter(product => producto.id === id)[0]
        setProducto(ProductoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado el Pedido')
    }

    const handleSubmitNuevaOrden = async(logout)=>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
           const {data}= await clienteAxios.post('/api/pedidos',
            {
             total,
             productos: pedido.map(producto=>{
                return{
                    id: producto.id,
                    cantidad: producto.cantidad
                }
             })

            },
        { 
             headers:{
                    Authorization: `Bearer ${token}`
               }

        })
        toast.success(data.message)
        setTimeout(()=>{
            setPedido([])
        },1000)

        //Cerrar la Sesion
        setTimeout(()=>{
          localStorage.removeItem('AUTH_TOKEN')
          logout()
        },3000)
        } catch (error) {
         console.log(error)   
         console.log('Token:', token);

        }
    }

    const handleClickCompletarPedido = async id =>{
      const token = localStorage.getItem('AUTH_TOKEN')
      try {
        await clienteAxios.put(`/api/pedidos/${id}`,null,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
      } catch (error) {
        
      }
    }
    const handleClickProductoAgotado = async id =>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
        const response =  await clienteAxios.put(`/api/productos/${id}`,null,{
              headers:{
                  Authorization: `Bearer ${token}`
              }
          })
          console.log('Producto Agotado',response.data.producto)
          const updatedProduct = response.data.producto
          //Actualizar la lista de productos  en el estado
          setProducto((prevProductos)=>{
            if(!Array.isArray(prevProductos)){
                console.log('No es un array',prevProductos)
                return []
            }
            return prevProductos.map(producto=>producto.id === updatedProduct.id ? updatedProduct : producto)
          })
        } catch (error) {
           console.log('Eroor al actualizar el producto:',error)
        }
      }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleClicModal,
                modal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado,
                obtenerCategorias
            }}>
            {children}
        </QuioscoContext.Provider>

    )
}

export {
    QuioscoProvider
}
export default QuioscoContext