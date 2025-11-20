import { useState, useMemo } from "react";
import { useTodos } from "./useTodos";
import { TodoList } from "./TodoList";
import { TodoFilter } from "./TodoFilter";
import { TodoForm } from "./TodoForm";
import styled from "styled-components";
export const Todo = () => {
  const [todo, setTodo] = useState("");
  const { todos, isPending, isError, addTodo, deleteTodo, changeStatus } =
    useTodos();
  const [currentFilter, setCurrentFilter] = useState("ALL");

  const onChangeInput = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodo("");

    addTodo({
      todo: todo,
      status: "pending",
    });
  };

  const handleFilter = (nextFilter) => {
    if (nextFilter === currentFilter) {
      setCurrentFilter("ALL");
      return;
    }
    setCurrentFilter(nextFilter);
  };

  if (isPending) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <TodoWrapper>
        <TodoTitle>Todo</TodoTitle>
        <TodoFilter
          handleFilter={handleFilter}
          currentFilter={currentFilter}
          todoCounts={todos.counts}
        />
        <TodoForm
          todo={todo}
          onChangeInput={onChangeInput}
          handleSubmit={handleSubmit}
        />
        <TodoList
          todos={todos.data}
          currentFilter={currentFilter}
          deleteTodo={deleteTodo}
          changeStatus={changeStatus}
        />
      </TodoWrapper>
    </>
  );
};
const TodoTitle = styled.h1`
  font-size: 3rem;
`;
const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  width: 700px;
  height: 100vh;
  gap: 1rem;
  padding: 1rem;
`;
