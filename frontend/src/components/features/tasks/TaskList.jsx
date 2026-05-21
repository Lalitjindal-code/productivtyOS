import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EmptyState } from '../../common/EmptyState';
import { TaskCard } from './TaskCard';
import { LayoutList, Loader2, GripVertical } from 'lucide-react';

// --- Sortable wrapper for each task card ---
const SortableTaskItem = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style} className="group/drag flex items-start gap-2">
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="mt-4 p-1 text-neutral-700 hover:text-neutral-400 transition-colors cursor-grab active:cursor-grabbing opacity-0 group-hover/drag:opacity-100 focus:opacity-100 shrink-0 touch-none"
        title="Drag to reorder"
        aria-label="Drag to reorder task"
      >
        <GripVertical size={16} />
      </button>
      <div className="flex-1 min-w-0">
        <TaskCard task={task} />
      </div>
    </div>
  );
};

// --- Main TaskList ---
export const TaskList = ({
  tasks,
  isLoading,
  isError,
  filter = 'all',
  searchQuery = '',
  categoryFilter = 'all',
  priorityFilter = 'all',
}) => {
  const [localOrder, setLocalOrder] = useState(null); // null = use server order
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, // 8px drag threshold prevents accidental drags
    })
  );

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

  // Apply filters
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed' && task.status !== 'completed') return false;
    if (filter === 'today') {
      if (!task.deadline) return false;
      const deadline = new Date(task.deadline);
      const today = new Date();
      if (
        !(
          deadline.getDate() === today.getDate() &&
          deadline.getMonth() === today.getMonth() &&
          deadline.getFullYear() === today.getFullYear()
        )
      )
        return false;
    }
    if (filter === 'all' && task.status === 'completed') return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      if (
        !task.title.toLowerCase().includes(q) &&
        !(task.description && task.description.toLowerCase().includes(q))
      )
        return false;
    }
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <EmptyState
        icon={LayoutList}
        title="Sector Clear"
        description={
          searchQuery
            ? `No directives matching "${searchQuery}" found in this sector.`
            : 'No active directives detected in this sector. All systems operational.'
        }
        color="primary"
      />
    );
  }

  // Local reorder: use localOrder if set, otherwise use filteredTasks order
  const displayIds = localOrder
    ? localOrder.filter(id => filteredTasks.some(t => t._id === id))
    : filteredTasks.map(t => t._id);

  // Fill in any tasks not in localOrder yet (e.g. after filter change)
  filteredTasks.forEach(t => {
    if (!displayIds.includes(t._id)) displayIds.push(t._id);
  });

  const displayTasks = displayIds
    .map(id => filteredTasks.find(t => t._id === id))
    .filter(Boolean);

  const activeTask = activeId ? displayTasks.find(t => t._id === activeId) : null;

  // Drag & drop is only meaningful on non-completed views
  const isDraggable = filter !== 'completed';

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const oldIndex = displayIds.indexOf(active.id);
    const newIndex = displayIds.indexOf(over.id);
    setLocalOrder(arrayMove(displayIds, oldIndex, newIndex));
  };

  if (!isDraggable) {
    return (
      <div className="flex flex-col gap-3">
        {displayTasks.map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={displayIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3">
          {displayTasks.map(task => (
            <SortableTaskItem key={task._id} task={task} />
          ))}
        </div>
      </SortableContext>

      {/* Ghost card shown while dragging */}
      <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
        {activeTask ? (
          <div className="opacity-90 shadow-2xl shadow-black/50 ring-1 ring-primary-400/40 rounded-xl rotate-1 scale-[1.02]">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
