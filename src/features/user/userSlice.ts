import {createSlice} from "@reduxjs/toolkit";
import type {UserProfile} from "../../utils/type";
import {fetchUser, registerUser, updateUser} from "../api/accountingApi.ts";

const initialState = {} as UserProfile

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        changeFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        changeLastName: (state, action) => {
            state.lastName = action.payload;
        },
        clearUser: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (_state, action) =>action.payload.user)
            .addCase(fetchUser.fulfilled, (_state, action) =>action.payload.user)
            .addCase(updateUser.fulfilled, (state, action) =>{
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            })
    }
})

export const { changeFirstName,changeLastName,clearUser } = userSlice.actions;
export default userSlice.reducer