import { LOAN_ACTION } from "../../utils/adapter_route";
import { ERROR, SUCCESS } from "../../utils/status";
import axios from "../../utils/axios";

export default function loan_action(params) {
  return new Promise((resolve, reject) => {
    axios
      .post(LOAN_ACTION, params)
      .then((result) => {
        console.log(result);
        resolve({ status: SUCCESS, payload: result.response.payload });
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) reject(err.response.data);
        reject({
          status: ERROR,
          payload: "Something went wrong!",
        });
      });
  });
}
