export function process_date(date){
    let d = new Date(date);
    date = `${months[d.getMonth()]}, ${d.getDate()} ${d.getFullYear()}`;
    return date;
}

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ]

export const columns = [
  {
    field: "applicant_name",
    headerName: "Name",
    filterable: false,
    width: 150,
  },
  {
    field: "email",
    headerName: "Applicant E-mail",
    filterable: false,
    width: 200,
  },
  {
    field: "applicant_address",
    headerName: "Applicant Address",
    filterable: false,
    width: 240,
  },
  {
    field: "loan_amount",
    headerName: "Amount",
    filterable: false,
    width: 140,
  },
  {
    field: "emi",
    headerName: "EMI",
    filterable: false,
    width: 120,
  },
  {
    field: "floating",
    headerName: "Floating",
    filterable: false,
    width: 120,
  },
  {
    field: "issue_date",
    headerName: "Start Date",
    filterable: false,
    width: 150,
  },
  {
    field: "termination_date",
    headerName: "End Date",
    filterable: false,
    width: 145,
  },
];