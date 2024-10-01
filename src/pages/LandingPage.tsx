import { Button, Typography } from "@mui/material"

import skimg from "../assets/superkanbanimg.png";
import LoginForm from "../components/forms/LoginForm";
import { useState } from "react";
import SignupForm from "../components/forms/SignupForm";

const LandingPage = () => {

    const [signup, setSignup] = useState(false);

    return (
        <div className="grid grid-cols-[5fr_2fr] h-screen">
            <div className=" bg-mainBackgroundColor">
                <div>
                    <Typography variant="h1" padding={'.25em'}>SuperKanban</Typography>
                </div>
                <div className="p-10">
                    <img className="absolute w-[40%] top-40 border-2 -rotate-6 border-slate-900 rounded-lg" src={skimg} alt="SuperKanban" />
                    <img className="absolute w-[40%] top-72 left-[30%] border-2 rotate-6 border-slate-900 rounded-lg" src={skimg} alt="SuperKanban" />
                    <img className="absolute w-[40%] top-[55%] left-[10%] border-2 border-slate-900 rounded-lg" src={skimg} alt="SuperKanban" />
                </div>
            </div>
            <div className="p-5 bg-taskBackgroundPrimary">
                <div className="relative top-[15%] flex flex-col gap-5">
                    {signup ? <SignupForm /> : <LoginForm />}
                    <div>
                        {signup ? <Typography fontSize={'1.2em'} className="text-center text-white">
                            Already have an account? <Button onClick={() => setSignup(prev => !prev)} variant="outlined" sx={{textTransform: 'none'}}><span className="text-pink-600">Sign Up</span></Button> now
                        </Typography> :
                        <Typography fontSize={'1.2em'} className="text-center text-white">
                            Don't have an account yet? <Button onClick={() => setSignup(prev => !prev)} variant="outlined" sx={{textTransform: 'none'}}><span className="text-pink-600">Login</span></Button> now
                        </Typography>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage