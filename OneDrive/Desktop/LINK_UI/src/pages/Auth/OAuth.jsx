import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import { Loginuser } from '../../api/user';
import toast from 'react-hot-toast';


const OAuth = () => {
    // const setAuthToken = useSetRecoilState(authTokenState);
    // const setUserInfo = useSetRecoilState(userInfoState);

    const navigate = useNavigate();


    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const user = result.user;

                const Token = await Loginuser({"email" : user.email});
                if(Token.token){
                    localStorage.setItem('Token', Token.token);
                }
            navigate("/");
  

        } catch (error) {
            toast.error("You are unauthorised to use this Website , Login to proceed")
            console.log('Could not sign in with Google', error);
        }
    };

    return (
        <div className="w-full mt-14">
        <button
          className="w-full font-bold shadow-md rounded-2xl py-3 bg-black text-white text-lg lg:text-xl transition hover:bg-gray-700"
          onClick={handleGoogleClick}
          type="button"
        >
          <span className="flex items-center justify-center text-xl font-medium">
            <FaGoogle className="mr-3" />
            Continue With Google
          </span>
        </button>
      </div>
    );
};

export default OAuth;
