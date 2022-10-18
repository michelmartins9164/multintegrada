import styled from "styled-components";

export const teste = styled.div`
  font-size: 30px;
`;

export const Spacing = styled.div`
  margin-bottom: 1em;
  margin-top: 1em;
  display: flex;
  justify-content: center;
`;

export const Tr = styled.tr`
  background-color: #ddd;
  :nth-child(2) {
    td {
    }
    background-color: #fff;
  }
`;

export const FlexContainer = styled.div`
  &:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  display: flex;
  button {
    margin-right: 1em;
  }
`;
export const FlexContainerLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
