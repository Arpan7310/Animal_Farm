

import Axios from 'axios'
 export const fetch = () =>{


    return{

        type:'FETCH_DATA'
    }
}
 export const fetchsuccess = (data) => {

return {


    type:'BOX_DETAILS_SUCCESS',
    payload:data,

}


}

export const failure = (err) =>{

    return{
    type:'FAILURE',
    payload:err,
 
    }
}


export const fetchdata = () =>{

    return (dispatch) =>{
        dispatch(fetch())
Axios.get('https://jsonplaceholder.typicode.com/posts').then(res=>{
    const users=res.data

    dispatch(fetchsuccess(users))
}).catch(error=>{

dispatch(failure(error))
})

    }
}

