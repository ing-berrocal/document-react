import { useContext, useState, useEffect } from "react";

import { useRepositorio } from "../../Hooks/RepositorioHook";
import AutenticacionContext from "../../Hooks/AutenticacionContext";
import PaginationUI from "../Paginacion";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form"
import { useProceso } from "../../Hooks/ProcesoHook";


function RepositoriosUI() {

    const { token }  = useContext(AutenticacionContext);

    const { getList } = useRepositorio(token);
  
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
                  <form>
  
                  </form>
              </div>
              <div className="row">
                <div className="col">
                    <PaginationUI numPages={pagination} currentPage={1}/>
                </div>
                <div className="col">
                    <button className="btn" onClick={()=>{ navigate('/repo/plantilla/form') }}>Agregar</button>
                </div>
              </div>
              <div className="row">
                  <table className="table">
                      <thead>
                          <tr>
                              <th></th>
                              <th>Codigo</th>
                              <th>Nombres</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          { items.map((item,i)=>
                          <tr key={item.titulo}>
                            <td>{i+1}</td>
                            <td>{item.codigo}</td>
                            <td>{item.titulo}</td>
                            <td>
                                <button className="btn">Editar</button>
                                <button className="btn">Agregar Objecto</button>
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

function RepositorioFormUI() {

        const { token }  = useContext(AutenticacionContext);
    
        const { addItem } = useRepositorio(token);

        const { getList } = useProceso(token);
      
        const [ procesos, useProcesos ] = useState([]);

        const [ formProcess, useFormProcess ] = useState([]);

        useEffect(()=>{
            getList()
            .then(response=>{             
                useProcesos(response.data);
            });

        },[]);

        const onDeleteProcessSelected = (processId)=>{
            useFormProcess([...formProcess.filter(fp=>fp.id != processId)]);
        }

        const onChange = (e)=>{
            e.eventPrevent
            let process = procesos.find(p=>p.id == e.target.value);
            let fp = formProcess.find(p=>p.id == e.target.value);
            if(fp == undefined){
                //formProcess.push(process)
                useFormProcess([...formProcess,process]);
                console.log(formProcess);  
            }     
        }

        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm()
      
          const navigate = useNavigate();
        
          const onSubmit = (data)=>{
            addItem({...data,procesos: formProcess.map(fp=>fp.id)})    
            .then(response=>{      
              console.log(j)
        
              //navigate(`/proceso/${response.data.id}`);
            })
          };
        
          //console.log(watch("example")) // watch input value by passing the name of it    
        
            return (
                <div className="container-fluid">
                    <form method="POST" onSubmit={handleSubmit(onSubmit)} className="needs-validation" novalidate>
                    <div className="mb-3">
                      <label htmlFor="titulo" className="form-label">
                        Código
                      </label>
                      <input id="codigo" className="form-control"aria-describedby="codigoHelp"
                      {...register("titulo",{ required: true,  maxLength: 10 })} required/>          
                      {/*<input type="text" className="form-control" id="titulo" aria-describedby="tituloHelp"/>*/}                                    
                      {errors.titulo && 
                        <div className="invalid-feedback">
                          Please choose a username.
                        </div>
                      }
                    </div>
                    <div className="mb-3">
                      <label htmlFor="titulo" className="form-label">
                        Titulo|
                      </label>
                      <input id="codigo" className="form-control"aria-describedby="codigoHelp"
                      {...register("codigo",{ required: true,  maxLength: 10 })} required/>          
                      {/*<input type="text" className="form-control" id="titulo" aria-describedby="tituloHelp"/>*/}                                    
                      {errors.titulo && 
                        <div className="invalid-feedback">
                          Please choose a username.
                        </div>
                      }
                    </div>
                    <div className="mb-3">
                      <label htmlFor="descripcion" className="form-label">
                        Descripcion
                      </label>
                      <input id="descripcion" className="form-control"aria-describedby="descripcion"
                      {...register("descripcion",{ required: true,  maxLength: 10 })} required/>          
                      {/*<input type="text" className="form-control" id="titulo" aria-describedby="tituloHelp"/>*/}                                    
                      {errors.titulo && 
                        <div className="invalid-feedback">
                          Please choose a username.
                        </div>
                      }
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="tieneFechaVencimiento" {...register('tieneFechaVencimiento')}/>
                            <label className="form-check-label" for="tieneFechaVencimiento">
                                Asignar a tercero
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col">
                            <select onChange={onChange}>
                                {procesos.map(p=><option key={p.id} value={p.id}>{p.titulo}</option>)}
                            </select>
                        </div>
                        <div className="col">
                            <button className="btn">Agregar proceso</button>
                        </div>
                      </div>
                      <div className="d-flex flex-row mb-3">
                        { formProcess.length == 0 && <div className="badge rounded-pill text-bg-primary">Sin procesos</div>}
                        { formProcess.length > 0 && formProcess.map((fp,i)=>
                        <div className="badge  text-bg-primary p-3" key={fp.titulo}>{fp.titulo} | <button type="button" className="btn-close" aria-label="Close" onClick={()=>onDeleteProcessSelected(fp.id)}></button></div>) }
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

    export { RepositoriosUI, RepositorioFormUI }