import { Routes, Route } from "react-router-dom"
import Login from './Componentes/loginRegister/Login';
import Landing from './Componentes/landingPage/landing';
import Register from "./Componentes/loginRegister/Register";
import { AuthProvider } from "./Context/authContext";
import  HomeAdmin from "./Componentes/Admin/HomeAdmin";
import  HomeUser from "./Componentes/Users/HomeUser";
import	{ProtectedRoute} from './Componentes/utils/ProtectedRoute'
import "./App.css"
import NewLibro from "./Componentes/Libros/Newlibro";
import UpdateLibro from "./Componentes/Libros/Updatelibro";
import ChatAdmin from "./Componentes/Chat/chatAdmin";
import ChatUser from "./Componentes/Chat/ChatUser";
import Prestamos from "./Componentes/Libros/Prestamos";

function App() {
  return (
  
      <AuthProvider>
    <div className="App">
      <Routes>
        <Route path="/" element={ <Landing/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="signUp" element={ <Register/> } /> 
        <Route path="HomeAdmin" element={<ProtectedRoute><HomeAdmin/></ProtectedRoute> } />
        <Route path="HomeAdmin/NewLibro" element={<ProtectedRoute><NewLibro/></ProtectedRoute>}/>
        <Route path="HomeAdmin/ChatAdmin" element={<ProtectedRoute><ChatAdmin/></ProtectedRoute>}/>
        <Route path="HomeAdmin/UpdateLibro/:id" element={<ProtectedRoute><UpdateLibro/></ProtectedRoute>}/>
        <Route path="HomeUser" element={<ProtectedRoute><HomeUser/></ProtectedRoute> } />
        <Route path="HomeUser/ChatUser" element={<ProtectedRoute><ChatUser/></ProtectedRoute>}/>
        <Route path="HomeUser/Prestamos" element={<ProtectedRoute><Prestamos/></ProtectedRoute>}/>
        <Route path="*" element={<h1>404: Not Found</h1>} />
    </Routes>
    </div>
    </AuthProvider>
  )
}

export default App
