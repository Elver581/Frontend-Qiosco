
      
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Producto from "../components/Producto";
import { useState } from "react";

export default function Productos() {
  const token = localStorage.getItem("AUTH_TOKEN");
  const [currentPage, setCurrentPage] = useState(1);

  const fetcher = (url) =>
    clienteAxios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((datos) => datos.data);

  const { data, error, isLoading } = useSWR(
    `/api/productos?page=${currentPage}`,
    fetcher,{
      refreshInterval:1000
    }
  );

  if (isLoading) return "Cargando...";
  if (error) return "Ocurrió un error al cargar los datos.";

  const totalRecords = data?.total || 0;
  const totalPages = data?.last_page || 1;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Función para mostrar un rango de páginas
  const getPageNumbers = () => {
    const range = [];
    const maxPagesToShow = 5; // Número máximo de páginas visibles
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(start + maxPagesToShow - 1, totalPages);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Productos</h1>
      <p className="text-2xl my-10">Maneja la disponibilidad aquí</p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {data.data.map((producto) => (
          <Producto
            key={producto.id}
            producto={producto}
            botonDisponible={true}
          />
        ))}

        {/* Paginación dentro del mismo contenedor */}
        <div className="pagination flex justify-center items-center col-span-full gap-2 mt-5">
          {/* Botón Anterior */}
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-400"
          >
            Anterior
          </button>

          {/* Números de Página */}
          {getPageNumbers().map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Botón Siguiente */}
          <button
            type="button"
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-400"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Información de Registros */}
      <div className="mt-5 text-center text-gray-700">
        <p>
          Mostrando{" "}
          <strong>
            {(currentPage - 1) * data.per_page + 1} a{" "}
            {Math.min(currentPage * data.per_page, totalRecords)}
          </strong>{" "}
          de <strong>{totalRecords}</strong> productos.
        </p>
      </div>
    </div>
  );
}
