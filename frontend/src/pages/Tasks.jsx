import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ButtonPrimary } from '../components/common/Button';
import { TaskList } from '../components/features/tasks/TaskList';
import { TaskModal } from '../components/features/tasks/TaskModal';
import { TaskFilters } from '../components/features/tasks/TaskFilters';
import { useTasks } from '../hooks/useTasks';

export const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // Tabs
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  
  const { tasks, isLoading, isError } = useTasks();

  const tabs = [
    { id: 'all', label: 'All Active' },
    { id: 'today', label: 'Today' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-50 tracking-wide">Tasks Directory</h1>
          <p className="font-body text-neutral-400 mt-1">Manage and track your active directives.</p>
        </div>
        <ButtonPrimary onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          New Task
        </ButtonPrimary>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-px">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`
              px-4 py-2 font-body text-sm font-medium transition-all duration-200 border-b-2
              ${filter === tab.id 
                ? 'text-primary-400 border-primary-400' 
                : 'text-neutral-500 border-transparent hover:text-neutral-300 hover:border-white/20'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <TaskFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      {/* Task List Area */}
      <div className="flex-1">
        <TaskList 
          tasks={tasks} 
          isLoading={isLoading} 
          isError={isError} 
          filter={filter}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          priorityFilter={priorityFilter}
        />
      </div>

      {/* Modal */}
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
