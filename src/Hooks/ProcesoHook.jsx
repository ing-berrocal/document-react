import { useContext, useEffect, useState } from "react"
import AutenticacionContext from "./AutenticacionContext";

const URL = 'http://localhost:8020';

const useProceso = (token) =>{
    
    const NUM_P = 10;

    const paginar = (data)=>{
        let numpages = data/NUM_P;
    }

    const getList = (page)=>{
        return fetch(`${URL}/proceso`,{
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
        return fetch(`${URL}/proceso/${Id}`,{
            method: 'GET',
            headers: uneIO(token)            
          }).then((r)=>r.json())
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

      return { getList, addProceso, getById, addCycle }
}

export { useProceso }