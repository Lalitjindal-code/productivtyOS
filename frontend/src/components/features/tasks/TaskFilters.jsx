import React from 'react';
import { Search, Filter } from 'lucide-react';

export const TaskFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  categoryFilter, 
  setCategoryFilter, 
  priorityFilter, 
  setPriorityFilter 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-surface p-4 rounded-xl border border-white/5 mb-6">
      
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..." 
          className="w-full bg-base border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm font-body text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-primary-400/50 focus:shadow-glow-sm transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 px-3 py-2 bg-base border border-white/10 rounded-lg">
          <Filter size={14} className="text-neutral-500" />
          
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-transparent text-sm font-body text-neutral-300 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="gym">Gym</option>
            <option value="personal">Personal</option>
            <option value="creative">Creative</option>
            <option value="finance">Finance</option>
            <option value="health">Health</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-base border border-white/10 rounded-lg">
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-transparent text-sm font-body text-neutral-300 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

    </div>
  );
};
