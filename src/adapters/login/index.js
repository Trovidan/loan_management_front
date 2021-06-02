import { LOGIN_ROUTE } from "../../utils/adapter_route";
import { ERROR, IMPROPER_REQUEST } from "../../utils/status";
import axios from '../../utils/axios';
import cookie from "../../utils/cookie";

export default function login(email, password){
    let params = {
      email: email,
      password: password,
    };
   
    return new Promise((resolve,reject)=>{
        if(!verify_params(params)){
            reject({status: IMPROPER_REQUEST, payload: "Valid email and password required!"});
            return;
        }
        axios.post(LOGIN_ROUTE, params).then(result=>{
            let token = result.data.payload;
            cookie.set("token",token, {path: "/"})
            resolve(result.data)
        }).catch(err=>{
            if(err.response && err.response.data)   
                reject(err.response.data);
            reject({
              status: ERROR,
              payload: "Something went wrong!",
            });
        })
    })
}

function verify_params({email, password}){
    if(!email || !password)
        return false;
    return true;
}