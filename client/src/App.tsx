import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from './store'; // Use typed dispatch
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { setTasks } from './features/tasks/taskSlice'; // Import from your slice
import { BiColumns, BiHistory, BiListUl } from 'react-icons/bi';
import InviteForm from './components/InviteForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types/types';

const App: React.FC = () => {
  const dispatch = useAppDispatch(); // Use typed dispatch
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [filter, setFilter] = useState({ type: '', priority: '', people: '' });
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_URL || "https://craftboard-dep.onrender.com";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        console.log('Fetched tasks:', response.data);
        if (!response.data) throw new Error('No tasks found');
        dispatch(setTasks(response.data));
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [dispatch]);

  console.log('Redux tasks:', tasks);
  const filteredTasks = tasks.filter((task: Task) => {
    return (
      (filter.type === '' || task.type === filter.type) &&
      (filter.priority === '' || task.priority === filter.priority) &&
      (filter.people === '' || task.people.includes(filter.people))
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans w-full">
      <header className="flex justify-between items-center p-4 bg-gray-50 shadow-sm">
        <div>
          <span className="text-2xl font-bold text-green-700">Craftboard Project</span>
          <div className="flex gap-3 mt-2">
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md text-sm flex items-center">
              <BiColumns className="mr-1 h-4 w-4 text-gray-600" />
              Kanban
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md text-sm flex items-center">
              <BiHistory className="mr-1 h-4 w-4 text-gray-600" />
              Timeline
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md text-sm flex items-center">
              <BiListUl className="mr-1 h-4 w-4 text-gray-600" />
              List
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-md border-gray-300 text-sm w-48"
          />
          <div className="relative group">
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md text-sm">
              Filter
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden group-hover:block">
              <select
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                className="p-2 w-full border-b"
              >
                <option value="">All Types</option>
                <option value="Dashboard">Dashboard</option>
                <option value="Mobile App">Mobile App</option>
              </select>
              <select
                value={filter.priority}
                onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                className="p-2 w-full border-b"
              >
                <option value="">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="text"
                value={filter.people}
                onChange={(e) => setFilter({ ...filter, people: e.target.value })}
                placeholder="Filter by Person"
                className="p-2 w-full"
              />
            </div>
          </div>
          <InviteForm />
          <button className="px-4 py-2 bg-green-700 text-white rounded-md text-sm">New Task</button>
        </div>
      </header>
      <div className="p-4">
        <TaskForm />
        <TaskList tasks={filteredTasks.filter((t: Task) => !t.isChecked)} category="To-do" />
        <TaskList tasks={filteredTasks.filter((t: Task) => t.isChecked)} category="Completed" />
      </div>
    </div>
  );
};

export default App;
