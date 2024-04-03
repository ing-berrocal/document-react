import { useEffect, useState } from "react"

const useLogin = (URL) =>{
    
    const [ token, setToken ] = useState('null');

    const storage = window.localStorage;

    useEffect(()=>{
        fetch(`${URL}/usuario`,{
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
          body:  JSON.stringify({'email':null,'passowrd':null})
        }).then((r)=>r.json())
        .then(j=>{
          console.log(j);
          storage.setItem('jwt',j.jwt);

          setToken(j.jwt);
        })
    },[]);    

    const isLoged = ()=> userInfo == undefined || userInfo == null;

    return { isLoged, token }
}

export { useLogin }