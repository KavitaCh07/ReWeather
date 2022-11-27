import { createSlice } from "@reduxjs/toolkit";
import { log } from "console";
//createAsyncThunk helps in creating async functions (it take 2 parameters 1.actionType and 2. action which makes call to external api)
//create action function now
//payload is data which we are sending to api

export interface CounterState {
    place: string;
    favourites: any;
}

const initialState = {
    place: [],
    favourites: JSON.parse(localStorage.getItem("fav") || "[]"),
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        AddPlace: (state: any, action: any) => {
            state.place = action.payload;
            // console.log("2", state.place)
        },

        AddFovourites: (state: any, { payload }) => {
            state.favourites.push(payload);
            localStorage.setItem("fav", JSON.stringify(state.favourites));
            window.location.reload();
        }
    },
    // extraReducers: {
    //     [getWeatherData.fulfilled]: (state : any, action: any) =>{
    //         return action.payload.weather;
    //     }
    // }
});

export const { AddPlace, AddFovourites } = weatherSlice.actions;
export default weatherSlice.reducer;