import styled from "styled-components";
import { Outlet } from "react-router-dom";

export const TodoLayout = () => {
  return (
    <Container>
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 40px;
  background-color: #e4e4e4;
`;
