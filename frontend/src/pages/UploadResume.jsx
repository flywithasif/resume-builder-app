import React, { useRef } from 'react';

export default function UploadResume() {
  // useRef hook का उपयोग फाइल इनपुट एलिमेंट को एक्सेस करने के लिए
  const fileInputRef = useRef(null);

  // जब "Choose File" बटन पर क्लिक किया जाता है तो यह फ़ंक्शन इनपुट को ट्रिगर करता है
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // जब कोई फाइल चुनी जाती है तो यह फ़ंक्शन कॉल होता है
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // आप यहां फाइल को प्रोसेस कर सकते हैं, जैसे इसे सर्वर पर अपलोड करना
      // या इसे state में स्टोर करना
      alert(`File "${file.name}" selected!`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
        <p className="text-gray-600">This is the page where you can upload your existing resume.</p>
        
        {/* इनपुट फ़ील्ड जो छिपा हुआ है लेकिन बटन क्लिक होने पर ट्रिगर होता है */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx" // केवल इन फाइल एक्सटेंशन की अनुमति है
        />

        {/* बटन जो इनपुट फ़ील्ड को ट्रिगर करता है */}
        <button 
          onClick={handleButtonClick} 
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Choose File
        </button>
      </div>
    </div>
  );
}
