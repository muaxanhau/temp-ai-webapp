import { Button } from "antd";
import styled from "styled-components";

export const HeaderContainerStyled = styled.div`
  max-width: 1200px;
  margin: auto;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;

  .menu-list-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    a {
      padding: 5px 20px;
      &:hover {
        background: #0000001a;
        border-radius: 16px;
      }
    }
  }

  .logo-container {
    height: 80px;
    position: relative;
    width: 90px;
  }
`;

export const LandingActionsStyled = styled.div`
  max-width: 1200px;
  height: 600px;
  margin: auto;
  margin-top: 10px;
  display: flex;
  position: relative;
  border-radius: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .img-container {
    width: 100%;
    display: flex;
    position: absolute;
    height: 600px;
    img {
      border-radius: 16px;
    }
  }

  h2,
  p {
    position: relative;
    color: white;
  }

  h2 {
    font-size: 60px;
  }

  .actions-container {
    width: 800px;
    background: white;
    height: 80px;
    border-radius: 12px;
    position: relative;
    display: flex;
    padding: 10px;
    gap: 10px;

    .ant-select {
      width: 200px;
      height: 55px;

      .ant-select-selector {
        border: 1px solid black;
      }

      .ant-select-selection-placeholder {
        color: black;
      }
    }

    .ant-picker {
      width: 400px;
      height: 55px;
      border: 1px solid black;
      color: black;

      .ant-picker-range-separator .ant-picker-separator,
      .ant-picker-suffix {
        color: black;
      }
    }
  }
`;

export const StyledButton = styled(Button)`
  width: 200px;
  height: 55px;
  background: #eb662b;
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

export const FooterStyled = styled.div`
  position: relative;
  max-width: 1200px;
  height: 470px;
  margin: auto;
  margin-top: 10px;
  display: flex;

  .content-container {
    position: relative;
  }

  .footer-bg {
    width: 100%;
    display: flex;
    position: absolute;
    height: 600px;
  }

  .content-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 140px 30px 0px 30px;

    h3 {
      margin-bottom: 10px;
    }
  }
`;
