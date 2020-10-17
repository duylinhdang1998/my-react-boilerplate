import counterReducer from '@containers/Home/slices/counterSlice';
import todoListReducer from '@containers/Home/slices/todolistSlice';

const reducers = {
  counter: counterReducer,
  todolist: todoListReducer,
};

export default reducers;
