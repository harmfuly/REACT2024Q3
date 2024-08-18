import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  picture: string;
  country: string;
}


interface FormState {
  formData: FormData[];
}


const initialState: FormState = {
  formData: []
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitForm(state, action: PayloadAction<FormData>) {
      state.formData.push(action.payload);
    },
  },
});


export const { submitForm } = formSlice.actions;
const rootReducer = formSlice.reducer;


export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
