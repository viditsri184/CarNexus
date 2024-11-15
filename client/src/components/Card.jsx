import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Card({ car, onDelete }) {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false); // To show loading state on delete
    const imageUrl = car.images && car.images.length > 0 ? car.images[0] : "img1.jpg"; // Fallback image

    const handleEditClick = () => {
        navigate(`/update?carId=${car._id}`);
    };

    const handleReadMoreClick = () => {
        navigate(`/car?carId=${car._id}`);
    };

    const handleDeleteClick = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please sign in.");
            return;
        }

        setIsDeleting(true); // Set deleting state to true

        try {
            await axios.delete(`https://carnexus-api.onrender.com/api/cars/remove?carId=${car._id}`, {
                headers: {
                    Authorization: token, // Send the token in the Authorization header
                },
            });

            // Notify parent component to remove the deleted car from the list
            onDelete(car._id);

            setIsDeleting(false); // Reset deleting state
        } catch (error) {
            console.error("Error deleting car:", error);
            setIsDeleting(false); // Reset deleting state
        }
    };

    return (
        <div>
            <div className="mt-7 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src={imageUrl} alt={car.title || "Car Image"} />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{car.title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{car.description}</p>
                    <button
                        onClick={handleEditClick}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-white dark:text-black"
                    >
                        Edit
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleReadMoreClick}
                        className="inline-flex items-center px-3 py-2 ml-3 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-white dark:text-black"
                    >
                        Read More
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        disabled={isDeleting} // Disable button while deleting
                        className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-white dark:text-black"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
