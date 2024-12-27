const AddEventButton = ({ handleClick }) => {
  // 新建待办事项按钮
  return (
    <div className='add-button' onClick={handleClick}>
      +
    </div>
  );
};

export default AddEventButton;
