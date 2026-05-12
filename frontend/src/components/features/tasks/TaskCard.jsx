import React, { useState } from 'react';
import { Check, X, Clock, Trash2, ChevronDown, ChevronUp, Plus, Target } from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge, PriorityBadge } from '../../common/Badge';
import { useTasks } from '../../../hooks/useTasks';
import { useGoals } from '../../../hooks/useGoals';
import { RoastModal } from '../rage/RoastModal';
import { format, isPast, isToday } from 'date-fns';
import api from '../../../services/api';

export const TaskCard = ({ task }) => {
  const { completeTask, failTask, deleteTask, addSubtask, toggleSubtask, deleteSubtask } = useTasks();
  const { goals } = useGoals();
  const [isSubtasksExpanded, setIsSubtasksExpanded] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [roastData, setRoastData] = useState(null);
  const [showRoast, setShowRoast] = useState(false);

  const isCompleted = task.status === 'completed';
  const isFailed = task.status === 'failed';
  
  // Overdue Detection
  const isOverdue = !isCompleted && !isFailed && task.deadline && isPast(new Date(task.deadline)) && !isToday(new Date(task.deadline));
  
  const handleComplete = () => completeTask(task._id);
  const handleFail = async () => {
    failTask(task._id);
    // Trigger roast generation after short delay
    setTimeout(async () => {
      try {
        const res = await api.post(`/rage/roast/${task._id}`);
        setRoastData(res.data);
        setShowRoast(true);
      } catch (e) {
        console.warn('Roast generation failed:', e);
      }
    }, 600);
  };
  const handleDelete = () => deleteTask(task._id);

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    addSubtask({ taskId: task._id, title: newSubtaskTitle });
    setNewSubtaskTitle('');
  };

  let statusGlow = null;
  if (isCompleted) statusGlow = 'primary';
  else if (isFailed) statusGlow = 'danger';
  else if (isOverdue) statusGlow = 'danger'; // Overdue gets a red glow too

  const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;

  const linkedGoal = task.goalId ? goals?.find(g => g._id === task.goalId) : null;

  return (
  <>
    <Card 
      className={`group flex items-start gap-4 transition-all duration-300 ${
        isCompleted ? 'opacity-60 grayscale hover:grayscale-0' : ''
      }`}
      glow={statusGlow}
    >
      {/* Quick Actions (Left) */}
      <div className="flex flex-col gap-2 shrink-0 mt-1">
        {!isCompleted && !isFailed && (
          <>
            <button 
              onClick={handleComplete}
              className="w-6 h-6 rounded border border-white/20 flex items-center justify-center text-transparent hover:text-green-400 hover:border-green-400/50 hover:bg-green-400/10 transition-colors"
              title="Mark Completed"
            >
              <Check size={14} />
            </button>
            <button 
              onClick={handleFail}
              className="w-6 h-6 rounded border border-white/20 flex items-center justify-center text-transparent hover:text-red-400 hover:border-red-400/50 hover:bg-red-400/10 transition-colors"
              title="Mark Failed"
            >
              <X size={14} />
            </button>
          </>
        )}
        {(isCompleted || isFailed) && (
          <div className={`w-6 h-6 rounded flex items-center justify-center ${isCompleted ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
            {isCompleted ? <Check size={14} /> : <X size={14} />}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <h3 className={`font-body font-semibold text-neutral-50 truncate ${isCompleted || isFailed ? 'line-through text-neutral-400' : ''}`}>
              {task.title}
            </h3>
            {isOverdue && <Badge label="OVERDUE" color="danger" size="sm" />}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <PriorityBadge priority={task.priority} />
            <button onClick={handleDelete} className="text-neutral-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        {task.description && (
          <p className="font-body text-sm text-neutral-400 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-3 mb-1">
          <Badge label={task.category} size="sm" />
          
          {task.estimatedDuration && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
              <Clock size={12} />
              <span>{task.estimatedDuration}m</span>
            </div>
          )}
          
          {task.deadline && (
            <div className={`flex items-center gap-1.5 text-xs font-mono border-l border-white/10 pl-3 ${isOverdue ? 'text-red-400 font-bold' : 'text-neutral-500'}`}>
              <span>Due: {format(new Date(task.deadline), 'MMM d, p')}</span>
            </div>
          )}
          
          
          {task.xpEarned > 0 && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-primary-400 border-l border-white/10 pl-3">
              <span>+{task.xpEarned} XP</span>
            </div>
          )}

          {linkedGoal && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-plasma-400 border-l border-white/10 pl-3">
              <Target size={12} />
              <span className="truncate max-w-[100px]">{linkedGoal.title}</span>
            </div>
          )}
        </div>

        {/* Subtasks Section */}
        <div className="mt-4">
          <button 
            onClick={() => setIsSubtasksExpanded(!isSubtasksExpanded)}
            className="flex items-center gap-2 text-xs font-body font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            {isSubtasksExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            <span>Subtasks ({completedSubtasks}/{totalSubtasks})</span>
          </button>
          
          {isSubtasksExpanded && (
            <div className="mt-3 pl-2 border-l border-white/10 flex flex-col gap-2">
              {task.subtasks?.map(subtask => (
                <div key={subtask._id} className="flex items-center justify-between group/subtask">
                  <div 
                    className="flex items-center gap-2 cursor-pointer flex-1"
                    onClick={() => toggleSubtask({ taskId: task._id, subtaskId: subtask._id })}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${subtask.completed ? 'bg-primary-400 border-primary-400 text-void' : 'border-neutral-500 text-transparent'}`}>
                      <Check size={12} />
                    </div>
                    <span className={`text-sm font-body ${subtask.completed ? 'text-neutral-500 line-through' : 'text-neutral-300'}`}>
                      {subtask.title}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteSubtask({ taskId: task._id, subtaskId: subtask._id })}
                    className="text-neutral-600 hover:text-red-400 opacity-0 group-hover/subtask:opacity-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              
              {!isCompleted && !isFailed && (
                <form onSubmit={handleAddSubtask} className="flex items-center gap-2 mt-1">
                  <Plus size={14} className="text-neutral-500" />
                  <input 
                    type="text" 
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    placeholder="Add a subtask..."
                    className="flex-1 bg-transparent border-none text-sm font-body text-neutral-300 placeholder:text-neutral-600 focus:outline-none"
                  />
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>

    {/* Roast Modal */}
    <RoastModal
      isOpen={showRoast}
      onClose={() => setShowRoast(false)}
      roast={roastData?.roast || ''}
      taskTitle={task.title}
      rageMode={roastData?.rageMode || 'hard'}
    />
  </>
  );
};
