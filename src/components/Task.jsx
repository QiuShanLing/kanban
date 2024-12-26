const Task = ({ name, status, details, id, provided, handleUpdate, handleRemove }) => {
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
      <div className='remove-bar' onClick={(e) => handleRemove(id, e)}>
        -
      </div>
    </div>
  );
};

export default Task;
