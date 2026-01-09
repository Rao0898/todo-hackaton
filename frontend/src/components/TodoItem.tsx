import React from 'react';

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
  onToggleComplete: (id: string, completed: boolean) => void;
}

/**
 * Renders a single todo item with its title and a checkbox to toggle its completion status.
 *
 * @param {object} props - The component props.
 * @param {object} props.todo - The todo item object.
 * @param {string} props.todo.id - The unique ID of the todo.
 * @param {string} props.todo.title - The title of the todo.
 * @param {boolean} props.todo.completed - The completion status of the todo.
 * @param {(id: string, completed: boolean) => void} props.onToggleComplete - Callback function to handle toggling completion status.
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete }) => {
  return (
    <li>
      {todo.title}
    </li>
  );
};

export default TodoItem;
