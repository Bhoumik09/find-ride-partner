import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { Fragment } from 'react'

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Fragment>
            <div className="bg-gradient-to-r from-red-100  to-yellow-100 flex p-4 w-full justify-between items-center">
                <div className="text-2xl px-2 font-bold">Campus Ride</div>
                <div className="sm:flex items-center space-x-5 text-lg font-bold hidden text-red-800">
                    <Link href="/">Find Rides</Link>
                    <Link href="/offer-ride">Offer a ride</Link>
                    <Link href="/">How it works</Link>
                </div>
                <div>
                    <Button variant="outline" size="sm" className="">More Info</Button>
                </div>
            </div>
            {children}
        </Fragment>
    )
}

export default layout
