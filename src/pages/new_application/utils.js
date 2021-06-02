/* eslint-disable no-useless-escape */
// Utility functions for checking form
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";

export const reg_email =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const reg_phone = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

//initial values
export const FormInitial = {
  applicant_name: undefined,
  email: undefined,
  phone_number: undefined,
  applicant_address: undefined,
  loan_amount: undefined,
  emi: undefined,
  floating: false,
  issue_date: new Date().toJSON().slice(0, 10),
  termination_date: new Date().toJSON().slice(0, 10),
};
export const form_fields = [
  {
    name: "applicant_name",
    type: "text",
    label: "Applicant Name",
    as: Input,
    required: true,
    xs: 6,
    md: 4,
  },
  {
    name: "email",
    type: "email",
    label: "E-mail",
    required: true,
    reg: reg_email,
    as: Input,
    xs: 6,
    md: 4,
  },
  {
    name: "phone_number",
    type: "text",
    label: "Contact Number",
    required: true,
    reg: reg_phone,
    as: Input,
    xs: 6,
    md: 4,
  },
  {
    name: "applicant_address",
    type: "text",
    label: "Applicant Address",
    required: true,
    as: Input,
    xs: 12,
    md: 12,
  },
  {
    name: "loan_amount",
    type: "number",
    label: "Loan Amount",
    required: true,
    as: Input,
    xs: 6,
    md: 3,
  },
  {
    name: "emi",
    type: "text",
    label: "Monthly Installment",
    required: true,
    as: Input,
    xs: 6,
    md: 3,
  },
  {
    name: "issue_date",
    type: "date",
    label: "Loan Start Date",
    required: true,
    as: Input,
    xs: 6,
    md: 3,
  },
  {
    name: "termination_date",
    type: "date",
    label: "Loan Expiry Date",
    required: true,
    as: Input,
    xs: 6,
    md: 3,
  },
  {
    name: "floating",
    type: "checkbox",
    label: "Floating Interest",
    required: true,
    as: Checkbox,
    xs: 2,
    md: 2,
  },
];
