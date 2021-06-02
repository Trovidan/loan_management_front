/* eslint-disable no-useless-escape */
/* eslint-disable no-useless-constructor */ 
import React from "react";
import app_status from "../../contexts/app_status";
import {Link} from 'react-router-dom'

//  Imports for the form styling
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FormControl, InputLabel,Input,FormControlLabel,Checkbox} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


// formik validation
import {Formik,Field,ErrorMessage} from 'formik';
import { containsCapitalLetters, containsDigit, containSpecialCharacters, useStyles, FormInitial, validateEmail } from "./utils";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      error: {},
      showPassword: false,
      acceptClick: true,
    }

    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }


  // verifies the values to be submitted
  validateForm(values) {

    this.setState(
      {
        ...this.state,
        error:{},
        
      }
    )

    let errors = {};
    if (!values.email) {
      errors.email = "* required";
    } else if (!validateEmail(values.email)) {
      errors.email = "* invalid email";
    }
    if (!values.password) {
      errors.password = "*Required";
    } else if (!containSpecialCharacters(values.password)) {
      errors.password = "* must contain a special character !@#$%&";
    } else if (!containsCapitalLetters(values.password)) {
      errors.password = "* must contain captial letters";
    } else if (!containsDigit(values.password)) {
      errors.password = "* must contain numbers";
    }
    return errors;
  }

  handleSubmit(val) { 

    // disable submit until the api call is completed
    this.setState({
      ...this.state.showPassword,
      acceptClick: false,
    })

    this.context.login_user(val.email, val.password)
    .then((result)=>{
      this.setState({
        ...this.state,
        acceptClick:true,
      })
    })
    .catch((err)=>{
      this.setState({
        error : err,
        acceptClick:true,
      })

    });

    
  }

  // Function for displaying error message in the form
  showError(){
    if(this.state.error.payload !== "")
    {
      return(
        <small style={{ color: "red", margin:"auto"} }> {this.state.error.payload} </small>

    )}
  }

  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };


  
  render() {
    
    // using custom styles
    const { classes } = this.props;

    return (
      <Formik
        initialValues={FormInitial}
        onSubmit ={this.handleSubmit}
        validate={this.validateForm}
      >
        {(formik) => {
          window.submitform = () => {
            formik.submitForm();
          };

          return (
            <div className = {classes.main}>           
            <Container
              component="main"
              className={classes.container}
              maxWidth="xs"
              
            >
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form
                  className={classes.form}
                  style={{ padding: 4 }}
                  onReset={formik.handleReset}
                  id="loginForm"
                  action="#"
                  onSubmit={formik.handleSubmit}
                >
                  <Grid container
                    spacing={2}
                  >
                    <Grid item xs={12}
                    >
                      <FormControl
                        fullWidth={true}
                        error={
                          formik.errors.email && formik.touched.email
                            ? true
                            : false
                        }
                      >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Field
                          as={Input}
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                        />
                        <ErrorMessage component="FormHelperText" name="email">
                          {(errorMsg) => (
                            <small style={{ color: "red" }}> {errorMsg} </small>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} item>
                      <FormControl
                        fullWidth={true}
                        error={
                          formik.errors.password && formik.touched.password
                            ? true
                            : false
                        }
                      >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Field
                          as={Input}
                          type={(this.state.showPassword ? "text" : "password")}
                          className="form-control"
                          id="password"
                          name="password"
                        />
                        <ErrorMessage
                          component="FormHelperText"
                          name="password"
                        >
                          {(errorMsg) => (
                            <small style={{ color: "red" }}> {errorMsg} </small>
                          )}
                        </ErrorMessage>
                      </FormControl>

                      <FormControlLabel
                        control={
                          <Checkbox
                            color= "primary"
                            checked= {this.state.showPassword}
                            onClick={this.handleClickShowPassword}
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            name="checkedI"
                          />
                        }
                        label="Show Password"
                      />

                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        className={classes.submit}
                        fullWidth={true}
                        color="primary"
                        type="submit"
                        disabled={!(formik.isValid && formik.dirty && this.state.acceptClick)}
                      >
                        Sign In
                      </Button>

                      <Link to='/reset/password' style={{textDecoration:"none"}}>
                        Forgot password?
                      </Link>
                    </Grid> 
                    {this.showError()}

                  </Grid>
                </form>
              </div>
            </Container>
            </div>
          );
        }}
      </Formik>
    );
  }
}

export default withStyles(useStyles)(Login)
Login.contextType = app_status;