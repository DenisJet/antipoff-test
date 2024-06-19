import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../helpers/API';
import { loadState } from '../helpers/localStorage';

export const AUTH_PERSISTENT_STATE = 'auth';

export interface AuthPersistentState {
  token: string | null;
}

export interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: loadState<AuthPersistentState>(AUTH_PERSISTENT_STATE)?.token ?? null,
};

interface UserData {
  email: string;
  password: string;
}

export const register = createAsyncThunk('auth/register', async (values: UserData) => {
  const token = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .catch((e) => e.json());

  console.log(token);

  return await token;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.token = action.payload.token;
    });

    builder.addCase(register.rejected, () => {});
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
