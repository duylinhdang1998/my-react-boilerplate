import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createDispatchAction } from '@utils/functions/reduxActions';

export interface TodolistItem {
  id: string;
  text: string;
}

interface TodoListState {
  data: TodolistItem[];
  status: ReducerStatus | '';
  msg?: string;
}

const initialState: TodoListState = {
  status: '',
  data: [],
  msg: '',
};

const todoListSlice = createSlice({
  name: '@todolist',
  initialState,
  reducers: {
    getTodolistRequest: (state, action: PayloadAction<{ endpoint: string }>) => {
      state.status = 'loading';
    },
    getTodolistSuccess: (state, action: PayloadAction<{ data: TodolistItem[] }>) => {
      state.status = 'success';
      state.data = action.payload.data;
    },
    getTodoListFailure: (state, action: PayloadAction<{ msg: string }>) => {
      state.status = 'failure';
      state.msg = action.payload.msg;
    },
  },
});

export const { getTodoListFailure, getTodolistRequest, getTodolistSuccess } = todoListSlice.actions;

export const useGetTodoList = createDispatchAction(getTodolistRequest);
const todoListReducer = todoListSlice.reducer;
export default todoListReducer;
