import React, { Component } from 'react';

import Footer from './assets/footer/footer';
import NewTaskForm from './assets/newTaskForm/newTaskForm';
import TaskList from './assets/taskList/taskList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
      editingTaskId: null,
      editingTaskText: '',
      filter: 'all',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.taskCounter = this.taskCounter.bind(this);
    this.setTaskFilter = this.setTaskFilter.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
    this.getFilteredTasks = this.getFilteredTasks.bind(this);
  }

  handleInputChange(event) {
    this.setState({ newTask: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }

  handleTaskChange(id, checked) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((t) => (t.id === id ? { ...t, checked } : t)),
    }));
  }

  setTaskFilter(filter) {
    this.setState({ filter });
  }

  getFilteredTasks() {
    const { tasks, filter } = this.state;

    if (filter === 'all') {
      return tasks;
    }

    if (filter === 'active') {
      return tasks.filter((task) => !task.checked);
    }

    if (filter === 'completed') {
      return tasks.filter((task) => task.checked);
    }

    return tasks;
  }

  addTask() {
    const { newTask } = this.state;

    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: Date.now(),
        text: newTask,
        checked: false,
        date: new Date(),
      };

      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTaskObject],
        newTask: '',
      }));
    }
  }

  deleteTask(id) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }

  editTask(id, text) {
    this.setState({ editingTaskId: id, editingTaskText: text });
  }

  updateTask(id, newText) {
    const { editingTaskText } = this.state;

    if (editingTaskText.trim() !== '') {
      this.setState((prevState) => ({
        tasks: prevState.tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)),
        editingTaskId: null,
        editingTaskText: '',
      }));
    }
  }

  taskCounter() {
    const { tasks } = this.state;
    return tasks.filter((task) => !task.checked).length;
  }

  clearCompletedTasks() {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => !task.checked),
    }));
  }

  render() {
    const { newTask, editingTaskId, editingTaskText, filter } = this.state;

    return (
      <div className="todoapp">
        <h1>todos</h1>

        <NewTaskForm
          newTask={newTask}
          handleInputChange={this.handleInputChange}
          handleKeyPress={this.handleKeyPress}
        />

        <TaskList
          tasks={this.getFilteredTasks()}
          onChange={this.handleTaskChange}
          onDelete={this.deleteTask}
          onEdit={this.editTask}
          onUpdate={this.updateTask}
          editingTaskId={editingTaskId}
          editingTaskText={editingTaskText}
          setEditingTaskText={(text) => this.setState({ editingTaskText: text })}
        />

        <Footer
          taskCounter={this.taskCounter()}
          clearCompletedTasks={this.clearCompletedTasks}
          setTaskFilter={this.setTaskFilter}
          filter={filter}
        />
      </div>
    );
  }
}
