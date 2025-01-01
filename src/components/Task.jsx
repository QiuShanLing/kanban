const Task = ({ name, status, details, startTime, endTime, id, provided, handleUpdate, handleRemove }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'To do':
        return 'task-todo';
      case 'In progress':
        return 'task-in-progress';
      case 'Completed':
        return 'task-completed';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      className={`task ${getStatusClass(status)}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => handleUpdate(id)}
    >
      <h2 className='task-name over-hide'>{name}</h2>
      <p className='task-details'>{details}</p>
      {(startTime || endTime) && (
        <div className='task-time'>
          <nav>
            {startTime && <span>Start: {formatDate(startTime)}</span>}
            {startTime && endTime && <span> - </span>}
            {endTime && <span>End: {formatDate(endTime)}</span>}
          </nav>
        </div>
      )}
      
      <div className='remove-bar' onClick={(e) => handleRemove(id, e)}>
        -
      </div>
    </div>
  );
};

export default Task;
