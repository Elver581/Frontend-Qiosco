

import useQuiosco from "../hooks/useQuiosco"
export default function Categoria({categoria}) {
   
    const { handleClickCategoria ,categoriaActual}= useQuiosco() 
    const {icono, id, nombre}= categoria
    console.log('http://127.0.0.1:8000/storage/categorias/6h2N1eSsfZHV8NanCYSFIPM0sxRD4ZYE7XWJ4kZV.jpg',icono)
    const resaltarCategoriaActual = () => (categoriaActual.id === id ? 'bg-amber-400' : 'bg-white');
  return (
    <button
      type="button"
      className={`${resaltarCategoriaActual()} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 text-lg font-bold cursor-pointer`}
      onClick={() => handleClickCategoria(id)}
    >
      <img src={icono} alt={nombre} className="w-12" />
      <p className="truncate">{nombre}</p>
    </button>
  )
}






