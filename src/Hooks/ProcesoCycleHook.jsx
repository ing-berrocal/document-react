import { useContext, useEffect, useState } from "react"
import AutenticacionContext from "./AutenticacionContext";
import Constants from "./Constants";

const URL = Constants.URL;

const useProcessCycle = (token) =>{
    
    const NUM_P = 10;

    const paginar = (data)=>{
        let numpages = data/NUM_P;
    }

    const getList = (page)=>{
        return fetch(`${URL}/proceso/ciclo`,{
            method: 'GET',
            headers: uneIO(token)            
          }).then((r)=>r.json())          
    }
    

    const addProceso = (data)=>{
        return fetch(`${URL}/proceso`,{
            method: 'POST',
            headers: uneIO(token),
            body: JSON.stringify(data)
          })
        //.then((response) => response.json().then( (data) => { data:data, iop : response.status } ))
        .then(response=>{
            return response.json();
        })
        .catch((e) => {
            console.log(`An error has occured while calling the API. ${e}`);
            reject(e);
        })
        .finally(()=>{
            //alert('Realizado')
        })
    }

    const addCycle = (processId, data) =>{
        return fetch(`${URL}/proceso/ciclo/${processId}`,{
            method: 'POST',
            headers: uneIO(token),
            body: JSON.stringify(data)
          })
        //.then((response) => response.json().then( (data) => { data:data, iop : response.status } ))
        .then(response=>{
            return response.json();
        })
        .catch((e) => {
            console.log(`An error has occured while calling the API. ${e}`);
            reject(e);
        })
        .finally(()=>{
            //alert('Realizado')
        })
    }

    const getById = (Id)=>{
        return fetch(`${URL}/proceso/ciclo/${Id}`,{
            method: 'GET',
            headers: uneIO(token)            
          }).then((r)=>r.json())
    }

    const getListRepositorios = (Id, page)=>{
        return fetch(`${URL}/proceso/ciclo/${Id}/repositorios`,{
            method: 'GET',
            headers: uneIO(token)
          }).then((r)=>r.json())          
    }

    const addCicloRepositorioFile = (cicloId,repositorioId,data)=>{

        console.log(data)

        var formData = new FormData();
        formData.append("archivo", data.formFile[0]);
        formData.append("fecha", data.fechaVencimiento);

        return fetch(`${URL}/repositorio/esquema/${cicloId}/titulo/${repositorioId}`,{
            method: 'POST',
            headers: headerFile(token),
            body: formData
          })
        //.then((response) => response.json().then( (data) => { data:data, iop : response.status } ))
        /*.then(response=>{
            return response.json();
        })
        .catch((e) => {
            console.log(`An error has occured while calling the API. ${e}`);
            reject(e);
        })
        .finally(()=>{
            //alert('Realizado')
        })*/
    }

    const downloadFile = (cicloId,repositorioId)=>{
        return fetch(`${URL}/repositorio/esquema/${cicloId}/titulo/${repositorioId}`,{
            method: 'GET',
            headers: headerFile(token),
            body: formData
          })
    }

    const uneIO = (clientToken)=>{

        let myHeaders = new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${clientToken}`,
          //'Host': 'api.producthunt.com'
        });    
    
        return myHeaders;
      }

      const headerFile = (clientToken)=>{

        let myHeaders = new Headers({
          'Authorization': `Bearer ${clientToken}`,
          //'Host': 'api.producthunt.com'
        });    
    
        return myHeaders;
      }  

      return { getList, addProceso, getById, getListRepositorios, addCycle, addCicloRepositorioFile }
}

export { useProcessCycle }