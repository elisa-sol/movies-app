// одна задача

import React from 'react';

import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import './task.css';
import PropTypes from 'prop-types';

function Task({ task, onChange, onDelete, onEdit, onUpdate, isEditing, editingText, setEditingTaskText }) {
  return (
    <li className={`${isEditing ? 'editing' : ''} ${task.checked ? 'completed' : ''}`}>
      <div className="view">
        <input
          id={`task-${task.id}`}
          className="toggle"
          type="checkbox"
          onChange={(event) => onChange(task.id, event.target.checked)}
          checked={task.checked}
        />

        <label htmlFor={`task-${task.id}`}>
          <span className="description">{task.text}</span>
          <span className="created">
            {`created ${formatDistanceToNow(new Date(task.date), {
              includeSeconds: true,
              locale: enUS,
              addSuffix: true,
            })}`}
          </span>
        </label>

        <button
          type="button"
          className="icon icon-edit"
          onClick={() => onEdit(task.id, task.text)}
          aria-label="Edit task"
        />

        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        />
      </div>

      {isEditing && (
        <input
          className="edit"
          type="text"
          value={editingText}
          onChange={(e) => setEditingTaskText(e.target.value)}
          onBlur={() => onUpdate(task.id, editingText)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onUpdate(task.id, editingText);
            }
          }}
        />
      )}
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  editingText: PropTypes.string,
  setEditingTaskText: PropTypes.func.isRequired,
};

Task.defaultProps = {
  isEditing: false,
  editingText: '',
};

export default Task;
