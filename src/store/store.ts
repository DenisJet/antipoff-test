import { configureStore } from '@reduxjs/toolkit';
import usersSlice, { LIKES_PERSISTENT_STATE } from './users.slice';
import authSlice, { AUTH_PERSISTENT_STATE } from './auth.slice';
import { saveState } from '../helpers/localStorage';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    auth: authSlice,
  },
});

store.subscribe(() => {
  saveState({ token: store.getState().auth.token }, AUTH_PERSISTENT_STATE);
  saveState(store.getState().users.likes, LIKES_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
