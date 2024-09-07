import React, { useRef, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { useRecoilState } from "recoil";
import { globalLoaderAtom } from "../../store/globalLoader/globalLoaderAtom";

const Training = () => {
  const [isLoading, setIsLoading] = useRecoilState(globalLoaderAtom)
  const [trainingName, setTrainingName] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      throw new Error("file not selected")
    }
  };

  const handleSubmit = async () => {
    if (!trainingName || !file) {
      alert("Please provide a training name and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("training_name", trainingName);
    formData.append("client_id", "6377360829");  // Replace with actual client ID
    formData.append("file", file);

    try {
      setIsLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/training/create-training`, 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(false)
      // Handle the response from the backend
      console.log('Response from backend:', response.data);
      // alert("Training data submitted successfully!");
    } catch (error) {
      // Improved error handling for better feedback
      console.error("Error submitting the form:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Submission failed.'}`);
      } else {
        alert('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="flex" style={{ fontFamily: "Plus Jakarta Sans" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 p-5">
        <Topbar />
        <div className="p-6">
          <div className="mt-6 flex">
            <h1 className="text-3xl font-bold text-gray-800 uppercase mb-4">
              Training Data
            </h1>
          </div>
          <div className="flex">
            <p className="text-gray-500 mb-6">
              Your personal AI content training for domain is completed
            </p>
          </div>
        </div>
        <div className="w-full shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Paste your URL here or upload a PDF/TXT"
              className="flex-grow p-2 border border-gray-300 rounded-md"
              value={file ? file.name : ""}
              readOnly // Prevent manual edits
            />
            <button
              type="button"
              onClick={handleClick}
              className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-md border border-blue-300 hover:bg-blue-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5V21h5.5M16.5 3H21v5.5M12 8.5v7m0 0l3.5-3.5m-3.5 3.5L8.5 12"
                />
              </svg>
            </button>
            <input
              type="file"
              className="hidden"
              ref={fileRef}
              onChange={handleFile}
            />
            <input
              type="text"
              placeholder="Training Name"
              className="flex-grow p-2 border border-gray-300 rounded-md"
              value={trainingName}
              onChange={(e) => setTrainingName(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;