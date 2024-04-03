import { forwardRef, useContext, useEffect, useState, useRef, memo } from "react";
import { useForm } from "react-hook-form"
import AutenticacionContext from "../../Hooks/AutenticacionContext";
import { useProcessCycle } from "../../Hooks/ProcesoCycleHook";
import PaginationUI from "../Paginacion";

import { createPortal } from 'react-dom';

import { redirect, useNavigate, useParams } from "react-router-dom";

import { Offcanvas } from 'bootstrap';

function ProcesosCiloUI() {

  const { token }  = useContext(AutenticacionContext);

  const { getList } = useProcessCycle(token);

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
                            <th>Nombres</th>
                            <th>Fecha Valido Hasta</th>
                            <th>Fecha de registro</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { items.map((item,i)=>
                        <tr key={item.ids}>
                          <td>{item.titulo}</td>
                          <td>{item.fechaValidoHasta}</td>
                          <td>{item.fechaRegistro}</td>
                          <td>
                            <button className="btn btn-primary" onClick={()=>{ navigate(`/proceso/ciclo/${item.id}`) }}>Vista</button>
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

const ProcesoCicloViewUI = ()=>{
              

    const { token }  = useContext(AutenticacionContext);

    const { getById, getListRepositorios, addCicloRepositorioFile } = useProcessCycle(token);

    const [ procesoCiclo, setProcesoCiclo ] = useState(null);
    

    const navigate = useNavigate();

    const onClickAtras = ()=>{
        navigate(`/proceso/ciclo`) 
    }

    const { id } = useParams(); 

    const offCanvasRef = useRef("cambasRef");

    const RefOffCanvasFileUI = memo((props, ref) => {
        return <OffCanvasFileUI {...props} ref={ref}/>;
      });

    

    useEffect(()=>{
        getById(id)
        .then(c=>{
            setProcesoCiclo(c.data);
        });
        getListRepositorios(id)
        .then(c=>{
            console.log(c.data)

        });
    },[]);

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <button className="btn" onClick={onClickAtras}>Atras</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    { procesoCiclo != null && procesoCiclo.titulo }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Repositorio
                </div>
                <div className="row">
                    <TablaUI id={id} getListRepositorios={getListRepositorios} addCicloRepositorioFile={addCicloRepositorioFile} />
                </div>
            </div>
        </div>
        
        </>
    );
}

const TablaUI = ({id, getListRepositorios, addCicloRepositorioFile}) =>{

    const [ repositorios, setRepositorios ] = useState([]);
    const [ refresh, setRefresh ] = useState(true);
    const [  itemSeleccionado , setItemSeleccionado ] = useState({ ciclo: id});    

    const setParam = (noParam,repositorioId) => { 
        setItemSeleccionado((prevState, props)=> ({...prevState, repositorio: repositorioId}));
    }

    const offCanvasRef = useRef("cambasRef");   

    useEffect(()=>{        
        getListRepositorios(id)
        .then(c=>{            
            setRepositorios(c.data);
        });
    },[refresh]);

    const fnUploadFile = (data)=>{
        addCicloRepositorioFile(itemSeleccionado.ciclo,itemSeleccionado.repositorio,data)
        .then((response) => {
            if(response.ok){
                setRefresh(!refresh)
            }
        })
    }

    return (
        <>
        <div className="row">                            
            <div className="row">
              <PaginationUI numPages={10} currentPage={1}/>
            </div>
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Codigo - Titulo</th>
                            <th>Fecha Vencimiemnto</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { repositorios.map((item,i)=>
                        <tr key={item.titulo}>
                            <td></td>
                            <td>{item.codigo} - {item.titulo}</td>
                            <td><BtnFechaVencimientoUI data={item.data} /></td>
                            <td><BtnComponent repositorio={item} setParam={setParam} /></td>
                        </tr>) 
                        }
                    </tbody>
                </table>
            </div>
            <div className="row">
                <PaginationUI numPages={10} currentPage={1}/>
            </div>
        </div>
        <OffCanvasFileUI addCicloRepositorioFile={fnUploadFile} />
        </>
    );
}

const BtnComponent = ({repositorio, setParam})=>{
    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            <BtnExclamationUI repositorio={repositorio}/>
            <BtnUploadFIleUI repositorio={repositorio} setParam={setParam}/>
            <BtnDownloadFIleUI data={repositorio.data}/>
        </div>
    );
}

const BtnExclamationUI = ({repositorio})=>{
    return (
        (repositorio.esObligatio && repositorio.data === null) && 
    <button className="btn btn-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
        </svg>
    </button>
);
}

const BtnAlertUI = ()=>{
    return (<button type="button" className="btn btn-primary">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-download-fill" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 0 1 1 0V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.354 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V11h-1v3.293l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
    </svg>
    </button>);
}

const BtnDownloadFIleUI = ({data})=>{
    return (data != null && <button type="button" className="btn btn-success" 
        onClick={()=>{ 
            console.log(data);
        }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-download-fill" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 0 1 1 0V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.354 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V11h-1v3.293l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
    </svg>
    </button>);
}

const BtnUploadFIleUI = ({repositorio, setParam, offCanvasRef})=>{
    
    return (repositorio.data == null && 
    <button type="button" className="btn btn-warning" 
    onClick={()=>{ 
        setParam(repositorio.id,repositorio.repositorioTituloId)
        var myOffcanvas = document.getElementById('offcanvasExample')
        var bsOffcanvas = new Offcanvas(myOffcanvas)
        bsOffcanvas.toggle();
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
            <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"/>
        </svg>
    </button>);
}

const BtnFechaVencimientoUI = ({data})=>{
    return (data !== null && data.fechaVencimiento !== null && <button type="button" className="btn btn-primary">
        {data.fechaVencimiento}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-range-fill" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5M10 7a1 1 0 0 0 0 2h5V7zm-4 4a1 1 0 0 0-1-1H1v2h4a1 1 0 0 0 1-1"/>
</svg>
    </button>);
}

const OffCanvasFileUI = ({tieneFechaVencimiento=true,ref, addCicloRepositorioFile})=>{

    const { register, handleSubmit, unregister } = useForm()
    const onSubmit = (data) => addCicloRepositorioFile(data)
    
    useEffect(()=>{
        if(!tieneFechaVencimiento){
            unregister('fechaVencimiento')
        }
    },[])

    return (
    <>
    <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Adjuntar Archivo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label for="formFile" className="form-label">Default file input example</label>
                        <input {...register("formFile",{
                            required:true
                        })} className="form-control" type="file" id="formFile" accept=".pdf"/>
                    </div>
                    {tieneFechaVencimiento && <div className="mb-3">
                        <label for="formFechaVencimiento" className="form-label">Fecha Vencimiento</label>
                        <input {...register("fechaVencimiento",{
                            required:false,
                            valueAsDate: false
                        })} type="date" className="form-control" id="formFechaVencimiento"/>
                    </div>}
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</>)
}


export { ProcesosCiloUI, ProcesoCicloViewUI }