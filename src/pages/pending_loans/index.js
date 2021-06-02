/* eslint-disable no-useless-escape */
/* eslint-disable no-useless-constructor */
import { Button, Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import fetch_loans from "../../adapters/fetch_loans";
import app_status from "../../contexts/app_status";
import { PENDING } from "../../utils/status";
import './style.css'
import { columns, process_date } from "./utils";
import loan_action from '../../adapters/loan_action'

class PendingLoans extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loans: [],
      error: undefined,
      loading: true,
      isRowSelected: false,
      selectedRow: []
    };
    this.process_loan = this.process_loan.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.fetchLoan = this.fetchLoan.bind(this);
    this.onAction = this.onAction.bind(this);
  }
  componentDidMount(){
    this.fetchLoan();
  }

  fetchLoan(){
    fetch_loans(PENDING)
      .then((result) => {
        let loans = this.process_loan(result.payload);

        this.setState({ ...this.state, loans: loans, loading: false, isRowSelected: false, selectedRow: [] });
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          loans: [],
          error: error.payload ? error.payload : "Something Went Wrong!",
          loading: false,
          isRowSelected: false,
          selectedRow: [],
        });
      });
  }

  process_loan(loans){
    loans.forEach((element) => {
      element.id = element._id;
      element.issue_date = process_date(element.issue_date);
      element.termination_date = process_date(element.termination_date);
    });
    return loans;
  }

  handleRowSelection(e){
    console.log(e);
    if (e.selectionModel.length > 0) {
      this.setState({
        ...this.state,
        isRowSelected: true,
        selectedRow: e.selectionModel,
      });
    } else {
      this.setState({
        ...this.state,
        isRowSelected: false,
        selectedRow: [],
      });
    }
  }

  onAction(){
    let params = {
      ids: this.state.selectedRow
    }
    loan_action(params).then(result=>{
      this.fetchLoan();
    }).catch(err=>{
      this.fetchLoan();
    })
  }

  render() {
    let user_level = this.context.user_details.power
    let action_text = user_level < 2? "Approve":'Withdraw'
    let ticketsJSX = (
      <div className="ticket-logs-grid">
        <DataGrid
          checkboxSelection
          disableColumnMenu
          disableSelectionOnClick
          rows={this.state.loans}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 15, 20, 25, 50]}
          loading={this.state.loading}
          scrollbarSize={4}
          error={this.state.error}
          localeText={{
            noRowsLabel: "No Pending Loans!",
            errorOverlayDefaultLabel: "Something Went Wrong!",
          }}
          selectionModel={this.state.selectedRow}
          onSelectionModelChange={this.handleRowSelection}
        />
      </div>
    );
    let ActionBtn = (
      <Button variant="contained" color="secondary" disabled={!this.state.isRowSelected} onClick={this.onAction}>
        {action_text}
      </Button>
    )
    return (
      <div className="loan-display-container">
        <h1>Pending Loans</h1>
        <Grid container item xs={12} spacing={1} justify="flex-end">
          <Grid item>{ActionBtn}</Grid>
          <Grid item xs={12}>{ticketsJSX}</Grid>
        </Grid>
      </div>
    );
  }
}

export default PendingLoans;
PendingLoans.contextType = app_status;
