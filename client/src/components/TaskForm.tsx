import React, { useState } from 'react';
import { useAppDispatch } from '../store';
import { addTask } from '../features/tasks/taskSlice';
import axios from 'axios';

const TaskForm: React.FC = () => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    estimation: '',
    type: 'Dashboard',
    people: [] as string[],
    priority: 'Medium',
    isChecked: false,
  });

  const dispatch = useAppDispatch();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://craftboard-dep.onrender.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, task);
      if (response.data && response.data.id) {
        dispatch(addTask(response.data));
      } else {
        console.error('Task creation failed: No ID in response');
      }
      setTask({
        name: '',
        description: '',
        estimation: '',
        type: 'Dashboard',
        people: [],
        priority: 'Medium',
        isChecked: false,
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-md rounded-lg w-full max-w-3xl mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Create a New Task</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          placeholder="Task Name"
          className="p-3 border rounded w-full"
        />

        <input
          type="text"
          value={task.estimation}
          onChange={(e) => setTask({ ...task, estimation: e.target.value })}
          placeholder="Start Date - Due Date"
          className="p-3 border rounded w-full"
        />
      </div>

      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
        className="mt-4 p-3 border rounded w-full"
        rows={3}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <select
          value={task.type}
          onChange={(e) => setTask({ ...task, type: e.target.value })}
          className="p-3 border rounded w-full"
        >
          <option value="Dashboard">Dashboard</option>
          <option value="Mobile App">Mobile App</option>
        </select>

        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value as 'Low' | 'Medium' | 'High' })}
          className="p-3 border rounded w-full"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <input
        type="text"
        value={task.people.join(', ')}
        onChange={(e) => setTask({ ...task, people: e.target.value.split(', ') })}
        placeholder="Assigned People (e.g., AL, DT)"
        className="mt-4 p-3 border rounded w-full"
      />

      <button
        type="submit"
        className="w-full mt-6 p-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
