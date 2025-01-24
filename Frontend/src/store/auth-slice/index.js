import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuth : false,
    isLoading : false,
    user : null
};

export const registerUser = createAsyncThunk("/auth/register",
    async(formData,{rejectWithValue})=>{
        try{
        const response = await axios.post("http://localhost:7000/api/auth/register",formData,{
            withCredentials : true
        });
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);   //Automatically handled in "rejected"
    }

    }
)


const authSlice = createSlice({
    name : "auth",
    initialState ,
    reducers :{
        setUser:(state,action)=>{},

    },
    extraReducers :(builder) =>{
        builder.addCase(registerUser.pending , (state)=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuth= false;
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
            state.user = null,
            state.error = action.payload; // This contains the error message
          });

    }
});

export const  {setUser} = authSlice.actions;
export default authSlice.reducer;