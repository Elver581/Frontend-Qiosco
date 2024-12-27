import { useAuth } from '../hooks/useAuth'
import { Link, Outlet } from 'react-router-dom'
import { FaBars, FaClipboardList, FaBox, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
export default function AdminSidebar() {

  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {logout} =useAuth({middleware: 'auth'})
  return (
    <>
    <div className="grid grid-cols-[auto_1fr] h-screen">
      {/* Menú lateral */}
      <aside
        className={`h-screen bg-gray-800 text-white transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {/* Logo */}
          <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
            <img
              src="/public/img/ets.png"
              alt="ETS Logo"
              className={`w-10 h-10 transition-all duration-300 ${!isCollapsed ? 'mr-4' : ''}`}
            />
            {!isCollapsed && <span className="text-xl font-bold">Technology</span>}
          </div>

          {/* Botón de colapsar */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-2xl focus:outline-none ml-auto"
          >
            <FaBars />
          </button>
        </div>

        {/* Menú de navegación */}
        <nav className="mt-4 space-y-4">
          <Link
            to="/admin/ordenes"
            className="flex items-center text-lg font-bold px-4 hover:bg-gray-700 rounded-md"
          >
            <FaClipboardList className="text-xl" />
            {!isCollapsed && <span className="ml-4">Órdenes</span>}
          </Link>
          <Link
            to="/admin/productos"
            className="flex items-center text-lg font-bold px-4 hover:bg-gray-700 rounded-md"
          >
            <FaBox className="text-xl" />
            {!isCollapsed && <span className="ml-4">Productos</span>}
          </Link>
          <Link
            to="/admin/register"
            className="flex items-center text-lg font-bold px-4 hover:bg-gray-700 rounded-md"
          >
            <FaPlus className="text-xl" />
            {!isCollapsed && <span className="ml-4">Agregar Productos</span>}
          </Link>
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="absolute bottom-4 w-full">
          <button
            onClick={logout}
            className="flex items-center text-lg font-bold px-4 py-2  hover:bg-red-700 rounded-md"
          >
            <FaSignOutAlt className="text-xl" />
            {!isCollapsed && <span className="ml-4">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="bg-gray-100 h-screen overflow-y-scroll p-4">
       
       <Outlet/>
      </main>
    </div>
    </>
  )
}
