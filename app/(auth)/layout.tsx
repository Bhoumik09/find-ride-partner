import { AuthProvider } from '@/components/auth-provider';
import React, { Fragment } from 'react'

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Fragment>
            <AuthProvider>
                

                {children}
            </AuthProvider>
        </Fragment>
    )
}

export default layout
