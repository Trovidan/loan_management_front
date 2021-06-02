import { CircularProgress } from '@material-ui/core';
import React from 'react';

const loading = ()=>{

    
    return(
        
        <div style={{
            widht:"100vw",
            height:"100vh",
            display:"flex",
            justifyItems:"center",
            alignItems:"center",
            placeContent:"center"
        }}>
            <CircularProgress />
        </div>
    )
}

export default loading;