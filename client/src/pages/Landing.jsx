import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Tabs from '../components/Tabs'

function Landing() {
    return (
        <div>
            <Navbar />
            <main className='grow'>
                <section className='py-4 bg-white dark:bg-gray-900 lg:pt-12 lg:pb-16'>
                    <div className='px-4 mx-auto max-w-8xl lg:px-4 lg:text-center'>
                        <h1 className='mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white lg:text-center xl:px-36 lg:mb-7'>Your Gateway to Effortless Car Management</h1>
                        <p className='mb-10 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-center lg:text-xl xl:px-60'>A one-stop solution for car enthusiasts, owners, and renters. Add your own cars giving them suitable title, a vivid description, some tags and an image. You can add upto 10 images of each car card you create.</p>
                        <div className='flex flex-col mb-8 md:flex-row lg:justify-center'>
                            <a href="/signup" className='text-white bg-black hover:bg-gray-800 dark:text-black dark:bg-white focus:ring-4 focus:ring-blue-300  font-medium rounded text-base px-6 py-2.5 text-center md:mr-5 mb-3 md:mb-0 inline-flex items-center justify-center'>Get Started</a>
                        </div>
                    </div>
                </section>
                <section className='relative flex h-[80dvh] w-full items-center justify-center bg-gradient-to-t from-black/85 to-black/[0.26]'>
                    <img src="main.jpg" alt="" className='absolute left-0 top-0 hidden h-full w-full object-cover md:block' />
                    <div className='absolute flex w-full items-center justify-center max-md:top-[15%] md:bottom-[3%]'>
                        <div className='flex flex-row justify-center gap-2 px-4 md:items-center md:gap-4'>
                            <button className='flex gap-2 rounded-xl border border-white/20 bg-white/[0.25] py-2 pl-2 backdrop-blur-[54px] max-md:flex-col md:items-center md:py-3 md:pl-3 md:pr-12'></button>
                        </div>
                    </div>
                </section>
                <section className='bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-100 dark:border-gray-700'>
                    <div className='max-w-screen-xl px-4 py-8 mx-auto lg:py-24'>
                        <h2 className='mb-6 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-center dark:text-white md:text-4xl'>Demo of the Cards</h2>
                        <p className='mb-10 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-center lg:text-xl lg:px-64 lg:mb-16'>Get started, and build your own car cards</p>
                        <div className='space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 xl:gap-8 sm:space-y-0 md:mt-12'>
                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="/">
                                    <img className="rounded-t-lg" src="img1.jpg" alt="" />
                                </a>
                                <div className="p-5">
                                    <a href="/">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mercedes-benz</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Explore the latest models from Mercedes-Benz, showcasing luxury, performance, and cutting-edge technology.</p>
                                    <a href="https://www.mercedes-benz.co.in/" target='_blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black  rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-white dark:text-black">
                                        Visit
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="/">
                                    <img className="rounded-t-lg" src="img2.jpg" alt="" />
                                </a>
                                <div className="p-5">
                                    <a href="/">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">BMW</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Discover the luxury and engineering excellence of BMW, where innovation meets elegance in every model.</p>
                                    <a href="https://www.bmw.com/en/index.html" target='_blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black  rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-white dark:text-black">
                                        Visit
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="/">
                                    <img className="rounded-t-lg" src="img3.jpg" alt="" />
                                </a>
                                <div className="p-5">
                                    <a href="/">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Aston Martin</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Aston Martin combines performance and sophistication, making every vehicle a masterpiece on the road.</p>
                                    <a href="https://www.astonmartin.com/en" target='_blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black  rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-white dark:text-black">
                                        Visit
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-100 dark:border-gray-700'>
                    <div className='max-w-screen-xl px-4 py-8 mx-auto lg:py-24'>

                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Luxury Cars,</span> better decision.</h1>
                        <p className="mb-4 mt-3 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Have a glimpse about the top three automobile industry companies.</p>

                        <Tabs />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Landing
