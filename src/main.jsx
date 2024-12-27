import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
        
import './index.css'
import { Rutas } from './routes/Rutas'
import { QuioscoProvider } from './context/QuioscoProvider'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>


    <BrowserRouter>
    <QuioscoProvider>  
      
       <Rutas/>
       <ToastContainer/>
    </QuioscoProvider>
      

   
    
    </BrowserRouter>

  </StrictMode>
)
