import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import bookReducer from '../features/books/booksSlice'
import barrowReducer from '../features/barrows/barrowsSlice'
import memberReducer from '../features/member/membersSlice'
import departmentReducer from '../features/department/departmentSlice'

export const store = configureStore({
  reducer: {
    auth : authReducer,
    books : bookReducer, 
    barrows : barrowReducer,
    members : memberReducer,
    departments : departmentReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
