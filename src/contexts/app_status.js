import React from "react";

let AppStatus = {
    auth: false,
    power: 3,
    user_details: {},
    active_tab: undefined,
    login_user: ()=>{},
    verify_user: ()=>{},
    logout_user: ()=>{},
    set_active_tab: ()=>{}
};

const app_status = React.createContext(AppStatus);

export default app_status;
