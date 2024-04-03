import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import AutenticacionContext from "../../Hooks/AutenticacionContext";
import { useProceso } from "../../Hooks/ProcesoHook";
import PaginationUI from "../Paginacion";

import { redirect, useNavigate, useParams } from "react-router-dom";

function ProcesosUI() {

  const { token }  = useContext(AutenticacionContext);

  const { getList } = useProceso(token);

  const [ items, setItems ] = useState([]);
  const [ pagination, setPagination ] = useState(0);

  const navigate = useNavigate();

  useEffect(()=>{
    
    getList()
    .then(response=>{       
      let nn = response.data.length/10;
      setPagination(nn)  
      setItems(response.data);
    });

  },[]);  

    return (
      <>
        <div className="container-fluid">
            <div className="row">                
            </div>
            <div className="row">
              <PaginationUI numPages={pagination} currentPage={1}/>
            </div>
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombres</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { items.map((item,i)=>
                        <tr key={item.titulo}>
                          <td>{i+1}</td>
                          <td>{item.titulo}</td>
                          <td>
                            <button className="btn btn-primary" onClick={()=>{ navigate(`/proceso/${item.id}`) }}>Vista</button>
                          </td>
                        </tr>) 
                        }
                    </tbody>
                </table>
            </div>
            <div className="row">
                <PaginationUI numPages={pagination} currentPage={1}/>
            </div>
        </div>
      </>
    );
}

function ProcesoFormUI(){

  const { token }  = useContext(AutenticacionContext);

  const { addProceso } = useProceso(token);

  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data)=>{
    addProceso(data)    
    .then(response=>{      
      console.log(j)

      navigate(`/proceso/${response.data.id}`);
    })
  };

  //console.log(watch("example")) // watch input value by passing the name of it    

    return (
        <div className="container-fluid">
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="needs-validation" novalidate>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                Titulo
              </label>
              <input id="titulo" className="form-control"aria-describedby="tituloHelp"
              {...register("titulo",{ required: true,  maxLength: 100 })} required/>          
              {/*<input type="text" className="form-control" id="titulo" aria-describedby="tituloHelp"/>*/}              
              <div id="tituloHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
              {errors.titulo && 
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
              }
            </div>
            <div className="mb-3">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" {...register('asignaTercero')}/>
                    <label className="form-check-label" for="flexCheckChecked">
                        Asignar a tercero
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary">Agregar</button>
                <button type="button" className="btn btn-primary">Reset</button>
            </div>
            </form>
        </div>        
    );
}
  
function ProcesoViewUI(){

  const { token }  = useContext(AutenticacionContext);

  const { getById, addCycle } = useProceso(token);  

  const { id } = useParams();  

  const navigate = useNavigate();

  const [ process, setProcess ] = useState({});

  const [ pagination, setPagination ] = useState(0);
  
  const addProcessCycle = (processId)=>{
    addCycle(processId,{})
  }

  useEffect(()=>{
    getById(id)
    .then(c=>{
      console.log(c.data);
      setProcess(c.data);
    })
  },[]);

  return (
  <div className="container-fluid">
    <div className="row">
      <div className="col">
        <button className="btn btn-primary" onClick={()=>{ addProcessCycle(id) }}> Agregar Proceso (ciclo)</button>
      </div>
    </div>
    <div className="row">
      { process.titulo }
    </div>
    <div className="row">
      <div className="col-12">
        Repositorio
      </div>
      
    </div>
    <div className="container-fluid">
            <div className="row">                
            </div>
            <div className="row">
              <PaginationUI numPages={pagination} currentPage={1}/>
            </div>
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombres</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { items.map((item,i)=>
                        <tr key={item.titulo}>
                          <td>{i+1}</td>
                          <td>{item.titulo}</td>
                          <td>
                            <button className="btn btn-primary" onClick={()=>{ navigate(`/proceso/${item.id}`) }}>Vista</button>
                          </td>
                        </tr>) 
                        }
                    </tbody>
                </table>
            </div>
            <div className="row">
                <PaginationUI numPages={pagination} currentPage={1}/>
            </div>
        </div>
  </div>);
}

function ProcesoCycleFormUI(){

  const { token }  = useContext(AutenticacionContext);

  const { addCycle } = useProceso(token);

  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data)=>{
    addCycle(data)    
    .then(response=>{      
      console.log(j)

      navigate(`/proceso/${response.data.id}`);
    })
  };

  //console.log(watch("example")) // watch input value by passing the name of it    

    return (
        <div className="container-fluid">
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="needs-validation" novalidate>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                TerceroId
              </label>
              <input id="tercero" className="form-control"aria-describedby="tituloHelp"
              {...register("tercero",{ required: true,  maxLength: 100 })} required/>          
              {/*<input type="text" className="form-control" id="titulo" aria-describedby="tituloHelp"/>*/}              
              <div id="tituloHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
              {errors.titulo && 
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
              }
            </div>
            <div className="mb-3">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" {...register('terceroid')}/>
                    <label className="form-check-label" for="flexCheckChecked">
                        Asignar a tercero
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary">Agregar</button>
                <button type="button" className="btn btn-primary">Reset</button>
            </div>
            </form>
        </div>        
    );
}

  export { ProcesoFormUI , ProcesosUI as default, ProcesoViewUI, ProcesoCycleFormUI };