import { db } from "@/helpers/db-config";
import authApi, { IRequest } from "@/services/authApi";
import axiosClient from "@/services/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { clearAccessToken, setAccessToken } from "./tokenSlice";

export interface TUserProfile {
  token: string | null;
  id: string | null;
  nickname: string;
  level: number;
  point: number;
  balance: number;
  last_login_at: number;
  status: string;
}

const initialState: TUserProfile = {
  token: "",
  id: "",
  nickname: "",
  level: 0,
  balance: 0,
  point: 0,
  last_login_at: 0,
  status: "idle",
};

export const Me = createAsyncThunk(
  "users/me",
  async (
    value: {
      id: string;
      lastLoginAt: number;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const q = query(collection(db, "users"), where("id", "==", value.id));
      let data: TUserProfile | DocumentData | any = undefined;

      onSnapshot(q, async (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data();
        });
        dispatch(setUser(data));
        // if (data && data.last_login === value.lastLoginAt) {
        //   authApi.pay(value.id)
        // } else {
        //   dispatch(clearAccessToken())
        //   dispatch(clearDataUser())
        //   window.location.replace('/')
        // }
      });
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const Login = createAsyncThunk(
  "users/login",
  async (
    data: {
      id: string;
      password: string;
    },
    thunkAPI
  ) => {
    const res = await authApi
      .login({ ...data })
      .then((dataReturn) => {
        if (dataReturn === undefined) {
          return window.location.replace("/?LoginStatus=FAIL");
        }
        thunkAPI.dispatch(setAccessToken(dataReturn.token));
        return dataReturn;
      })
      .catch((err) => {
        thunkAPI.rejectWithValue(err);
        return err
      });
    return res
  }
);

export const Register = createAsyncThunk(
  "users/register",
  async (data: IRequest, thunkAPI) => {
    try {
      const response = await authApi.register({ ...data });
      thunkAPI.dispatch(setAccessToken(response.token));
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const ComfirmCodeRegistration = createAsyncThunk(
  "user/confirm-registration",
  async (subCode: { subCode: string | undefined }, thunkAPI) => {
    try {
      const response = await authApi.confirmCode(subCode);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const userSlipSlice = createSlice({
  name: "userSlipSlice",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = { ...state, ...action?.payload });
    },

    clearDataUser: (state) => {
      return (state = initialState);
    },

    setBalance: (state, action) => {
      state.balance -= action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(Login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(Login.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(Register.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(Register.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(ComfirmCodeRegistration.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(ComfirmCodeRegistration.fulfilled, (state) => {
      state.status = "idle";
    });
  },
});

export const { setUser, clearDataUser, setBalance } = userSlipSlice.actions;
export default userSlipSlice.reducer;
