/* eslint-disable node/no-unsupported-features/es-syntax */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index'; // 假设你有一个 store.ts 文件导出 RootState 类型

// 定义 CommonSnackbar 的类型
interface CommonSnackbar {
  severity: 'error' | 'info' | 'success' | 'warning';
  message: string;
  duration: number;
  open: boolean;
}

// 定义初始状态的类型
interface AppState {
  commonSnackbar: CommonSnackbar;
}

const initialState: AppState = {
  commonSnackbar: {
    severity: 'success',
    message: '',
    duration: 100000,
    open: false,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCommonSnackbar: (state, action: PayloadAction<Partial<CommonSnackbar>>) => {
      state.commonSnackbar = { ...state.commonSnackbar, ...action.payload };
    },
  },
});

export const selectApp = (state: RootState) => state.app;

export const { setCommonSnackbar } = appSlice.actions;

export default appSlice.reducer;