import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/src/store';

interface UserState {
  me_result: {
    userId: string;
  } | null;
  profile_result: null;
}

const initialState: UserState = {
  me_result: null,
  profile_result: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserStore(
      state,
      action: PayloadAction<{
        me_result?: UserState['me_result'];
        profile_result?: UserState['profile_result'];
      }>,
    ) {
      if (action.payload.me_result) {
        state.me_result = action.payload.me_result;
      }
      if (action.payload.profile_result) {
        state.profile_result = action.payload.profile_result;
      }
    },
    clearUserStore(state) {
      state.me_result = null;
      state.profile_result = null;
    },
  },
});

export const { setUserStore, clearUserStore } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.login_result;
export const selectProfile = (state: RootState) => state.user.profile_result;

export default userSlice.reducer;