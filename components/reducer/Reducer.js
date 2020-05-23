

const initialState={

    data:[],
    error:'',
   
}


const Reducer = (state=initialState,action) =>{

switch(action.type){

case 'FETCH_DATA':

return{
    ...state
}

case 'BOX_DETAILS_SUCCESS':
    return {
      data:action.payload,
        error:'',
       
        
    }

    case 'FAILURE':
        return {
           data:[],
            error:action.payload,

        }

default:return state


}
}

export default Reducer 