import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false); // New state for showing the alert
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup", {
                username, firstName, lastName, password
            });
            localStorage.setItem("token", "Bearer " + response.data.token);
            setShowSuccess(true); // Show the success alert

            // Wait 2 seconds, then navigate to the dashboard
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.error("Signup error:", error);
            // Optionally handle error here (e.g., show an error alert)
        }
    };

    return <div>
        <Navbar />
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 dark:bg-gray-900">
                    <Heading label={"Sign Up"}></Heading>
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox onChange={(e) => setFirstName(e.target.value)} title={"First Name"} placeholder={"John"} />
                    <InputBox onChange={(e) => setLastName(e.target.value)} title={"Last Name"} placeholder={"Doe"} />
                    <InputBox onChange={(e) => setUsername(e.target.value)} title={"Email"} placeholder={"johndoe@example.com"} />
                    <InputBox onChange={(e) => setPassword(e.target.value)} title={"Password"} placeholder={""} />
                    <div className="pt-4">
                        <Button onClick={handleSignUp} buttonText={"Sign Up"} color={'bg-black'} />
                    </div>
                    <BottomWarning label={"Already have an account? "} linkText={"Login"} to={"/signin"} />
                </div>
                {/* Success Alert */}
                {showSuccess && (
                    <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <span class="font-medium">Successfully signed up!</span> Redirecting to the dashboard...
                    </div>
                )}
            </div>
        </div>
        <Footer />
    </div>
}