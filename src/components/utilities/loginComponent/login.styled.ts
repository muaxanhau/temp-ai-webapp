import { Button } from "antd";
import styled from "styled-components";

export const LoginContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-1);

  button {
    display: flex;
    align-items: center;
  }
  .facebook-btn {
    color: var(--color-blue-1);
  }
  .google-btn {
    color: var(--color-red-1);

    &:hover {
      color: var(--color-red-1) !important;
      border: 1px solid var(--color-red-1) !important;
    }
  }
`;
