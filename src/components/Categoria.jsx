

import useQuiosco from "../hooks/useQuiosco"
export default function Categoria({categoria}) {
   
    const { handleClickCategoria ,categoriaActual}= useQuiosco() 
    const {icono, id, nombre}= categoria
    const resaltarCategoriaActual = () => (categoriaActual.id === id ? 'bg-amber-400' : 'bg-white');
  return (
    <button
      type="button"
      className={`${resaltarCategoriaActual()} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 text-lg font-bold cursor-pointer`}
      onClick={() => handleClickCategoria(id)}
    >
      <img src={icono} alt="imagen icono" className="w-12" />
      <p className="truncate">{nombre}</p>
    </button>
  )
}






