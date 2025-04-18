import {  fetchUserName } from '@/actions/auth';
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link'
import React, { Fragment } from 'react'
import { cookies } from 'next/headers';
import LogoutButton from '@/components/logoutButton';
import { AuthProvider } from '@/components/auth-provider';
import { redirect } from 'next/navigation';
const layout = async ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const token = (await cookies()).get('token')?.value;
    if(!token){
        redirect('/auth')
        
    }
    const fetchUser: { msg?: string, userInfo?: { name: string } , error?:string} | null = await fetchUserName(token);
    
    return (
        <AuthProvider>
            <Fragment>
                <div className="bg-gradient-to-r from-red-100  to-yellow-100 flex p-4 w-full justify-between items-center">
                    <div className="text-2xl px-2 font-bold">Campus Ride</div>

                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className='rounded-full' size={'icon'}>{fetchUser?.userInfo?.name[0].toUpperCase()}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem><Link href="/find-rides">Find Rides</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem> <Link href="/create-new-ride">Offer a ride</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link href="https://mail.google.com/mail/?view=cm&fs=1&to=bhoumikchopra2022@vitbhopal.ac.in&su=Inquiry&body=Hello%2C%20I%20would%20like%20to%20ask%20about%20your%20services.">Contact me on Gmail</Link>

                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='bg-red-500 !font-bold hover:!bg-red-200' asChild><LogoutButton />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                {children}
            </Fragment>
        </AuthProvider>
    )
}

export default layout
