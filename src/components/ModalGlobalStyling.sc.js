import { ModalWrapper } from "./ModalWrapper.sc"; //responsible for modal wrapper background, size and scaling
import styled from "styled-components";

//Global modal content style settings

const ModalWrapperGlobal = styled(ModalWrapper)`
  h1 {
    font-size: 1.3em;
    line-height: 150%;
    text-align: center;
    margin: 0;
    @media (max-width: 576px) {
      text-align: left;
    }
  }

  p {
    line-height: 150%;
    text-align: left;
    font-size: 1em;
    margin: 0;
  }

  a {
    text-align: center;
  }
`;

const ModalHeaderGlobal = styled.div`
  margin: 1em 0;
`;

const ModalBodyGlobal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
  margin: 1em 0;
  .fullDivWidthImage {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const ModalFooterGlobal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;
  margin: 1em 0;
  a {
    font-weight: 600;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const CloseButtonGlobal = styled.div`
  cursor: pointer;
  padding: 1px;
  text-align: right;
  position: absolute;
  float: right;
  right: 16px;
  margin-top: -16px;
`;

export {
  ModalWrapperGlobal,
  CloseButtonGlobal,
  ModalHeaderGlobal,
  ModalBodyGlobal,
  ModalFooterGlobal,
};