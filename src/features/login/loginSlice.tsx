import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {
    loginType,
    authenType,
    profileType,
    JWT
} from "../../types/type.js";
import {RootState} from "../../app/store";


const apiUrl = "http://localhost:8000/"
const token = localStorage.localJWT;

export const fetchAsyncLogin = createAsyncThunk("login/post", async (auth:authenType) => {
    const res = await axios.post(`${apiUrl}authen/jwt/create/`, auth, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data
})

export const fetchAsyncRegister = createAsyncThunk("login/register", async (auth:authenType) => {
    const res = await axios.post<profileType>(`${apiUrl}api/register/`, auth, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data
})

export const fetchAsyncProf = createAsyncThunk("login/get", async () => {
    const res = await axios.get<profileType>(`${apiUrl}api/myself/`, {
        headers: {
            Authorization: `JWT ${token}`
        },
    });
    return res.data
})

const initialState: loginType = {
    authen: {
        username: "",
        password: "",
    },
    isLoginView: true,
    profile: {
        id: 0,
        username: ""
    }
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        editUsername(state, action:PayloadAction<string>) {
            state.authen.username = action.payload
        },
        editPassword(state, action:PayloadAction<string>) {
            state.authen.password = action.payload
        },
        toggleMode(state) {
            state.isLoginView = !state.isLoginView
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchAsyncLogin.fulfilled, (state, action:PayloadAction<JWT>) => {
            localStorage.setItem("localJWT", action.payload.access);
            action.payload.access && (window.location.href = "/tasks")
        })
        builder.addCase(fetchAsyncProf.fulfilled, (state, action:PayloadAction<profileType>) => {
            state.profile = action.payload;
        })
    })
})

export const {editUsername, editPassword, toggleMode} = loginSlice.actions
export const selectAuthen = (state :RootState) => state.login.authen;
export const selectIsLoginView = (state: RootState) => state.login.isLoginView;
export const selectProfile = (state: RootState) => state.login.profile;

export default loginSlice.reducer