import React, { useState } from 'react';
import AddTaskButton from './AddTaskButton';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'react-uuid';

const Column = ({ tag, currentEvent, events, setEvents }) => {
  const handleAdd = () => {
    const name = prompt('Enter task name:');
    if (!name) return;
    
    const details = prompt('Enter task details (optional):');
    const startTime = prompt('Enter start date (YYYY-MM-DD, optional):');
    const endTime = prompt('Enter end date (YYYY-MM-DD, optional):');
    
    setEvents(prev =>
      prev.map(event => {
        if (event.title === currentEvent.title) {
          return {
            ...event,
            [tag]: [...event[tag], {
              id: Date.now().toString(),
              name,
              details: details || '',
              startTime: startTime || null,
              endTime: endTime || null,
            }]
          };
        }
        return event;
      })
    );
  };

  const handleRemove = (id, e) => {
    // 禁止冒泡到上层:修改task
    e.stopPropagation();
    setEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          const taskList = event[tag];
          const index = taskList.findIndex((item) => item.id === id);
          taskList.splice(index, 1);
          return { ...event, [tag]: [...taskList] };
        } else {
          return event;
        }
      })
    );
  };

  const handleUpdate = (taskId) => {
    const taskToUpdate = currentEvent[tag].find(task => task.id === taskId);
    if (!taskToUpdate) return;

    const name = prompt('Update task name:', taskToUpdate.name);
    if (!name) return;
    
    const details = prompt('Update task details:', taskToUpdate.details);
    const startTime = prompt('Update start date (YYYY-MM-DD):', taskToUpdate.startTime);
    const endTime = prompt('Update end date (YYYY-MM-DD):', taskToUpdate.endTime);

    setEvents(prev =>
      prev.map(event => {
        if (event.title === currentEvent.title) {
          return {
            ...event,
            [tag]: event[tag].map(task => 
              task.id === taskId
                ? {
                    ...task,
                    name,
                    details: details || '',
                    startTime: startTime || null,
                    endTime: endTime || null,
                  }
                : task
            )
          };
        }
        return event;
      })
    );
  };

  return (
    <div className='column'>
      {tag}
      <AddTaskButton handleClick={handleAdd} />
      <Droppable droppableId={tag}>
        {(provided, snapshot) => {
          return (
            <div
              className='task-container'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {events
                .find((event) => event.title === currentEvent.title)
                ?.[tag].map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                          <Task
                            name={item.name}
                            status = {tag}
                            details={item.details}
                            startTime={item.startTime}
                            endTime={item.endTime}
                            id={item.id}
                            provided={provided}
                            snapshot={snapshot}
                            handleRemove={handleRemove}
                            handleUpdate={handleUpdate}
                          />
                        )}
                    </Draggable>
                  ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Column;
