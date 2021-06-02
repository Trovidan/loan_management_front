import { FETCH_LOANS } from "../../utils/adapter_route";
import { ERROR, IMPROPER_REQUEST, LOAN_STATUS, SUCCESS } from "../../utils/status";
import axios from "../../utils/axios";

export default function fetch_loans(status) {
  return new Promise((resolve, reject) => {
    let params = {
        status: status
    };
    if (!verify_params(params)) {
      reject({
        status: IMPROPER_REQUEST,
        payload: "Valid status required!",
      });
      return;
    }
    axios
      .post(FETCH_LOANS, params)
      .then((result) => {
        let loans = result.data.payload;
        resolve({status:SUCCESS, payload: loans});
      })
      .catch((err) => {
        if (err.response && err.response.data) reject(err.response.data);
        reject({
          status: ERROR,
          payload: "Something went wrong!",
        });
      });
  });
}

function verify_params({ status }) {
    let isValid = false;
    LOAN_STATUS.map(stat => {
        if(stat === status)
            isValid = true;
        return true;
    })
    return isValid;
}
