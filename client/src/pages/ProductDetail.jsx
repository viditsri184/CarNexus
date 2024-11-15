import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhotoCarousel from '../components/PhotoCarousel';
import axios from 'axios';
import Loader from '../components/Loader';

function ProductDetail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const carId = searchParams.get("carId");

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found. Please sign in.");
                    navigate('/signin');
                    return;
                }

                const response = await axios.get(`https://carnexus-api.onrender.com/api/cars/car?carId=${carId}`, {
                    headers: {
                        Authorization: token,
                    }
                });
                setCar(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCarDetails();
    }, [carId, navigate]);


    return (
        <div>
            <Navbar />
            <main className='grow'>
                <section className='py-4 bg-white dark:bg-gray-900 lg:pt-12 lg:pb-16'>
                    <div className='px-4 mx-auto max-w-8xl lg:px-4 lg:text-center'>
                        {car ? (
                            <>
                                <h1 className='mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white lg:text-center xl:px-36 lg:mb-7'>
                                    Title: {car.title}
                                </h1>
                                <p className='mb-4 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-center lg:text-xl xl:px-60'>
                                    Description: {car.description}
                                </p>
                                {car.tags && car.tags.length > 0 && (
                                    <div className='mb-4 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-center lg:text-xl xl:px-60'>
                                        Tags: {car.tags.join(', ')}
                                    </div>
                                )}
                                <div className='flex flex-col mb-8 md:flex-row lg:justify-center'>
                            <a href="/dashboard" className='text-white bg-black hover:bg-gray-800 dark:bg-white focus:ring-4 focus:ring-blue-300  font-medium rounded-lg text-base px-6 py-2.5 text-center md:mr-5 mb-3 md:mb-0 inline-flex items-center justify-center'>Go Back</a>
                        </div>
                            </>
                        ) : (
                            <p className='text-lg text-gray-500 dark:text-gray-400 lg:text-center lg:text-xl'>
                                <Loader />
                            </p>
                        )}
                    </div>
                </section>
                <section className='py-4 bg-white dark:bg-gray-900 lg:pt-12 lg:pb-16'>
                <h3 className='mb-4 text-2xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-4xl lg:leading-none dark:text-white lg:text-center xl:px-36 lg:mb-7'>
                                    Uploaded Images
                                </h3>
                    <PhotoCarousel carImg={car?.images} />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default ProductDetail;
