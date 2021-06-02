import Navbar from "../containers/navbar";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import PendinLoans from "../pages/pending_loans";
import ApprovedLoans from "../pages/approved_loans";
import RejectedLoans from "../pages/rejected_loans";
import NewApplication from "../pages/new_application";

export const side_nav_tabs = [
  {
    type: "prime",
    name: "Loan",
    key: "loan",
    subtype: [
      {
        type: "sub",
        name: "Pending",
        key: "/loans/pending",
      },
      {
        type: "sub",
        name: "Approved",
        key: "/loans/approved",
      },
      {
        type: "sub",
        name: "Rejected",
        key: "/loans/rejected",
      },
    ],
  },
  {
    type: "sub",
    name: "New Application",
    key: "/new/application",
  }
];

export const tabIcons = {
  "Loan": <AccountBalanceIcon className="sidebar-tab-icon-color" />,
  "Pending": <HourglassEmptyIcon className="sidebar-tab-icon-color" />,
  "Approved": <CheckCircleOutlineIcon className="sidebar-tab-icon-color" />,
  "Rejected": <AssignmentLateIcon className="sidebar-tab-icon-color" />,
  "New Application": <NoteAddIcon className="sidebar-tab-icon-color" />,
};

export const routes = [
  {
    path: "/",
    component: Navbar,
    redirect: "/",
    exact: false,
  },
  {
    path: "/loans/pending",
    component: PendinLoans,
    redirect: "/",
    exact: false,
  },
  {
    path: "/loans/approved",
    component: ApprovedLoans,
    redirect: "/",
    exact: false,
  },
  {
    path: "/loans/rejected",
    component: RejectedLoans,
    redirect: "/",
    exact: false,
  },
  {
    path: "/new/application",
    component: NewApplication,
    redirect: "/",
    exact: false,
  },
];
