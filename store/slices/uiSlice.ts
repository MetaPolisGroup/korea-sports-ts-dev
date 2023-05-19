import { createSlice } from "@reduxjs/toolkit";

export interface UISlice {
  status: string;
  title: string;
  isShow: boolean;
  isConfirm: boolean;
  message: string;
}

const initialState: UISlice = {
  status: "error",
  title: "",
  isShow: false,
  isConfirm: false,
  message: "",
};

const UISlice = createSlice({
  name: "UI",
  initialState: initialState,
  reducers: {
    setShowModal(state, action) {
      state.isShow = action.payload;
    },

    setMessage(state, action) {
      state.message = action.payload;
    },

    setConfirm(state, action) {
      state.isConfirm = action.payload;
    },

    setShowNotificationAlert(state, action) {
      const { status, title, message, isShow } = action.payload;
      state.status = status;
      state.title = title;
      state.message = message;
      state.isShow = isShow;
    },

    setDisableShowNotificationAlert(state) {
      state.status = "error";
      state.title = "";
      state.message = "";
      state.isShow = false;
    },
  },
});

export const {
  setShowModal,
  setMessage,
  setConfirm,
  setShowNotificationAlert,
  setDisableShowNotificationAlert,
} = UISlice.actions;

export default UISlice.reducer;
