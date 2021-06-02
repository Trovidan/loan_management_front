/* eslint-disable no-useless-escape */
/* eslint-disable no-useless-constructor */
import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import fetch_loans from "../../adapters/fetch_loans";
import app_status from "../../contexts/app_status";
import { REJECTED } from "../../utils/status";
import './style.css'
import { columns, process_date } from "./utils";

class RejectedLoans extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loans: [],
      error: undefined,
      loading: true
    };
    this.process_loan = this.process_loan.bind(this);
  }
  componentDidMount(){
      fetch_loans(REJECTED).then(result=>{
          let loans = this.process_loan(result.payload);
          
          this.setState({...this.state, loans: loans, loading: false});
      }).catch(error=>{
        this.setState({
          ...this.state,
          loans: [],
          error: error.payload ? error.payload : "Something Went Wrong!",
          loading: false
        });
      })
  }
  process_loan(loans){
    loans.forEach((element) => {
      element.id = element._id;
      element.issue_date = process_date(element.issue_date);
      element.termination_date = process_date(element.termination_date);
    });
    return loans;
  }
  render() {
    let ticketsJSX = (
      <div className="ticket-logs-grid">
        <DataGrid
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
            noRowsLabel: "No Rejected Loans!",
            errorOverlayDefaultLabel: "Something Went Wrong!",
          }}
        />
      </div>
    );
    return (
        <div className="loan-display-container">
          <h1>Rejected Loans</h1>
          {ticketsJSX}
        </div>
    );
  }
}

export default RejectedLoans;
RejectedLoans.contextType = app_status;
