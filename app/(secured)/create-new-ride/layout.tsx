
import React, { Fragment } from 'react'

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
       
        <Fragment>
            {children}
        </Fragment>
        

    )
}

export default layout
