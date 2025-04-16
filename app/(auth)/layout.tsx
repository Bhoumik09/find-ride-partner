import { AuthProvider } from '@/components/auth-provider';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
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
