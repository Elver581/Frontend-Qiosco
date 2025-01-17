import React, { createRef, useEffect, useState } from 'react';
import RegisterCategoria from '../components/RegisterCategoria';
import Alerta from '../components/Alerta';
import { useProduct } from '../hooks/useProduct';
import useQuiosco from '../hooks/useQuiosco';

export default function RegisterProductos() {
  const { categorias} = useQuiosco();
  const { registroProducto } = useProduct(); // Función para registrar producto

  const nombreRef = createRef();
  const precioRef = createRef();
  const imagenRef = createRef();
  const categoriaRef = createRef();
  
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre: nombreRef.current.value,
      precio: precioRef.current.value,
      imagen: imagenRef.current.files[0],
      categoria_id: categoriaRef.current.value,
    };
    console.log('Datos enviados:', formData); 
      
    registroProducto (formData,setErrores)
    nombreRef.current.value="",
    precioRef.current.value="",
    imagenRef.current.value=null,
    categoriaRef.current.value=""
    
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div>
          <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form onSubmit={handleSubmit} noValidate>
              {/* Mostrar errores */}
 

              {/* Nombre del producto */}
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="nombre">
                  Nombre del Producto:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  ref={nombreRef}
                  placeholder="Nombre del producto"
                  className="mt-2 w-full p-3 bg-gray-50 rounded"
                />
                {errores.nombre && <small className="text-red-500">{errores.nombre}</small>}
              </div>

              {/* Precio del producto */}
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="precio">
                  Precio:
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  ref={precioRef}
                  placeholder="Precio del producto"
                  className="mt-2 w-full p-3 bg-gray-50 rounded"
                />
                {errores.precio && <small className="text-red-500">{errores.precio}</small>}
              </div>

              {/* Imagen del producto */}
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="imagen">
                  Imagen del Producto:
                </label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  ref={imagenRef}
                  accept="image/*"
                  className="mt-2 w-full p-3 bg-gray-50 rounded"
                />
                {errores.imagen && <small className="text-red-500">{errores.imagen}</small>}
              </div>

              {/* Selección de categoría */}
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="categoria_id">
                  Categoría:
                </label>
                <select
                  id="categoria_id"
                  name="categoria_id"
                  ref={categoriaRef}
                  className="mt-2 w-full p-3 bg-gray-50 rounded"
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón de envío */}
              <input
                type="submit"
                value={cargando ? 'Registrando...' : 'Agregar Producto'}
                className={`bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded ${
                  cargando ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={cargando}
              />
            </form>
          </div>
        </div>
        <div>
          <RegisterCategoria />
        </div>
      </div>
    </>
  );
}
