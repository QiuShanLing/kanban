import React, { useState, useCallback } from 'react';
import AddEventButton from './AddEventButton';

const EventBar = ({ events, setEvents, currentEvent, setCurrentEvent, renameEvent }) => {
  const [editingEvent, setEditingEvent] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = useCallback(() => {
    const title = prompt('Enter the Title:');
    // Prevent Duplicated
    if (events === null) {
      alert('Event is not null');
      return;
    } else if (
      events.find((event) => event.title.toLowerCase() === title.toLowerCase())
    ) {
      alert('Event Already Existed');
      return;
    }
    // Add new event
    if (title)
      setEvents((prev) => [
        ...prev,
        {
          title,
          ['To do']: [],
          ['In progress']: [],
          ['Completed']: [],
        },
      ]);
  }, [events, setEvents]);

  const handleDoubleClick = (event) => {
    setEditingEvent(event.title);
    setNewTitle(event.title);
  };

  const handleRename = (event) => {
    if (event.key === 'Enter' && newTitle.trim() !== '') {
      renameEvent(editingEvent, newTitle.trim());
      setEditingEvent(null);
    }
  };

  return (
    <div className='event-bar'>
      <h1 className='event-bar-title'>待办</h1>
      <AddEventButton handleClick={handleAdd} />
      <div className='event-container'>
        {events.map((item) => (
          <div
            key={item.title}
            className={`event over-hide ${currentEvent.title === item.title ? 'selected-event' : ''
              }`}
            onClick={() => setCurrentEvent(item)}
            onDoubleClick={() => handleDoubleClick(item)}
          >
            {editingEvent === item.title ? (
              <input
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={handleRename}
                onBlur={() => setEditingEvent(null)}
                autoFocus
                className='event-input'
              />
            ) : (
              item.title
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventBar;
