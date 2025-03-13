import React from 'react';
import { Task } from '../types/types';
import Avatar from 'react-avatar';
import {
  BiRefresh,
  BiMenu,
  BiCalendar,
  BiFlag,
  BiDotsVerticalRounded
} from 'react-icons/bi';
import { MdDevices } from 'react-icons/md';
import { FaTabletAlt, FaMobileAlt, FaUsers } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface TaskListProps {
  tasks: Task[];
  category: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, category }) => {
  const toggleTaskStatus = (task: Task) => {
    console.log('Toggling status for task:', task.id);
  };

  const getProgress = (task: Task) => {
    return task.isChecked ? 100 : Math.floor(Math.random() * 50);
  };

  return (
    <div className="mb-6">
      <h3 className="text-gray-500 text-lg font-medium mb-4 px-4">{category} ({tasks.length})</h3>

      {/* Header - Hidden on mobile */}
      <div className="hidden md:grid md:grid-cols-12 gap-2 items-center p-2 bg-gray-100 font-semibold text-gray-700 border-b border-gray-200 px-4">
        <span className="col-span-1"></span>
        <span className="col-span-2 text-sm flex items-center"><BiRefresh className="mr-1 h-4 w-4" /> Task Name</span>
        <span className="col-span-3 text-sm flex items-center"><BiMenu className="mr-1 h-4 w-4" /> Description</span>
        <span className="col-span-2 text-sm flex items-center justify-center"><BiCalendar className="mr-1 h-4 w-4" /> Estimation</span>
        <span className="col-span-1 text-sm flex items-center justify-center"><MdDevices className="mr-1 h-4 w-4" /> Type</span>
        <span className="col-span-1 text-sm flex items-center justify-center"><FaUsers className="mr-1 h-4 w-4" /> People</span>
        <span className="col-span-1 text-sm flex items-center justify-center"><BiFlag className="mr-1 h-4 w-4" /> Priority</span>
        <span className="col-span-1 text-sm flex items-center justify-center"><BiDotsVerticalRounded className="mr-1 h-4 w-4" /> Progress</span>
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col md:grid md:grid-cols-12 gap-2 items-start md:items-center p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors px-4"
        >
          {/* Checkbox */}
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              checked={task.isChecked}
              onChange={() => toggleTaskStatus(task)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
            />
          </div>

          {/* Task Name */}
          <span className="col-span-2 text-gray-900 text-sm font-medium truncate">{task.name}</span>

          {/* Description */}
          <span className="col-span-3 text-gray-500 text-sm break-words md:mt-0 mt-2">{task.description}</span>

          {/* Estimation - Centered */}
          <span className="col-span-2 text-gray-500 text-sm hidden md:flex items-center justify-center truncate">{task.estimation}</span>

          {/* Type - Centered */}
          <div className="col-span-1 flex items-center justify-start md:justify-center mt-2 md:mt-0">
            <span
              className={`px-2 py-1 rounded flex items-center text-xs shadow-md ${task.type === 'Dashboard' ? 'bg-indigo-100 text-indigo-800' : 'bg-orange-100 text-orange-800'
                }`}
            >
              {task.type === 'Dashboard' && <FaTabletAlt className="mr-1 h-3 w-3" />}
              {task.type === 'Mobile App' && <FaMobileAlt className="mr-1 h-3 w-3" />}
              {task.type}
            </span>
          </div>

          {/* People - Centered */}
          <div className="col-span-1 flex items-center justify-start md:justify-center mt-2 md:mt-0">
            <FaUsers
              className={`mr-1 h-4 w-4 ${task.type === 'Dashboard' ? 'text-indigo-800' : 'text-orange-800'}`}
            />
            <div className="flex space-x-1">
              {task.people.map((person: any, index: number) => (
                <Avatar
                  key={index}
                  name={person}
                  size="20"
                  round={true}
                  className={`${task.type === 'Dashboard' ? 'bg-indigo-200' : 'bg-orange-200'}`}
                />
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="col-span-1 flex items-center justify-start md:justify-center mt-2 md:mt-0">
            <span
              className={`text-xs px-2 py-1 rounded text-center ${task.priority === 'Low'
                ? 'bg-blue-100 text-blue-800'
                : task.priority === 'Medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
                }`}
            >
              {task.priority}
            </span>
          </div>

          {/* Progress */}
          <div className="col-span-1 flex items-center justify-start md:justify-center mt-2 md:mt-0">
            <CircularProgressbar
              value={getProgress(task)}
              text={`${getProgress(task)}%`}
              styles={buildStyles({
                textSize: '18px',
                pathColor: task.priority === 'Low' ? '#3B82F6' : task.priority === 'Medium' ? '#F59E0B' : '#EF4444',
                trailColor: '#E5E7EB',
              })}
              className="w-10 h-10"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;