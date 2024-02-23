import styled, { keyframes } from "styled-components";

import {
  zeeguuTransparentLightOrange,
  zeeguuOrange,
} from "../../components/colors";

const Exercise = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: all 0.5s;
  padding-bottom: 1em;

  .type-feedback p {
    margin: 0.5em;
  }

  .headline {
    font-size: ;
    color: gray;
    margin-top: 1em;
    font-weight: 500;
  }

  .headlineWithMoreSpace {
    font-size: small;
    color: gray;
    margin-top: 3em;
    margin-bottom: 2em;
    /* font-weight: 600; */
  }

  .bottomInput {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    margin-top: 3em;
    flex-wrap: wrap;
  }

  .bottomInput button {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  .bottomInput input {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    text-align: center;
  }

  .highlightedWord {
    color: orange;
    font-weight: 800;
  }

  .contextExample {
    margin-top: 1em;
    margin-left: 2em;
    margin-right: 2em;
    font-weight: 400;
    line-height: 1.4em;
  }

  /* Mobile version */
  @media screen and (max-width: 768px) {
    .contextExample {
      margin-top: 0.5em;
      margin-left: 0.5em;
      margin-right: 0.5em;
    }

    .bottomInput {
      margin-top: 0.5em;
    }

    .bottomInput input {
      width: 6em;
    }

    h1 {
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  padding: 0.5em;
  font-weight: 500;
  border-radius: 0.625em;
  border-style: none;
  user-select: none;
`;

let MatchInputHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 20px;
  word-break: break-word;
  hyphens: auto;
`;

let MatchButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
  flex: 1;
  min-width: 0;
`;

let MatchButtonHolderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  flex: 1;
  min-width: 0;
`;

let MatchSpeakButtonHolder = styled.div`
  width: fit-content;
  margin-left: -1.5em;
  border-radius: 0.75em;
`;

let MatchButton = styled(StyledButton)`
  width: fit-content;
  margin-top: 2em;
  margin-bottom: 2em;
  background: #ffd04799;
  color: black;
  border: 0.125em solid ${zeeguuTransparentLightOrange};

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: ${zeeguuTransparentLightOrange};
  }
`;

let MatchingWords = styled.p`
  margin-top: 2.125em;
  margin-bottom: 2.125em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 0.5em;
  font-size: 1.125em;
  margin-right: 1em;
`;

let OrangeButton = styled(StyledButton)`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  color: white;
  background-color: ${zeeguuOrange};
  margin: 1em;
`;

let OrangeButtonMessage = styled(StyledButton)`
  display: flex;
  flex-direction: column;
  width: fit-content;
  justify-content: center;
  align-items: center;

  color: black;
  background-color: ${zeeguuOrange};
  margin: 1em;
`;

let FeedbackButton = styled(OrangeButton)`
  height: fit-content;
  width: fit-content;
  outline: none;

  &:disabled {
    cursor: default;
    text-decoration: line-through;
  }
`;

let LeftFeedbackButton = styled(FeedbackButton)`
  margin: 1em;

  @media (max-width: 430px) {
    order: 1;
  }
`;

let RightFeedbackButton = styled(FeedbackButton)`
  margin: 1em;

  @media (max-width: 430px) {
    order: 2;
  }
  @media (max-width: 250px) {
    order: 3;
  }
`;

const shake = keyframes`
10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

let AnimatedOrangeButton = styled(OrangeButton)`
  animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  margin: 1em;
`;

let AnimatedMatchButton = styled(MatchButton)`
  animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
`;

let Input = styled.input`
  height: 1.5em;
  width: 60%;
  text-align: center;
  transition: all 0.3s;
  border-radius: 0.5em;

  &.wrong-border {
    border-style: solid;
    border-color: red !important;
  }

  &.almost-border {
    border-style: solid;
    border-color: ${zeeguuOrange} !important;
  }
  
  &:focus {
    outline: none !important;
    height: 1.7em;
    width: 80%;
  }

  @media (max-width: 430px) {
    order: 3;
  }
  @media (max-width: 250px) {
    order: 2;
  }
`;

let AnimatedInput = styled(Input)`
  animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;

  @media (max-width: 430px) {
    order: 3;
  }
  @media (max-width: 250px) {
    order: 2;
  }
`;

let BottomRow = styled.div`
  display: flex;
  padding: 0.5em;
  align-items: center;
  justify-content: space-around;
  margin-top: 3em;
  margin-bottom: 3em;

  @media (max-width: 430px) {
    flex-flow: row wrap;
  }
`;

let BottomRowCompact = styled.div`
  display: flex;
  padding: 0.5em;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 3em;

  @media (max-width: 430px) {
    flex-flow: row wrap;
  }
`;

let StyledGreyButton = styled.button`
  background: none !important;
  border: none !important;
  padding: 0 !important;
  margin-top: 1em;
  color: gray;
  text-decoration: underline;
  font-size: small !important;
  font-weight: 500;
  cursor: pointer;
  font-family: "Montserrat";
`;

let StyledDiv = styled.div`
  margin-top: 1em;
  color: gray;
`;

let ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

let CenteredRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

let CenteredRowTall = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1.5em;
`;

let EditSpeakButtonHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export {
  Exercise,
  FeedbackButton,
  OrangeButton,
  AnimatedOrangeButton,
  Input,
  AnimatedInput,
  BottomRow,
  BottomRowCompact,
  StyledGreyButton,
  StyledDiv,
  MatchButton,
  MatchingWords,
  AnimatedMatchButton,
  MatchButtonHolder,
  MatchButtonHolderRight,
  MatchInputHolder,
  MatchSpeakButtonHolder,
  ButtonRow,
  CenteredRow,
  CenteredRowTall,
  LeftFeedbackButton,
  RightFeedbackButton,
  EditSpeakButtonHolder,
  OrangeButtonMessage,
};

export default StyledButton;