import { Button } from "antd";
import styled from "styled-components";

export const RefferenceItemStyled = styled.div`
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 200px);
  padding-left: 20px;

  .chat-box-container {
    height: 100%;
    overflow: auto;
    .refference-item {
      margin: 20px 0px;
      p {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .actions-container {
        display: flex;
        gap: 10px;
        .active {
          background: #0000002b;
        }

        button {
          span {
            color: black;
          }
        }

        button:hover {
          border: 1px solid black;
        }

        .confirm-btn {
          background: #d3adf7;
          display: flex;
          align-items: center;
          &:hover {
            border: 1px solid #b37feb;
          }
          span,
          svg {
            color: white;
          }
        }
      }
    }
  }

  textarea {
    margin-bottom: 20px;
    height: 40px;
    padding: 10px 20px;
  }
`;

export const RefferenceContainer = styled.div`
  display: flex;
  .refference-navbar {
    width: 200px;
    background: #0000000d;
  }
`;
