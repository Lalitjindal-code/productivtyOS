import { EmptyState } from '../../common/EmptyState';
import { TaskCard } from './TaskCard';
import { LayoutList, Loader2, Sparkles } from 'lucide-react';

export const TaskList = ({ tasks, isLoading, isError, filter = 'all', searchQuery = '', categoryFilter = 'all', priorityFilter = 'all' }) => {
  // ... existing loading and error states ...
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
        <Loader2 className="animate-spin mb-4 text-primary-400" size={32} />
        <p className="font-body text-sm">Loading neural pathways...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
        <p className="text-red-400 font-body">Failed to sync with central database.</p>
      </div>
    );
  }

  // ... filtering logic ...
  const filteredTasks = tasks.filter(task => {
    // 1. Tab Filter
    if (filter === 'completed' && task.status !== 'completed') return false;
    if (filter === 'today') {
        if (!task.deadline) return false; // In advanced filter, if it has no deadline, it's not "today"
        const deadline = new Date(task.deadline);
        const today = new Date();
        if (!(deadline.getDate() === today.getDate() && deadline.getMonth() === today.getMonth() && deadline.getFullYear() === today.getFullYear())) return false;
    }
    // For 'all' tab, we typically don't show completed tasks unless specifically requested or searching? Let's show active tasks if filter === 'all'
    if (filter === 'all' && task.status === 'completed') return false;

    // 2. Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      if (!task.title.toLowerCase().includes(q) && !(task.description && task.description.toLowerCase().includes(q))) {
        return false;
      }
    }

    // 3. Category Filter
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;

    // 4. Priority Filter
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

    return true; 
  });

  if (filteredTasks.length === 0) {
    return (
      <EmptyState
        icon={LayoutList}
        title="Sector Clear"
        description={searchQuery 
          ? `No directives matching "${searchQuery}" found in this sector.`
          : "No active directives detected in this sector. All systems operational."
        }
        color="primary"
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {filteredTasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};
