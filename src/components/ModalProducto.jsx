import React from 'react'
import { useState, useEffect } from 'react'
import useQuiosco from '../hooks/useQuiosco'
import { formatearDinero } from '../helpers'

export default function ModalProducto() {

    const { producto, handleClicModal, handleAgregarPedido, pedido } = useQuiosco()
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion]=useState(false)

    useEffect(() => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const productoEdicion = pedido.filter(pedidoState => pedidoState.id === producto.id)[0]
            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        }
    }, [pedido])
    return (
        <div className='md:flex  gap-10 '>
            <img src={producto.imagen}
                alt={`Imagen Producto ${producto.nombre}`} />


            <div className='md:w-2/3'>
                <div className='flex justify-end'>
                    <button
                        onClick={handleClicModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>
                <h1 className='text-3xl font-bold mt-5'>{producto.nombre}</h1>
                <p className='mt-5 font-black text-5xl text-amber-500'>{formatearDinero(producto.precio)}</p>

                <div className='flex gap-4 mt-5'>
                    <button
                        type='button'
                        onClick={() => {
                            if (cantidad <= 1) return
                            setCantidad(cantidad - 1)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6" />
                        </svg>

                    </button>
                    <p className='text-3xl'>{cantidad}</p>
                    <button
                        type='button'
                        onClick={() => {
                            if (cantidad >= 5) return
                            setCantidad(cantidad + 1)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>
                </div>
                <button className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-2 text-white
                font-bold uppercase roundes'

                    onClick={() => {
                        handleAgregarPedido({ ...producto}, cantidad )
                        handleClicModal()
                    }}>{edicion ? 'Guardar Cambios' : 'Agregar aL Pedido'}</button>
            </div>
        </div>
    )
}
