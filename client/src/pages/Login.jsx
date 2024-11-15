import { Navigate, useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login(){
    const navigate = useNavigate();

    return <div>
    <Navbar />
        <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg w-80 bg-white text-center h-max p-2 px-4 dark:bg-gray-900">
            <Heading label={"Sign in"}/>
            <SubHeading label={"Enter your credentials to access your account"}/>
            <InputBox title={"Email"} placeholder={"johndoe@example.com"}/>
            <InputBox title={"Password"} placeholder={""}/>
            <div className="pt-4">
                <Button onClick={() => {navigate('/dashboard')}} buttonText={"Sign In"} color={'bg-black'}/>
            </div>
            <BottomWarning label={"Don't have an account"} linkText={"Sign Up"} to={"/signup"}/>
            </div>
        </div>
    </div>
    <Footer />
    </div> 
}