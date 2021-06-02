/* eslint-disable no-useless-escape */
/* eslint-disable no-useless-constructor */
import React from "react";
import app_status from "../../contexts/app_status";

//  Imports for the form styling
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import apply_loan from '../../adapters/apply_loan'
import {
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import "./style.css";

// formik validation
import { Formik, Field, ErrorMessage } from "formik";
import {
  FormInitial,
  form_fields,
} from "./utils";

class NewApplication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {},
      showPassword: false,
      acceptClick: true,
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  // verifies the values to be submitted
  validateForm(values) {
    this.setState({
      ...this.state,
      error: {},
    });

    let errors = {};
    form_fields.map((field) => {
      if (field.required && values[field.name] === undefined) {
        errors[field.name] = "* Required";
        return true;
      }
      if (field.reg && !field.reg.test(values[field.name]))
        errors[
          field.name
        ] = `* valid ${field.label.toLocaleLowerCase()} required`;
      return true;
    });
    return errors;
  }

  handleSubmit(val) {
    // disable submit until the api call is completed
    this.setState({
      ...this.state.showPassword,
      acceptClick: false,
    });
    apply_loan(val)
      .then((result) => {
        console.log(result);
        this.setState({
          ...this.state,
          acceptClick: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: err,
          acceptClick: true,
        });
      });
  }

  showError() {
    if (this.state.error.payload !== "") {
      return (
        <small style={{ color: "red", margin: "auto" }}>
          {" "}
          {this.state.error.payload}{" "}
        </small>
      );
    }
  }

  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  renderForm({ field, errors, touched, values, key }) {
    return (
      <Grid item key={key} xs={field.xs} md={field.md}>
        <FormControl
          fullWidth={true}
          error={errors[field.name] && touched[field.name] ? true : false}
        >
          {field.as === Input ? (
            <>
              <InputLabel htmlFor="">{field.label}</InputLabel>
              <Field
                as={field.as}
                type={field.type}
                className="form-control"
                id={field.name}
                name={field.name}
                value={values[field.name]}
              />
            </>
          ) : (
            <>
              <label>
                <Field
                  as={field.as}
                  type={field.type}
                  className="form-control"
                  id={field.name}
                  name={field.name}
                />
                {field.label}
              </label>
            </>
          )}
          <ErrorMessage component="FormHelperText" name={field.name}>
            {(errorMsg) => <small style={{ color: "red" }}> {errorMsg} </small>}
          </ErrorMessage>
        </FormControl>
      </Grid>
    );
  }

  render() {
    return (
      <Formik
        initialValues={FormInitial}
        onSubmit={this.handleSubmit}
        validate={this.validateForm}
      >
        {(formik) => {
          window.submitform = () => {
            formik.submitForm();
          };
          return (
            <div className="new-application-body">
              <h1>Loan Application</h1>
              <CssBaseline />
              <div className="application-form">
                <form
                  style={{ padding: 4 }}
                  onReset={formik.handleReset}
                  id="loginForm"
                  action="#"
                  onSubmit={formik.handleSubmit}
                >
                  <Grid container item xs={12} spacing={4} justify="flex-end">
                    {form_fields.map((field, index) =>
                      this.renderForm({
                        field: field,
                        errors: formik.errors,
                        touched: formik.touched,
                        values: formik.values,
                        key: index,
                      })
                    )}
                    <Grid container item xs={12} justify="center">
                      <Grid item>
                        <Button
                          variant="contained"
                          fullWidth={true}
                          color="primary"
                          type="submit"
                          disabled={
                            !(
                              formik.isValid &&
                              formik.dirty &&
                              this.state.acceptClick
                            )
                          }
                        >
                          Submit Application
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  {this.showError()}
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  }
}

export default NewApplication;
NewApplication.contextType = app_status;
