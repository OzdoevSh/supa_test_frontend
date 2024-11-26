/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FormFieldState {
  user: string
  repo: string
}

const initialState: FormFieldState = {
  user: '',
  repo: '',
};

const formSlice = createSlice({
  name: 'formFields',
  initialState,
  reducers: {
    updateFormFields(state, action: PayloadAction<FormFieldState>) {
      state.user = action.payload.user;
      state.repo = action.payload.repo;
    },
  },
});

export const { updateFormFields } = formSlice.actions;

export const formReducer = formSlice.reducer;
