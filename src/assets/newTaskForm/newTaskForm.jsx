// форма для добавления

import React from 'react';

import './newTaskForm.css';
import PropTypes from 'prop-types';

function NewTaskForm({ placeholder, newTask, handleInputChange, handleKeyPress }) {
  return (
    <div>
      <input
        type="text"
        className="new-todo"
        placeholder={placeholder}
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

NewTaskForm.defaultProps = {
  placeholder: 'What needs to be done?',
};

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  newTask: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

export default NewTaskForm;
