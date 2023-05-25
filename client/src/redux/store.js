import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "/Users/kajalhamedi/Documents/FoodApp/client/src/redux/features/authSlice";
import TourReducer from "/Users/kajalhamedi/Documents/FoodApp/client/src/redux/features/tourSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
});