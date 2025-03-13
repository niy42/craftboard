import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setTasks } from './features/tasks/taskSlice';
import { BiColumns, BiHistory, BiListUl } from 'react-icons/bi';
import InviteForm from './components/InviteForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types/types';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [filter, setFilter] = useState({ type: '', priority: '', people: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For mobile filter toggle
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://craftboard-dep.onrender.com';

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

  const filteredTasks = tasks.filter((task: Task) =>
    (filter.type === '' || task.type === filter.type) &&
    (filter.priority === '' || task.priority === filter.priority) &&
    (filter.people === '' || task.people.includes(filter.people))
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-gray-100 text-gray-800">
      <header className="sticky top-0 z-10 flex flex-col sm:flex-row items-center justify-between px-4 py-4 bg-white shadow-md">
        <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0 w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-teal-600 tracking-tight">Craftboard</h1>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {[
              { icon: BiColumns, label: 'Kanban' },
              { icon: BiHistory, label: 'Timeline' },
              { icon: BiListUl, label: 'List' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center px-2 py-1 text-xs sm:text-sm text-gray-600 bg-white rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200 shadow-sm"
              >
                <Icon className="w-4 h-4 mr-1" />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search tasks..."
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm w-full sm:w-56 transition-all duration-200"
          />
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center w-full sm:w-auto px-3 py-2 text-sm text-gray-600 bg-white rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200 shadow-sm"
            >
              Filter
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`${isFilterOpen ? 'block' : 'hidden'
                } sm:absolute sm:right-0 mt-2 w-full sm:w-64 p-4 bg-white border border-gray-200 rounded-xl shadow-lg sm:transition-all sm:duration-200 z-10`}
            >
              <select
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                className="w-full p-2 mb-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
              >
                <option value="">All Types</option>
                <option value="Dashboard">Dashboard</option>
                <option value="Mobile App">Mobile App</option>
              </select>
              <select
                value={filter.priority}
                onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                className="w-full p-2 mb-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
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
                placeholder="Filter by person"
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
              />
            </div>
          </div>
          <InviteForm />
          <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-md">
            + New Task
          </button>
        </div>
      </header>

      <main className="max-w-7xl space-y-4 mx-auto p-4 sm:p-6">
        <TaskForm />
        <div className="space-y-6 sm:space-y-8">
          <TaskList tasks={filteredTasks.filter((t: Task) => !t.isChecked)} category="To-do" />
          <TaskList tasks={filteredTasks.filter((t: Task) => t.isChecked)} category="Completed" />
        </div>
      </main>
    </div>
  );
};

export default App;