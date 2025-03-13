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
    // Enhanced progress logic (e.g., based on sub-tasks or time)
    return task.isChecked ? 100 : Math.floor(Math.random() * 50);
  };

  return (
    <div className="mb-6">
      <h3 className="text-gray-500 text-lg font-medium mb-4">{category} ({tasks.length})</h3>
      <div className="flex items-center p-2 bg-gray-100 font-semibold text-gray-700 border-b border-gray-200">
        <span className="w-6 mr-2"></span>
        <span className="flex-[2] text-sm whitespace-nowrap flex items-center">
          <BiRefresh className="mr-1 h-4 w-4 text-gray-500" />
          Task Name
        </span>
        <span className="flex-[3] text-sm whitespace-nowrap flex items-center">
          <BiMenu className="mr-1 h-4 w-4 text-gray-500" />
          Description
        </span>
        <span className="flex-[2] text-sm whitespace-nowrap flex items-center">
          <BiCalendar className="mr-1 h-4 w-4 text-gray-500" />
          Estimation
        </span>
        <span className="flex-1 text-sm whitespace-nowrap flex items-center">
          <MdDevices className="mr-1 h-4 w-4 text-gray-500" />
          Type
        </span>
        <span className="flex-1 text-sm whitespace-nowrap flex items-center">
          <FaUsers className="mr-1 h-4 w-4 text-gray-500" />
          People
        </span>
        <span className="flex-1 text-sm whitespace-nowrap flex items-center">
          <BiFlag className="mr-1 h-4 w-4 text-gray-500" />
          Priority
        </span>
        <span className="flex-1 text-sm whitespace-nowrap flex items-center">
          <BiDotsVerticalRounded className="mr-1 h-4 w-4 text-gray-500" />
          Progress
        </span>
      </div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-50 transition-colors min-w-0"
        >
          <input
            type="checkbox"
            checked={task.isChecked}
            onChange={() => toggleTaskStatus(task)}
            className="mr-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="flex-[2] text-gray-900 text-sm font-medium min-w-0 truncate">
            {task.name}
          </span>
          <span className="flex-[3] text-gray-500 text-sm break-words min-w-0">
            {task.description}
          </span>
          <span className="flex-[2] text-gray-500 text-sm min-w-0 truncate">
            {task.estimation}
          </span>
          <span className="flex-1 text-sm min-w-0 flex items-center justify-center">
            <span
              className={`px-2 py-1 rounded flex items-center ${task.type === 'Dashboard'
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-orange-100 text-orange-800'
                } text-center shadow-2xl z-10 truncate`}
            >
              {task.type === 'Dashboard' && (
                <FaTabletAlt className="mr-1 h-3 w-3" />
              )}
              {task.type === 'Mobile App' && (
                <FaMobileAlt className="mr-1 h-3 w-3" />
              )}
              {task.type}
            </span>
          </span>
          <span className="flex-1 text-sm min-w-0 flex items-center">
            <FaUsers
              className={`mr-1 h-4 w-4 ${task.type === 'Dashboard' ? 'text-indigo-800' : 'text-orange-800'
                }`}
            />
            <div className="flex space-x-1">
              {task.people.map((person: any, index: number) => (
                <Avatar
                  key={index}
                  name={person}
                  size="20"
                  round={true}
                  className={`${task.type === 'Dashboard' ? 'bg-indigo-200' : 'bg-orange-200'
                    }`}
                />
              ))}
            </div>
          </span>
          <span
            className={`flex-1 text-sm ${task.priority === 'Low'
              ? 'bg-blue-100 text-blue-800'
              : task.priority === 'Medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
              } px-2 py-1 rounded min-w-0 text-center truncate`}
          >
            {task.priority}
          </span>
          <span className="flex-1 text-sm min-w-0 flex items-center justify-center">
            <CircularProgressbar
              value={getProgress(task)}
              text={`${getProgress(task)}%`}
              styles={buildStyles({
                textSize: '20px',
                pathColor: task.priority === 'Low' ? '#3B82F6' : task.priority === 'Medium' ? '#F59E0B' : '#EF4444',
                trailColor: '#E5E7EB',
                backgroundColor: '#fff',
              })}
              className="w-10 h-10"
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;