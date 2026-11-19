import { useState, useEffect } from "react";
import anecdoteService from "../services/anecdotes";

const baseUrl = "http://localhost:3001/anecdotes";

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data));
  }, []);

  const addAnecdote = async (anecdote) => {
    const createAnecdote = async (newAnecdote) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnecdote),
      };

      const response = await fetch(baseUrl, options);

      if (!response.ok) {
        throw new Error("Failed to create anecdote");
      }

      return await response.json();
    };
    const newAnecdote = await createAnecdote(anecdote);
    setAnecdotes(anecdotes.concat(newAnecdote));
  };

  const deleteAnecdote = async (id) => {
    const remove = async (id) => {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete anecdote");
      }

      return await response.json();
    };

    const deleted = await remove(id);
    setAnecdotes(anecdotes.filter((anecdote) => anecdote.id !== deleted.id));
  };

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  };
};
