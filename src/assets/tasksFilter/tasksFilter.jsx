// фильтры в футере

import React from 'react';

import './tasksFilter.css';
import PropTypes from 'prop-types';

function TasksFilter({ filter = 'all', setTaskFilter }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" className={filter === 'all' ? 'selected' : ''} onClick={() => setTaskFilter('all')}>
          All
        </button>
      </li>

      <li>
        <button type="button" className={filter === 'active' ? 'selected' : ''} onClick={() => setTaskFilter('active')}>
          Active
        </button>
      </li>

      <li>
        <button
          type="button"
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => setTaskFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setTaskFilter: PropTypes.func.isRequired,
};

export default TasksFilter;
