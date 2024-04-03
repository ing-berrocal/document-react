const URL = 'http://localhost:8020';

const useRepositorio = (token) =>{
       
    const getList = (page)=>{
        return fetch(`${URL}//repositorio/titulo`,{
            method: 'GET',
            headers: uneIO(token)            
          }).then((r)=>r.json())          
    }
    

    const addItem = (data)=>{
        return fetch(`${URL}/repositorio/titulo`,{
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
          .then(j=>{
            console.log(j)
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

      return { getList, addItem, getById }
}

export { useRepositorio }