import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface AddTodoProps {
  onTodoAdded: () => void;
}

/**
 * A form component for adding new todo items.
 * Interacts with the backend API to create a new todo for the authenticated user.
 * Notifies the parent component upon successful addition to refresh the todo list.
 */
const AddTodo: React.FC<AddTodoProps> = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ title, completed: false }),
      });

      if (response.ok) {
        setTitle('');
        onTodoAdded(); // Notify parent to refresh todo list
      } else {
        const errorData = await response.json();
        alert(JSON.stringify(errorData.detail) || 'Failed to add todo');
      }
    } catch (error) {
      console.error('Add todo error:', error);
      alert('An error occurred while adding the todo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default AddTodo;
