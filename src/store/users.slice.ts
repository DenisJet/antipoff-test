import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../helpers/API';
import { UserCardProps } from '../components/UserCard/UserCard';
import { loadState } from '../helpers/localStorage';

export const LIKES_PERSISTENT_STATE = 'likes';

interface UsersState {
  users: UserCardProps[];
  status: string;
  page: number;
  likes: number[];
}

const initialState: UsersState = {
  users: [],
  status: '',
  page: 1,
  likes: loadState(LIKES_PERSISTENT_STATE) ?? [],
};

export const getUsers = createAsyncThunk('users/getUsers', async (page: string) => {
  const res = await fetch(`${BASE_URL}/api/users?page=${page}&per_page=8&total_pages=${page}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((e) => e.json());

  return res;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state) => {
      state.page = 2;
    },
    setLike: (state, action) => {
      const existed = state.likes.find((i) => i === action.payload);
      if (!existed) {
        state.likes.push(action.payload);
        return;
      }

      if (existed) {
        const existedIndex = state.likes.indexOf(existed);
        state.likes.splice(existedIndex, 1);
        return;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = state.users.concat(
        action.payload.filter((obj: UserCardProps) => !state.users.find((o) => o.id === obj.id))
      );
      state.status = 'success';
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default usersSlice.reducer;
export const usersActions = usersSlice.actions;
