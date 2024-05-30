"use client";
import styled from "styled-components";

export const StyledHeader = styled.header`
  background: var(--bg-white);
  box-shadow: -1px 15px 17px -8px rgba(0, 0, 0, 0.1);
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .container {
    margin: auto;
    max-width: 1200px;

    display: flex;
    align-items: center;

    .logo {
      width: 20%;

      .text {
        color: #e94560;
        font-weight: 700;
        font-size: 40px;
        font-style: italic;
      }
    }

    .search-box {
      width: 80%;

      display: flex;
      justify-content: center;

      .select-categories {
        height: 44px;

        .ant-select-selector {
          border-start-end-radius: 300px;
          border-end-end-radius: 300px;
        }
      }

      .search-query {
        border-start-start-radius: 300px;
        border-end-start-radius: 300px;

        padding-left: 20px;
      }
    }

    .actions {
      width: 20%;
      display: flex;
      justify-content: flex-end;

      .login-btn {
        width: 44px;
        height: 44px;
      }
    }
  }
`;
