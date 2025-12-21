import React from 'react'
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";


function Home({ props }) {

    return (
        <>
            <div> Home </div>
            <Box sx={{display:"flex", flexDirection:"column"}}>
            <Link href="/login">Login</Link>
            <Link href="/registration">Registration</Link>
            </Box>
            
            {props ? <span>Authorize</span> : <span>Not Authorize</span>}
        </>
    )
}

export default Home;