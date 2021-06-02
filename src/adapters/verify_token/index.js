import { VALIDATE_ROUTE } from "../../utils/adapter_route";
import { ERROR} from "../../utils/status";
import axios from '../../utils/axios';
import cookie from "../../utils/cookie";

export default function verify_token(){
    return new Promise((resolve,reject)=>{
      axios
        .get(VALIDATE_ROUTE,{
          headers: {
            authorization: cookie.get("token", { path: "/" }),
          },
        })
        .then((result) => {
          let user_details = result.data.payload;
          resolve(user_details);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            reject(err.response.data);
          }
          reject({
            status: ERROR,
            payload: "Something went wrong!",
          });
        });
    })
}