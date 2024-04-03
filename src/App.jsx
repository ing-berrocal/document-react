import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRoutes } from 'react-router-dom'
import HomeUI from './Pages/Home'
import LoginUI from './Pages/Login'
import TerceroUI from './Pages/Tercero'
import UserUI from './Pages/User'
import NotFoundUI from './Pages/NotFound'
import ProcesosUI, { ProcesoFormUI, ProcesoViewUI, ProcesoCycleFormUI } from './Pages/Proceso'
import { ProcesosCiloUI, ProcesoCicloViewUI } from './Pages/ProcesoCycle'

import { NavBarUI } from './Pages/NavBar'
import {
  BrowserRouter,
  createBrowserRouter,
  createHashRouter,
  HashRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { useLogin } from './Hooks/Usuario'
import AutenticacionContext from './Hooks/AutenticacionContext'
import { RepositoriosUI, RepositorioFormUI } from './Pages/Repositorio'

const URL = 'http://localhost:8020';

function App() {
  //<!--<NavBarUI/>-->  

  const [seta, setA] = useState();
  
  const tokenInfo = useLogin(URL);

  let routes = createBrowserRouter([
    {
      path : '/', 
      element: <HomeUI/>,
      children:[
        {
          path : '/', element: <>Hola Mundo!!</>
        },
        {
          path : '/proceso/plantilla', element: <ProcesosUI/>
        },
        {
          path : '/proceso/form', element: <ProcesoFormUI/>
        },
        {
          path : '/proceso/:id', element: <ProcesoViewUI/>
        },
        {
          path : '/proceso/:id/ciclo', element: <ProcesoCycleFormUI/>
        },
        {
          path : '/proceso/ciclo', element: <ProcesosCiloUI/>
        },
        {
          path : '/proceso/ciclo/:id', element: <ProcesoCicloViewUI/>
        },
        {
          path : '/repo/plantilla', element: <RepositoriosUI/>
        },
        {
          path : '/repo/plantilla/form', element: <RepositorioFormUI/>
        },
        {
          path : '/tercero', element: <TerceroUI/>
        },
        {
          path : '/user', element: <UserUI/>
        },
        {
          path : '/*', element: <NotFoundUI/>
        }    
      ]
    },
    {
      path : '/login', element: <LoginUI/>
    },
    {
      path : '/tercero', element: <TerceroUI/>
    },
    {
      path : '/user', element: <UserUI/>
    },
    {
      path : '/*', element: <NotFoundUI/>
    }
  ]);
  /*<BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>*/

  return (
    <>    
    <AutenticacionContext.Provider value={tokenInfo }>
      <RouterProvider router={routes} />       
    </AutenticacionContext.Provider>    
    </>
  )
}

export default App
