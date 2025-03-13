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

  const API_BASE_URL = process.env.REACT_APP_API_URL || "https://craftboard-dep.onrender.com";

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
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <input
        type="text"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        placeholder="Task Name"
        className="mb-2 p-2 border rounded w-full"
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        value={task.estimation}
        onChange={(e) => setTask({ ...task, estimation: e.target.value })}
        placeholder="Start Date - Due Date"
        className="mb-2 p-2 border rounded w-full"
      />
      <select
        value={task.type}
        onChange={(e) => setTask({ ...task, type: e.target.value })}
        className="mb-2 p-2 border rounded w-full"
      >
        <option value="Dashboard">Dashboard</option>
        <option value="Mobile App">Mobile App</option>
      </select>
      <input
        type="text"
        value={task.people.join(', ')}
        onChange={(e) => setTask({ ...task, people: e.target.value.split(', ') })}
        placeholder="Assigned People (e.g., AL, DT)"
        className="mb-2 p-2 border rounded w-full"
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value as 'Low' | 'Medium' | 'High' })}
        className="mb-2 p-2 border rounded w-full"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-green-700 text-white rounded">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
