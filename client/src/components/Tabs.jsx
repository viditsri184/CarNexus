import React, { useState } from 'react';

function Tabs() {
    // State to track the active tab
    const [activeTab, setActiveTab] = useState("BMW");

    // Function to handle tab switching
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">
                <li className="me-2">
                    <button
                        onClick={() => handleTabClick("BMW")}
                        type="button"
                        className={`inline-block p-4 ${activeTab === "BMW" ? "text-blue-600 dark:text-blue-500" : ""} rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700`}
                    >
                        BMW
                    </button>
                </li>
                <li className="me-2">
                    <button
                        onClick={() => handleTabClick("Mercedes")}
                        type="button"
                        className={`inline-block p-4 ${activeTab === "Mercedes" ? "text-blue-600 dark:text-blue-500" : ""} hover:bg-gray-100 dark:hover:bg-gray-700`}
                    >
                        Mercedes
                    </button>
                </li>
                <li className="me-2">
                    <button
                        onClick={() => handleTabClick("Audi")}
                        type="button"
                        className={`inline-block p-4 ${activeTab === "Audi" ? "text-blue-600 dark:text-blue-500" : ""} hover:bg-gray-100 dark:hover:bg-gray-700`}
                    >
                        Audi
                    </button>
                </li>
            </ul>

            <div>
                {activeTab === "BMW" && (
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
                        <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">BMW's Vision for the Future</h2>
                        <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                            <li>Commitment to sustainability and electric mobility</li>
                            <li>Advanced driver assistance systems</li>
                            <li>State-of-the-art interior and technology integration</li>
                            <li>Premium manufacturing and quality control</li>
                        </ul>
                    </div>
                )}
                {activeTab === "Mercedes" && (
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
                        <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Mercedes-Benz Innovations</h2>
                        <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                            <li>Focus on luxury and comfort</li>
                            <li>Cutting-edge autonomous driving features</li>
                            <li>Electrification across model range</li>
                            <li>Personalized user experience with MBUX</li>
                        </ul>
                    </div>
                )}
                {activeTab === "Audi" && (
                    <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
                        <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Audi's Technological Edge</h2>
                        <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                            <li>Quattro all-wheel drive technology</li>
                            <li>Commitment to electric and hybrid vehicles</li>
                            <li>High-performance models with cutting-edge engineering</li>
                            <li>Innovative lighting and digital technology</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;
