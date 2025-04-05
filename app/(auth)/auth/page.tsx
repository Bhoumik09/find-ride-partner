'use client'
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "../../../components/ui/select"
import { SelectTrigger } from "@radix-ui/react-select"
import { LockKeyhole, LucidePhone, Mail, Phone, User, User2, UserCircle } from "lucide-react"
import { useMutation } from "@tanstack/react-query";
import { login, signUp } from "@/actions/auth";
import { toast } from "sonner";
import { useAuth } from "@/components/auth-provider";
import { AxiosError } from "axios";

export default function Home() {
    const { authData, setToken, setUserData } = useAuth()
    const [loginUser, setLoginUsername] = useState<string | null>();
    const [loginPassword, setLoginPassword] = useState<string | null>();
    const [numberLogin, setNumberLogin]=useState<string|null>();
    const [emailSignup, setEmailSignup] = useState<string | null>();
    const [numberSignUp, setNumberSignUp] = useState<string |  null>();
    const [gender, setGender] = useState<"male" | "female" >("male");
    const [signUpUser, setSignUpUsername] = useState<string | null>();
    const [signUpPassword, setSignUpPassword] = useState<string | null>();
    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: login
    });
    const signUpMutation= useMutation({
        mutationKey:['signup'],
        mutationFn:signUp
    })
    const onLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await loginMutation.mutateAsync({ username: loginUser!, password: loginPassword!, phoneNumber:numberLogin! })
            if (!data || data.error) {
                toast.error("Uh oh! some error occurred!")
            }
            console.log(loginUser);
            if (data && data.token) {
                toast.success("Signed in successfully")
                setToken(data.token)
            }
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                console.error(error.message);
            }
        }


    }
    const onSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await signUpMutation.mutateAsync({ username: signUpUser!, password: signUpPassword!, phoneNumber:numberSignUp!,email:emailSignup! , gender:gender! })
            if (!data || data.error) {
                toast.error("Uh oh! some error occurred!")
            }
            console.log(loginUser);
            if (data && data.token) {
                toast.success("Signed in successfully")
                setToken(data.token)
            }
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                console.error(error.message);
            }
        }


    }
    return (
        <div className="flex flex-col w-full h-screen  bg-gradient-to-br from-blue-50 to-blue-100     justify-center items-center">

            <Tabs defaultValue="account" className=" w-full lg:max-w-xl">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account">Login</TabsTrigger>
                    <TabsTrigger value="signup">SignUp</TabsTrigger>
                    <TabsTrigger value="password">Forgot Password</TabsTrigger>

                </TabsList>
                <TabsContent value="account"  >
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Enter your details to login and create rides
                            </CardDescription>
                        </CardHeader>
                        <form id="login-form" onSubmit={onLoginSubmit}>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="login-name"><UserCircle></UserCircle> Username</Label>
                                    <Input id="login-name" required type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginUsername(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="login-phone"><Phone></Phone>Phone Number</Label>
                                    <Input id="login-phone" required type="tel" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberLogin(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="login-password"><LockKeyhole></LockKeyhole>Password</Label>
                                    <Input id="login-password" required type="password" onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)} />
                                </div>
                                <div className="space-x-3">
                                    <Button form="login-form" type={'submit'}>Login</Button>
                                    <Button type={'reset'}>Reset</Button>
                                </div>

                            </CardContent>
                        </form>


                    </Card>
                </TabsContent>
                <TabsContent value="signup" >
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign up</CardTitle>
                            <CardDescription>
                                Create a new account here
                            </CardDescription>
                        </CardHeader>
                        <form id="signup" onSubmit={onSignupSubmit} className="space-y-2">
                            <CardContent className="space-y-2">

                                <div className="space-y-1">
                                    <Label htmlFor="email"><Mail></Mail>Email</Label>
                                    <Input id="email" required type="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailSignup(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username"><User2></User2>Username</Label>
                                    <Input id="username" required type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setSignUpUsername(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="gender"><User></User>Gender</Label>

                                    <Select required onValueChange={(value: "male" | "female") => setGender(value)}>
                                        <SelectTrigger className="w-full py-1.5 border rounded-sm shadow-xs">
                                            <SelectValue placeholder="Select a Gender" className="text-left" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="current"><LucidePhone></LucidePhone>Phone Number</Label>
                                    <Input required id="current" type="tel" onChange={(e: ChangeEvent<HTMLInputElement>) => setNumberSignUp(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new"><LockKeyhole></LockKeyhole>New password</Label>
                                    <Input required id="new" type="password" onChange={(e: ChangeEvent<HTMLInputElement>) => setSignUpPassword(e.target.value

                                    )} />
                                </div>
                            </CardContent>
                            <CardFooter >
                                <Button form="signup" type={'submit'}>Save password</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
                <TabsContent value="password" >
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="curr_email">Your Email</Label>
                                <Input id="curr_email" type="EMAIL" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

    );
}
