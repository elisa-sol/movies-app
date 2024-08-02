// футер с информацией и кнопками
import React from 'react';

import './footer.css';
import PropTypes from 'prop-types';

import TasksFilter from '../tasksFilter/tasksFilter';

function Footer({ taskCounter, clearCompletedTasks, setTaskFilter, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{taskCounter} items left</span>
      <TasksFilter setTaskFilter={setTaskFilter} filter={filter} />
      <button type="button" className="clear-completed" onClick={clearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  taskCounter: 0,
  filter: 'all',
};

Footer.propTypes = {
  taskCounter: PropTypes.number,
  clearCompletedTasks: PropTypes.func.isRequired,
  setTaskFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default Footer;
