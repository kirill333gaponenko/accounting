import {createAsyncThunk} from "@reduxjs/toolkit";
import {base_url, createToken} from "../../utils/constants.ts";
import type {UserData, UserProfile, UserRegister} from "../../utils/type";
import type {RootState} from "../../app/store.ts";

export const registerUser = createAsyncThunk(
    'user/register',
    async (user:UserRegister) =>{
        const response = await fetch(`${base_url}/account/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        if(response.status===401){
            throw new Error(`User ${user.login} already exists`)
        }
        if(!response.ok){
            throw new Error(`Failed to register user ${user.login}`)
        }

        const data = await response.json();
        const token = createToken(user.login,user.password)
        return{
            user:data,
            token
        }
    }
)

export const fetchUser =createAsyncThunk(
    'user/fetch',
    async (token:string)=>{
        const response = await fetch(`${base_url}/account/login`,{
            method:'POST',
            headers:{
                Authorization:token
            }
        })
        if(response.status===401){
            throw new Error(`Invalid credentials`)
        }
        if(!response.ok){
            throw new Error(`something went wrong`)
        }

        const data = await response.json();
        return{
            user:data,
            token
        }
    }
)


type UserUpdate = Omit<UserData,'login'>


export const updateUser =createAsyncThunk<UserProfile,UserUpdate,{state:RootState}>(
    'user/update',

    async (user,{getState}) =>{
        const response = await fetch(`${base_url}/account/user/${getState().user.login}`,{
            method:'PATCH',
            headers:{
                Authorization:`${getState().token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        if(response.status===401){
            throw new Error(`Invalid credentials`)
        }
        if(!response.ok){
            throw new Error(`Something went wrong`)
        }

        return await response.json()
    }
)

export const changePassword = createAsyncThunk<string, { newPassword:string, oldPassword:string },{state:RootState}>(
    'user/password',
    async ({newPassword,oldPassword},{getState}) => {
        const response =await fetch(`${base_url}/account/password`, {
            method: 'PATCH',
            headers: {
                Authorization:createToken(getState().user.login,oldPassword),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: newPassword
            })
        })
        if(response.status===401){
            throw new Error(`Invalid credentials`)
        }
        if(!response.ok){
            throw new Error(`Something went wrong`)
        }

        return createToken(getState().user.login,newPassword)

    }
)
