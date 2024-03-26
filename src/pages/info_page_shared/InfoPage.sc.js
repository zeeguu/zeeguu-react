import styled from "styled-components";
import { zeeguuOrange } from "../../components/colors";

const PageBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: ${zeeguuOrange};
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  max-width: 80%;
  border-radius: 1em;

  width: 47rem;
  padding: 2rem;
  margin: 1rem;

  background-color: white;

  @media (max-width: 1200px) {
    margin: 0.5rem;
    max-width: 47rem;
    width: 80%;
  }

  @media (max-width: 576px) {
    padding: 24px 24px;
    margin: 0.5rem;
    max-width: 500px;
    width: 90%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.9em;
    margin: 0;
  }
`;

export { ContentWrapper, PageContainer, PageBackground };
