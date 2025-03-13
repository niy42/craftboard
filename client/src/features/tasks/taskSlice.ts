import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/types';

const initialState: { tasks: Task[] } = { tasks: [] };

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      console.log('Updating Redux state with tasks:', action.payload);
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      console.log('Adding new task:', action.payload);
      state.tasks.push(action.payload);
    },
  },
});

export const { setTasks, addTask } = taskSlice.actions;
export default taskSlice.reducer;
