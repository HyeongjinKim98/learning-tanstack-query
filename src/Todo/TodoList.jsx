import styled from "styled-components";
import { X } from "lucide-react";
export const TodoList = ({
  todos,
  currentFilter,
  deleteTodo,
  changeStatus,
}) => {
  console.log(todos);
  return (
    <>
      <TodoListWrapper>
        {(currentFilter === "INPROGRESS" || currentFilter === "ALL") &&
          todos.inProgress.map((el) => (
            <>
              <TodoElement id={el.id}>
                <StatusBtn
                  onClick={() => changeStatus(el)}
                  $status="INPROGRESS"
                >
                  {el.status.toUpperCase()}
                </StatusBtn>
                <Todo>{el.todo}</Todo>
                <XBtn onClick={() => deleteTodo(el.id)}><X/></XBtn>
              </TodoElement>
            </>
          ))}
        {(currentFilter === "PENDING" || currentFilter === "ALL") &&
          todos.pending.map((el) => (
            <>
              <TodoElement id={el.id}>
                <StatusBtn onClick={() => changeStatus(el)} $status="PENDING">
                  {el.status.toUpperCase()}
                </StatusBtn>
                <Todo>{el.todo}</Todo>
                <XBtn onClick={() => deleteTodo(el.id)}><X/></XBtn>
              </TodoElement>
            </>
          ))}
        {(currentFilter === "COMPLETED" || currentFilter === "ALL") &&
          todos.completed.map((el) => (
            <>
              <TodoElement id={el.id}>
                <StatusBtn onClick={() => changeStatus(el)} $status="COMPLETED">
                  {el.status.toUpperCase()}
                </StatusBtn>
                <Todo>{el.todo}</Todo>
                <XBtn onClick={() => deleteTodo(el.id)}><X/></XBtn>
              </TodoElement>
            </>
          ))}
      </TodoListWrapper>
    </>
  );
};
const TodoListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Todo = styled.div`
  width: 100%;
  font-size: 1.1rem;
  margin-left: 1rem;
  text-align: left;
`;
const TodoElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  align-items: center;
  &:hover {
    background-color: #e1e1e1;
  }
`;
const StatusBtn = styled.button`
  width: 10rem;
  font-size: 14px;
  border: none;
  color: white;
  padding: 0.4rem 1.2rem;
  border-radius: 0.8rem;
  background-color: ${(props) => {
    switch (props.$status) {
      case "PENDING":
        return "#649ffffb";
      case "INPROGRESS":
        return "#ff5c5c";
      case "COMPLETED":
        return "#00cb1b";
      default:
        return "grey";
    }
  }};
  cursor: pointer;
`;

const XBtn = styled.button`
  background-color: transparent;
  border: none;
  border-radius: full;
  cursor: pointer;
`;
