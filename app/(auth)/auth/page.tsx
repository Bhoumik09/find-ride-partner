'use client'
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
import { Loader, LockKeyhole, LucidePhone, Mail, Phone, User, User2, UserCircle } from "lucide-react"
import { useMutation } from "@tanstack/react-query";
import { login, resetPass, signUp } from "@/actions/auth";
import { toast } from "sonner";
import { useAuth } from "@/components/auth-provider";
import { AxiosError } from "axios";

export default function Home() {
    const { setToken} = useAuth()
    const [loginUser, setLoginUsername] = useState<string | null>();
    const [loginPassword, setLoginPassword] = useState<string | null>();
    const [numberLogin, setNumberLogin] = useState<string | null>();
    const [emailSignup, setEmailSignup] = useState<string | null>();
    const [numberSignUp, setNumberSignUp] = useState<string | null>();
    const [gender, setGender] = useState<"male" | "female">("male");
    const [signUpUser, setSignUpUsername] = useState<string | null>();
    const [signUpPassword, setSignUpPassword] = useState<string | null>();
    const [forgotPassUsername, setForgotPassUsername] = useState<string | null>();
    const [forgotPassPhone, setForgotPassPhone] = useState<string | null>();
    const [forgotPassNewPass, setForgotPassNewPass] = useState<string | null>();
    const [forgotPassCnfPass, setForgotPassCnfPass] = useState<string | null>();


    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: login
    });
    const signUpMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: signUp
    })
    const resetPassMutation = useMutation({
        mutationKey: ['reset-pass'],
        mutationFn: resetPass
    })
    const onLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data:{ token?: string; error?: string ,msg?:string } = await loginMutation.mutateAsync({ username: loginUser!, password: loginPassword!, phoneNumber: numberLogin! })
            if (!data || data.error) {
                toast.error(data?.error || 'Un oh!An unknown error occured', {
                    style: { backgroundColor: 'red' }
                })
            }
            if (data && data.token) {
                toast.success("Signed in successfully", {
                    style: { backgroundColor: 'lightgreen' }
                })
                setToken(data.token)
            }
        }
        catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.message || 'Un oh!An unknown error occured')
            }
        }


    }
    const onSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data: { msg?: string, error?: string } = await signUpMutation.mutateAsync({ username: signUpUser!, password: signUpPassword!, phoneNumber: numberSignUp!, email: emailSignup!, gender: gender! })
            if (!data || data.error) {
                toast.error(data?.error || "Uh oh! some error occurred!", { style: { backgroundColor: 'red' } })
                return;
            }
            if (data.msg) {
                toast.success("Signup  successfull")

                setActiveTab('account')
                return;
            }

        }
        catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message || "Uh oh! some error occurred!")
            }
        }


    }
    const onResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(forgotPassCnfPass===forgotPassNewPass){
                toast.error('New password and confirmed password should not be same', { style: { backgroundColor: 'red' } })
                return
            }
            const data: { msg?: string, error?: string } = await resetPassMutation.mutateAsync({ username: forgotPassUsername!, password: forgotPassNewPass!, phoneNumber: forgotPassPhone! })
            if (!data || data.error) {
                toast.error(data?.error || "Uh oh! some error occurred!", { style: { backgroundColor: 'red' } })
                return;
            }
            if (data.msg) {
                toast.success("Password reset successfull")

                setActiveTab('account')
                return;
            }

        }
        catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message || "Uh oh! some error occurred!")
            }
        }


    }
    const [activeTab, setActiveTab] = useState("account");

    return (
        <div className="flex flex-col  gap-3 w-full h-screen  bg-gradient-to-br from-blue-50 to-blue-100     justify-center items-center">
            <div className="text-center font-medium p-2"> Welcome to your assistant — here to help you find the perfect travel partners. </div>  

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className=" w-full lg:max-w-xl">
                <TabsList className="grid w-full grid-cols-3 transition-all duration-500">
                    <TabsTrigger value="account">Login</TabsTrigger>
                    <TabsTrigger value="signup">SignUp</TabsTrigger>
                    <TabsTrigger value="password">Forgot Password</TabsTrigger>

                </TabsList>
                <TabsContent className="transition-all duration-700" value="account"  >
                    <Card className="transition-all">
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
                                <div className="space-x-3 transition-all duration-300">
                                    {!loginMutation.isLoading ? <Button className="" form="login-form" type={'submit'}>
                                        Login</Button> : <Button className="cursor-pointer transition-all" form="signup" disabled type={'submit'}><Loader className="animate-spin" />Logging In.....</Button>}
                                    <Button type={'reset'}>Reset</Button>
                                </div>

                            </CardContent>
                        </form>


                    </Card>
                </TabsContent>
                <TabsContent className="transition-all duration-700" value="signup" >
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
                            <CardFooter className="transition-all duration-1000" >
                                {signUpMutation.isLoading ? <Button className="" disabled form="signup" type='button'>
                                    <Loader className="animate-spin" /> Saving password...</Button> : <Button className="cursor-pointer transition-all" form="signup" type={'submit'}>Save password</Button>}
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
                <TabsContent className="transition-all duration-700" value="password" >
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here.
                            </CardDescription>
                        </CardHeader>
                        <form id="reset-pass" onSubmit={onResetPassword} className="space-y-2">
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="pass_user">Your Username</Label>
                                    <Input id="pass_user" required placeholder="Enter your username" type="text" onChange={(e) => { setForgotPassUsername(e.target.value) }} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="pass">Your Password</Label>
                                    <Input id="pass" min={10}  type="tel" placeholder="Enter your phone number" onChange={(e) => { setForgotPassPhone(e.target.value) }} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="current">New password</Label>
                                    <Input id="current" min={8} required type="password" placeholder="Enter new password" onChange={(e) => { setForgotPassNewPass(e.target.value) }} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Current password</Label>
                                    <Input id="new"  min={8} required type="password" placeholder="Enter new password again" onChange={(e) => { setForgotPassCnfPass(e.target.value) }} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                {!resetPassMutation.isLoading?<Button  form="reset-pass" type={'submit'}>Change password</Button>:<Button  form="reset-pass" disabled type={'button'}>
                                   <Loader className="animate-spin"/> Updating password....</Button>}
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

    );
}
