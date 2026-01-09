"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, LogOut, Plus } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  owner_id: string;
}

const TodosPage = () => {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const fetchTodos = useCallback(async () => {
    if (session?.accessToken) {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        if (response.ok) {
          const data: Todo[] = await response.json();
          setTodos(data);
        } else if (response.status === 401) {
          await signOut({ callbackUrl: "/login" });
          router.push('/login');
        }
        else {
          const errorData = await response.json();
          setError(errorData.detail || 'Failed to fetch todos');
        }
      } catch (err) {
        setError('An error occurred while fetching todos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [session, router]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (status === 'authenticated' && session?.accessToken) {
      fetchTodos();
    }
  }, [status, session, router, fetchTodos]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim() || !session?.accessToken) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ title: newTodoTitle, completed: false }),
      });

      if (response.ok) {
        setNewTodoTitle('');
        fetchTodos();
      } else if (response.status === 401) {
        await signOut({ callbackUrl: "/login" });
        router.push('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.detail || 'Failed to add todo');
      }
    } catch (error) {
      console.error('Add todo error:', error);
      alert('An error occurred while adding the todo.');
    }
  };

  const handleToggleComplete = useCallback(async (id: string, completed: boolean, title: string) => {
    if (session?.accessToken) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.accessToken}` },
          body: JSON.stringify({ title, completed }),
        });
        if (response.ok) {
          fetchTodos();
        } else if (response.status === 401) {
          await signOut({ callbackUrl: "/login" });
          router.push('/login');
        }
        else {
          alert('Failed to update todo status.');
        }
      } catch (error) {
        alert('Failed to update todo status.');
      }
    }
  }, [session, fetchTodos, router]);

  const handleEdit = useCallback(async (todo: Todo) => {
    const newTitle = prompt('Enter new title', todo.title);
    if (newTitle && newTitle.trim() && newTitle !== todo.title) {
      if (session?.accessToken) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.accessToken}` },
            body: JSON.stringify({ title: newTitle, completed: todo.completed }),
          });
          if (response.ok) {
            fetchTodos();
          } else if (response.status === 401) {
            await signOut({ callbackUrl: "/login" });
            router.push('/login');
          } else {
            alert('Failed to update todo.');
          }
        } catch (error) {
          alert('Failed to update todo.');
        }
      }
    }
  }, [session, fetchTodos, router]);

  const handleDelete = useCallback(async (id: string) => {
    if (confirm('Are you sure?')) {
      if (session?.accessToken) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${session.accessToken}` },
          });
          if (response.ok) {
            fetchTodos();
          } else if (response.status === 401) {
            await signOut({ callbackUrl: "/login" });
            router.push('/login');
          } else {
            alert('Failed to delete todo.');
          }
        } catch (error) {
          alert('Failed to delete todo.');
        }
      }
    }
  }, [session, fetchTodos, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="text-xl text-indigo-300">Loading todos...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500 font-sans">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-10 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <nav className="container mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold text-indigo-400">TodoApp</span>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/70 hidden sm:block">{session?.user?.email}</span>
              <button
                onClick={async () => {
                  localStorage.clear();
                  sessionStorage.clear();
                  await signOut({ callbackUrl: "/login" });
                }}
                className="p-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto max-w-[900px] mt-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleAddTodo} className="mb-8 p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 flex gap-4 items-center">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            className="flex-grow h-12 px-4 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-white placeholder-white/50 text-base"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-12 px-6 font-semibold text-white bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg shadow-md hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add
          </motion.button>
        </form>

        <AnimatePresence>
          {todos.length === 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center py-20 text-white/50 text-lg flex flex-col items-center justify-center"
            >
              <p className="text-4xl mb-4">🎉</p>
              <p className="text-white/70">All tasks completed! Time for a break. You earned it.</p>
            </motion.div>
          ) : (
            <motion.ul layout className="space-y-3">
              <AnimatePresence>
                {todos.map((todo) => (
                  <motion.li
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex items-center p-4 bg-white dark:bg-zinc-800 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id, !todo.completed, todo.title)}
                      className="h-5 w-5 rounded-md border-white/30 text-indigo-500 focus:ring-indigo-500 bg-black/20 checked:bg-indigo-500 transition-colors duration-200 cursor-pointer"
                    />
                    <span className={`ml-4 flex-grow text-gray-900 dark:text-gray-100 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                      {todo.title}
                    </span>
                    <div className="flex items-center space-x-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(todo)}
                        className="p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-zinc-600 hover:text-indigo-500 transition-colors duration-200"
                      >
                        <Pencil size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(todo.id)}
                        className="p-2 rounded-full text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-zinc-600 hover:text-indigo-500 transition-colors duration-200"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TodosPage;