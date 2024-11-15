import axios from 'axios'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import Footer from "../components/Footer"
import { Heading } from "../components/Heading"
import ImageUpload from "../components/ImageUpload"
import { InputBox } from "../components/InputBox"
import Navbar from "../components/Navbar"
import { SubHeading } from "../components/SubHeading"
import { BottomWarning } from '../components/BottomWarning'

export default function CreateProduct() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();


    const handleImageChange = (files) => {
        setImages([...files]); // Store selected files in images state
    };

    const handleAddCar = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. Please sign in.");
            navigate('/signin');
            return; // Optionally, navigate to the login page here
        }

        const tagArray = tags.split(',').map(tag => tag.trim());

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", JSON.stringify(tagArray));
        images.forEach(image => {
            formData.append("images", image);
        });

        try {
            await axios.post(
                "http://3.95.31.44:8080/api/cars/create",
                formData, // sending FormData for file upload
                {
                    headers: {
                        Authorization:token,
                        "Content-Type": "multipart/form-data", // Important for file upload
                    }
                }
            );

            setShowSuccess(true); // Show the success alert

            // Redirect to the dashboard after 2 seconds
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.error("Error adding car:", error);
        }
    };

    return <div>
        <Navbar />
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 dark:bg-gray-900">
                    <Heading label={"Add Car details"}></Heading>
                    <SubHeading label={"Enter title, description, tags and upload image"} />
                    <InputBox onChange={(e) => setTitle(e.target.value)} title={"Title"} placeholder={"Hyundai"} />
                    <InputBox onChange={(e) => setDescription(e.target.value)} title={"Description"} placeholder={"Hyundai is a good company"} />
                    <InputBox onChange={(e) => setTags(e.target.value)} title={"Tags"} placeholder={"CarType/dealer/company"} />
                    <ImageUpload title={'Upload'} onUpload={handleImageChange}/>
                    <div className="pt-4">
                        <Button onClick={handleAddCar} buttonText={"Add"} color={'bg-black'} />
                    </div>
                    <BottomWarning label={"Don't want to add? "} linkText={"Go Back"} to={"/dashboard"} />
                    {showSuccess && (
                        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span class="font-medium"> Car added successfully! Redirecting to your dashboard...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <Footer />
    </div>
}
