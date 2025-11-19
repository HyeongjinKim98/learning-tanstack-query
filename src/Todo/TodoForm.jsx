import styled from "styled-components";
export const TodoForm = ({ todo, handleSubmit, onChangeInput }) => {
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <TodoInput
          placeholder={"할 일을 입력해주세요(Enter)"}
          value={todo}
          onChange={onChangeInput}
        />
      </Form>
    </>
  );
};
const Form = styled.form`
  width: 100%;
  display: flex;
  
`;
const TodoInput = styled.input`
  width: 100%;
  font-size: 1.4rem;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;
  background-color: #fafafa;

  &:focus {
    border-color: #4a90e2;
    background-color: #fff;
  }
  &::placeholder {
    color: #aaa;
  }
`;
