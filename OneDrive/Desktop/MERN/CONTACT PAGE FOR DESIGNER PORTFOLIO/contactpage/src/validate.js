import { Toaster, toast } from "react-hot-toast";


 function usernameVerify(error = {} , values){
           if (!values.username){
            error.username = toast.error('username required ....')
           }
           else if (values.username.includes(" ")){
            error.username = toast.error('username invalid ....')  
           }
           return error;
}


function numberVerify(error = {} , values){

  

        if (!values.number){
         error.number = toast.error('number required ....')
        }
        else if (values.number.includes(" ")){
         error.number = toast.error('number invalid ....')  
        }
        else if (values.number.length > 10 || values.number.length < 10 ){
            error.number = toast.error('number should of 10 digits')  
           }
   
}

function messageVerify(error = {} , values){

  

    if (!values.mailmessage){
     error.mailmessage = toast.error('message required ....')
    }
    else if (values.mailmessage.includes(" ")){
     error.mailmessage = toast.error(' invalid message....')  
    }

}

export async function registerValidate(values){
    const errors = usernameVerify({},values)
    messageVerify(errors , values);
    emailVerify(errors ,values)
    numberVerify(errors,values)
    return errors;
    
}
function emailVerify(error = {},values){
    if(!values.email){
        error.email = toast.error('email required...')
    }
    
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error('wrong email...')
    }
}