import React, { useState } from 'react';
import disasterSafetyPrecautions from '../utilities/disasterSafetyPrecautions'; // Import the updated data

export default function SideBar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white transition-transform transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
                <div className="flex items-center justify-between p-4 bg-gray-600">
                    <button className="text-2xl cursor-pointer md:hidden" onClick={toggleSidebar}>X</button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4">
                        {Object.keys(disasterSafetyPrecautions).map((item) => (
                            <div key={item} className="mb-2 cursor-pointer flex items-center p-2 hover:bg-gray-700 rounded" onClick={() => handleItemClick(item)}>
                                <span className="mr-2">{item.charAt(0).toUpperCase() + item.slice(1).replace(/([A-Z])/g, ' $1').trim()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 h-[160vh] bg-gray-800 transition-all duration-300 ${isSidebarVisible ? 'ml-64' : 'ml-0'} md:ml-64`}>
                <div className="p-4 text-white">
                    {/* Always visible toggle icon */}
                    <button className={`text-2xl text-white cursor-pointer md:hidden ${isSidebarVisible ? 'hidden' : 'block'}`} onClick={toggleSidebar}>☰</button>
                    {/* Main content area */}
                    <div className="p-4">
                        {selectedItem ? (
                            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                                <h2 className="text-xl mb-2">{selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1).replace(/([A-Z])/g, ' $1').trim()}</h2>
                                <p className="mb-4">{disasterSafetyPrecautions[selectedItem]?.description}</p>
                                <h3 className="text-lg mb-2">Safety Precautions:</h3>
                                <div>
                                    <h4 className="font-semibold">Before:</h4>
                                    <ul className="list-disc pl-5 mb-4">
                                        {disasterSafetyPrecautions[selectedItem]?.safetyPrecautions?.before.map((precaution, index) => (
                                            <li key={index} className="mb-2">{precaution}</li>
                                        ))}
                                    </ul>
                                    <h4 className="font-semibold">During:</h4>
                                    <ul className="list-disc pl-5 mb-4">
                                        {disasterSafetyPrecautions[selectedItem]?.safetyPrecautions?.during.map((precaution, index) => (
                                            <li key={index} className="mb-2">{precaution}</li>
                                        ))}
                                    </ul>
                                    <h4 className="font-semibold">After:</h4>
                                    <ul className="list-disc pl-5 mb-4">
                                        {disasterSafetyPrecautions[selectedItem]?.safetyPrecautions?.after.map((precaution, index) => (
                                            <li key={index} className="mb-2">{precaution}</li>
                                        ))}
                                    </ul>
                                </div>
                                <h3 className="text-lg mb-2">Education:</h3>
                                <ul className="list-disc pl-5 mb-4">
                                    {disasterSafetyPrecautions[selectedItem]?.education.map((fact, index) => (
                                        <li key={index} className="mb-2">{fact}</li>
                                    ))}
                                </ul>
                                <h3 className="text-lg mb-2">FAQs:</h3>
                                <div className="max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-hidden">
                                    {disasterSafetyPrecautions[selectedItem]?.faqs.map((faq, index) => (
                                        <div key={index} className="mb-4">
                                            <h4 className="font-semibold mb-1">{faq.question}</h4>
                                            <p>{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p>Select an item to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
