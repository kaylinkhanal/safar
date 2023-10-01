import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  vehicleDetails: {
    vehicleType: "",
    pricePerKm: 0,
    basePrice: 0,
    iconUrl: "",
  },
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    editVehicleDetails: (state, action) => {
      state.vehicleDetails = action.payload;
    },
  },
});

export const { editVehicleDetails } = vehicleSlice.actions;
export default vehicleSlice.reducer;
