import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Spinner } from '@nextui-org/react';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../store/user/user';
import { GetCurrentUser } from '../api/user';

const PrivateRoute = ({ children }) => {

    const [user, setUser] = useRecoilState(userInfoState);

    const navigate = useNavigate();

    const validateToken = async () => {
        try {
            const response = await GetCurrentUser();
            console.log(response);
            if (response.success) {
                setUser(response.data); // Set the user in the Recoil atom
            } else {
                if (response.message === "jwt expired") {
                    // Remove the token from localStorage
                    localStorage.removeItem("Token");
                    // Redirect to login
                    navigate("/login");
                } else {
                    // Handle other errors
                    localStorage.removeItem("Token");
                    navigate("/login");
                    console.log(response.message);
                }
            }
        } catch (error) {
            // Remove the token from localStorage
            localStorage.removeItem("Token");
            navigate("/login");
            console.log(error.message);
        }
    }



    useEffect(() => {
        if (localStorage.getItem("Token")) {
            validateToken();
        } else {
            toast.error("You are unauthorised to use this Website , Login to proceed");
            navigate("/login")
        }

    }, []);

    return (
        <>
            {user ? (
                <div className=''>
                    {children}
                </div>
            ) : (
                <div className="fixed backdrop-blur-sm z-[9999999] h-screen w-screen flex justify-center items-center">
                    <Spinner size='md' color="current" />
                </div>
            )
            }
        </>
    )
}


export default PrivateRoute;
