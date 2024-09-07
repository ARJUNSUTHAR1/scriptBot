import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import Topbar from './components/Topbar';
import toast from 'react-hot-toast';
// import toast from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { globalLoaderAtom } from '../../store/globalLoader/globalLoaderAtom';
import { userInfoState } from '../../store/user/user';

const Setting = () => {
const user = useRecoilValue(userInfoState)
const [isLoading, setIsLoading] = useRecoilState(globalLoaderAtom)

const [imageurl , setImageurl] = React.useState("")
const [values , setValues] = React.useState({
  botname : "",
  color : "",
  profile_image_url : `${imageurl}`,
  system_prompt : "",
  welcome_message : "",
  client_id : user.id
})

useEffect(() => {
  setValues((prevValues) => ({
    ...prevValues,
    profile_image_url: imageurl,
  }));
}, [imageurl]);
console.log(values)
console.log(imageurl)
console.log(user)

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setValues({
    ...values,
    [name]: value,
  });
};

const handleFile =async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      setIsLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/botprofile/upload-profile-image`, 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(false)
      // Handle the response from the backend
      toast.success(response.data.message)
      console.log('Response from backend:', response.data);
      setImageurl(()=>response.data.url)
      // alert("Training data submitted successfully!");
    } catch (error) {
      // Improved error handling for better feedback
      console.error("Error uploading the image:", error);
    // const selectedFile = e.target.files[0];
    // if (selectedFile) {
      // setImage(selectedFile);
    // } else {
      // throw new Error("file not selected")
    // }
  };}


const createbotprofile = async () => {

    try {
      setIsLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/botprofile/create-botprofile`, 
        values, 
      );
      setIsLoading(false)
      // Handle the response from the backend
      toast.success(response.data.message)
      console.log('Response from backend:', response.data);
      // alert("Training data submitted successfully!");
    } catch (error) {
      // Improved error handling for better feedback
      console.error("Error creating bot-profile:", error);
    // const selectedFile = e.target.files[0];
    // if (selectedFile) {
      // setImage(selectedFile);
    // } else {
      // throw new Error("file not selected")
    // }
  };}
  return (
    <div className="flex" style={{ fontFamily: "Plus Jakarta Sans" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 p-5">
        <Topbar />
        <div className="p-6">
        <div className="mt-6 flex flex-col items-start">
              <h1 className="text-3xl font-bold text-gray-800 uppercase mb-4">
                Customize Setting
              </h1>
              <p className="text-gray-500 mb-6">
                Manage & Customize the initial details of the service .
              </p>
            </div>
        <div className="mx-auto bg-white p-8 rounded-lg shadow-xl">
      {/* <form> */}
      <div className="grid grid-cols-1 gap-6">
  {/* Name */}
  <div className="flex items-center">
    <label className="w-1/4 text-left mr-4 text-gray-600 font-bold">Name</label>
    <input 
      type="text" 
      className="w-3/4 p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
      placeholder="Enter bot name"
      name='botname'
      value={values.botname}
      onChange={handleInputChange}
    />
  </div>

  {/* Color Code */}
  <div className="flex items-center">
    <label className="w-1/4 text-left mr-4 text-gray-600 font-bold">Color Code</label>
    <input 
      type="text" 
      className="w-3/4 p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
      placeholder="#e1e1e1"
      name = "color"
      value={values.color}
      onChange={handleInputChange}
    />
  </div>

  {/* Select Logo with Upload Button */}
  <div className="flex items-center">
    <label className="w-1/4 text-left mr-4 text-gray-600 font-bold">Select Logo</label>
    <div className="w-3/4">
      <button 
        className="p-3 bg-blue-600 text-white font-semibold rounded-md flex items-center justify-center hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => document.getElementById('fileInput').click()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 3a1 1 0 011-1h10a1 1 0 011 1v3a1 1 0 102 0V3a3 3 0 00-3-3H5a3 3 0 00-3 3v12a3 3 0 003 3h5a1 1 0 100-2H5a1 1 0 01-1-1v-4a1 1 0 10-2 0v4a3 3 0 003 3h10a3 3 0 003-3v-3a1 1 0 10-2 0v3a1 1 0 01-1 1H5V3z" clipRule="evenodd" />
        </svg>
        Upload Logo
      </button>
      <input 
        id="fileInput" 
        type="file" 
        className="hidden"
        accept="image/*"
        onChange={handleFile}
      />
      <p className="text-gray-400 mt-2 text-sm">Max Size: 1000kb</p>
    </div>
  </div>

  <div className="flex items-center">
    <label className="w-1/4 text-left mr-4 text-gray-600 font-bold">System Prompt</label>
    <input 
      type="text" 
      className="w-3/4 p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
      placeholder="I Am Lynk , an AI generated model created by Arjun & Mihir , designed to geenrate human-like responses."
      name = "system_prompt"
      value={values.system_prompt}
      onChange={handleInputChange}
    />
  </div>
  <div className="flex items-center">
    <label className="w-1/4 text-left mr-4 text-gray-600 font-bold">Welcome Prompt</label>
    <input 
      type="text" 
      className="w-3/4 p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
      placeholder="I Am Lynk , an AI generated model created by Arjun & Mihir , designed to geenrate human-like responses."
      name='welcome_message'
      value={values.welcome_message}
      onChange={handleInputChange}
    />
  </div>

</div>
        <div className="flex justify-end mt-6">
        <button onClick={()=>{createbotprofile()}} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-400 dark:focus:ring-blue-800 font-bold rounded-lg p-2.5 text-center me-2 text-xl mb-2">Submit</button>
        </div>
      {/* </form> */}
    </div>
        </div>
    </div>
        </div>
    
  );
}

export default Setting;
