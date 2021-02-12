import React from 'react';
import {Button} from "@material-ui/core"
import {useSelector,useDispatch} from "react-redux";
import Style from "./Login.module.css"

import {
    editUsername,
    editPassword,
    toggleMode,
    fetchAsyncLogin,
    fetchAsyncProf,
    fetchAsyncRegister,selectAuthen,
    selectIsLoginView,selectProfile
} from "./loginSlice"

const Login:React.FC = () => {
    const dispatch = useDispatch()
    const authen = useSelector(selectAuthen)
    const isLoginView =useSelector(selectIsLoginView)
    const btnDisabler = authen.username === "" || authen.password==="";
    const login = async()=>{
        if(isLoginView){
            // @ts-ignore
            await dispatch(fetchAsyncLogin(authen));
        }else{
            // @ts-ignore
            const result = await dispatch(fetchAsyncRegister(authen));
            if(fetchAsyncRegister.fulfilled.match(result)){
                // @ts-ignore
                await dispatch(fetchAsyncLogin(authen))
            }
        }
    }
    return (
        <div className={Style.containerLogin}>
            <div className="Style.appLogin">
                <h1>{isLoginView ? "Login":"Register"}</h1>
                <span>Username</span>
                <input type="text"
                className={Style.inputLog}
                       name="username"
                       placeholder=""
                       onChange={(e)=>dispatch((editUsername(e.target.value)))}
                       required
                />
                <span>Password</span>
                <input type="text"
                       className={Style.inputLog}
                       name="password"
                       placeholder=""
                       onChange={(e)=>dispatch((editPassword(e.target.value)))}
                       required
                />
                <div className={Style.switch}>
                    <Button
                    variant="contained"
                    disabled={btnDisabler}
                    color="primary"
                    onClick={login}
                    >{isLoginView ? "Login":"Create"}</Button>
                </div>
                <span
                className={Style.switchText}
                onClick={()=>dispatch(toggleMode())}
                >
                    {isLoginView ? "Create Account": "Back to Login"}
                </span>
            </div>
        </div>
    );
};

// @ts-ignore
export default Login;