import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTasks } from '../../../hooks/useTasks';
import { useGoals } from '../../../hooks/useGoals';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

export const MainCalendar = () => {
  const { tasks, isLoading: isLoadingTasks } = useTasks();
  const { goals, isLoading: isLoadingGoals } = useGoals();

  if (isLoadingTasks || isLoadingGoals) {
    return (
      <div className="flex justify-center py-20 text-primary-400">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  // 1. Transform Tasks to Calendar Events
  const taskEvents = tasks
    .filter(task => task.deadline) // Only tasks with deadlines
    .map(task => ({
      id: `task-${task._id}`,
      title: `${task.status === 'completed' ? '✓ ' : ''}${task.title}`,
      date: format(new Date(task.deadline), 'yyyy-MM-dd'),
      backgroundColor: task.status === 'completed' 
        ? 'rgba(46, 204, 113, 0.2)' // Success
        : task.status === 'failed' 
          ? 'rgba(231, 76, 60, 0.2)' // Danger
          : 'rgba(255, 171, 0, 0.2)', // Primary (Electric Amber)
      borderColor: task.status === 'completed' 
        ? 'rgba(46, 204, 113, 0.5)'
        : task.status === 'failed' 
          ? 'rgba(231, 76, 60, 0.5)' 
          : 'rgba(255, 171, 0, 0.5)',
      textColor: '#FFFFFF',
      extendedProps: { type: 'task', original: task }
    }));

  // 2. Transform Goal Milestones to Calendar Events
  const milestoneEvents = [];
  goals.forEach(goal => {
    goal.milestones?.forEach(milestone => {
      if (milestone.targetDate) {
        milestoneEvents.push({
          id: `ms-${milestone._id}`,
          title: `🏆 ${milestone.title} (${goal.title})`,
          date: format(new Date(milestone.targetDate), 'yyyy-MM-dd'),
          backgroundColor: milestone.completed 
            ? 'rgba(46, 204, 113, 0.2)' 
            : 'rgba(0, 240, 255, 0.2)', // Plasma Cyan
          borderColor: milestone.completed 
            ? 'rgba(46, 204, 113, 0.5)' 
            : 'rgba(0, 240, 255, 0.5)',
          textColor: '#FFFFFF',
          extendedProps: { type: 'milestone', original: milestone, goalId: goal._id }
        });
      }
    });
  });

  const allEvents = [...taskEvents, ...milestoneEvents];

  const handleEventClick = (info) => {
    // For MVP, just log or show an alert. 
    // In a full build, this would open the TaskModal in edit mode or a details pane.
    const { type, original } = info.event.extendedProps;
    if (type === 'task') {
      console.log('Clicked Task:', original.title);
      // alert(`Task: ${original.title}\nStatus: ${original.status}`);
    } else if (type === 'milestone') {
      console.log('Clicked Milestone:', original.title);
    }
  };

  return (
    <div className="bg-surface border border-white/5 p-4 sm:p-6 rounded-2xl shadow-glow-sm calendar-container">
      <style dangerouslySetInnerHTML={{__html: `
        .fc-theme-standard td, .fc-theme-standard th { border-color: rgba(255,255,255,0.05); }
        .fc-theme-standard .fc-scrollgrid { border-color: rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; }
        .fc-button-primary { background-color: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.1) !important; color: #a3a3a3 !important; }
        .fc-button-primary:hover { background-color: rgba(255,255,255,0.1) !important; color: #fff !important; }
        .fc-button-primary:not(:disabled).fc-button-active { background-color: rgba(255, 171, 0, 0.2) !important; border-color: #ffab00 !important; color: #ffab00 !important; }
        .fc-toolbar-title { font-family: 'Outfit', sans-serif; font-weight: 700; color: #f5f5f5; font-size: 1.25rem !important; }
        .fc-col-header-cell-cushion { color: #a3a3a3; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.875rem; padding: 8px !important; }
        .fc-daygrid-day-number { color: #d4d4d4; font-family: 'Inter', sans-serif; font-size: 0.875rem; padding: 4px 8px !important; }
        .fc-day-today { background-color: rgba(255, 171, 0, 0.05) !important; }
        .fc-event { border-radius: 4px; padding: 2px 4px; font-family: 'Inter', sans-serif; font-size: 0.75rem; border-width: 1px; cursor: pointer; transition: transform 0.2s; }
        .fc-event:hover { transform: scale(1.02); }
        .fc .fc-daygrid-day.fc-day-today { background-color: rgba(255, 171, 0, 0.03); }
      `}} />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        events={allEvents}
        eventClick={handleEventClick}
        height="auto"
        aspectRatio={1.35}
        dayMaxEvents={true} // Allow "more" link when too many events
      />
    </div>
  );
};
