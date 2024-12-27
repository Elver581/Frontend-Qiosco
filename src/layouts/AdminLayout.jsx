
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import Ordenes from '../views/Ordenes'
import { useAuth } from '../hooks/useAuth'
export default function AdminLayout() {
    useAuth({middleware:'admin'})
  return (

    <>  
     <div><AdminSidebar/></div>
         
         
        
   </>
  )
}
