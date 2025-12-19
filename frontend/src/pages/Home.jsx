import React from 'react'

function Home({ props }) {

    return (
        <>
            <div> Home </div>
            {props ? <span>Authorize</span> : <span>Not Authorize</span>}
        </>
    )
}

export default Home;