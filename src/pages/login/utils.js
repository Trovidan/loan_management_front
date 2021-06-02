/* eslint-disable no-useless-escape */
// Custom style using make styes
// !!! Used with styles because make style hook does not work with
// class based components
export const useStyles = (theme) => ({

  main:{
    display: "flex",
    alignItems:  "center",
    justifyItems : "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgb(210,210,210)",
  },
  logo:{
    width: "30%",
    height: "50%",
    paddingBottom : "15px",
  },

  container: {
    backgroundColor: "white",
    borderRadius: "30px",
    paddingBottom: "20px", 
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
});

// Utility functions for checking form
export const containsDigit = (val) => /[0-9]+/i.test(val);
export const containsCapitalLetters = (val) => /[A-Za-z]+/i.test(val);
export const containSpecialCharacters = (val) =>/@|!|@|#|\$|%|\^|&|\*|\?/i.test(val);
export const validateEmail = (email)=>{
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
//initial values
export const FormInitial = {
  email: "",
  password: "",
};