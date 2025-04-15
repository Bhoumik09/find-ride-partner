'use client'
import { AuthProvider } from '@/components/auth-provider';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'
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
