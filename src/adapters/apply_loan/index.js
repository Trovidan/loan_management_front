import { CREATE_LOAN_APPLICATION} from "../../utils/adapter_route";
import {
  ERROR,
  SUCCESS,
} from "../../utils/status";
import axios from "../../utils/axios";

export default function apply_loan(params) {
  return new Promise((resolve, reject) => {
    axios
      .post(CREATE_LOAN_APPLICATION, params)
      .then((result) => {
        let loans = result.data.payload;
        resolve({ status: SUCCESS, payload: loans });
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
