import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import SearchInput from '../components/SearchInput'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://3.95.31.44:8080/api/cars/show', {
                    headers: {
                        Authorization: token,
                    }
                });
                setCars(response.data || []);
            } catch (err) {
                console.log("Error fetching cars:", err);
            }
        };

        fetchCars();
    }, []);

    const handleDelete = (carId) => {
        setCars(cars.filter(car => car._id !== carId)); // Remove deleted car from the list
    };

    return (
        <div>
            <Navbar/>
            <main className='grow'>
                <section className='bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-100 dark:border-gray-700'>
                    <div className='max-w-screen-xl px-4 py-3 mx-auto lg:py-24'>
            <SearchInput setCars={setCars}/>
            <div className='flex justify-center mt-6'>
                <div className='w-[200px] flex flex-col items-center'>
                    <Button buttonText={'Add more cars'} color={'bg-black'} onClick={async () => {
                        navigate('/create-product')
                    }} />
                </div>
            </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Your </span>cars</h1>

                        <div className='grid grid-cols-4 gap-4'>
                            {cars && cars.length > 0 ? (
                                cars.map((car) => (
                                    <Card key={car._id} car={car} onDelete={handleDelete} />
                                ))
                            ) : (
                                <p className="text-center col-span-4 text-gray-500">No cars available</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Dashboard
