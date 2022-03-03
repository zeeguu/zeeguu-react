import { useState, useEffect } from "react";
import * as s from "../Exercise.sc.js";

import SpeakButton from "../SpeakButton.js";
import strings from "../../../i18n/definitions";
import NextNavigation from "../NextNavigation";
import SolutionFeedbackLinks from "../SolutionFeedbackLinks";
import LoadingAnimation from "../../../components/LoadingAnimation.js";
import InteractiveText from "../../../reader/InteractiveText.js";
import shuffle from "../../../assorted/fisherYatesShuffle";
import removePunctuation from "../../../assorted/removePunctuation";
import { TranslatableText } from "../../../reader/TranslatableText.js";
import AudioTwoBotInput from "./AudioTwoBotInput";

const EXERCISE_TYPE = "TypeL2W_in_AudioL2";
export default function AudioExerciseTwo({
  api,
  bookmarksToStudy,
  correctAnswer,
  notifyIncorrectAnswer,
  setExerciseType,
  isCorrect,
  setIsCorrect,
  moveToNextExercise,
  toggleShow,
  reload,
  setReload,
}) {
  const [incorrectAnswer, setIncorrectAnswer] = useState("");
  const [initialTime] = useState(new Date());
  const [buttonOptions, setButtonOptions] = useState(null);
  const [messageToAPI, setMessageToAPI] = useState("");
  const [articleInfo, setArticleInfo] = useState();
  const [interactiveText, setInteractiveText] = useState();
  const [choiceOptions, setChoiceOptions] = useState(null);
  let selected = false;
  useEffect(() => {
    setExerciseType(EXERCISE_TYPE);
    api.wordsSimilarTo(bookmarksToStudy[0].id, (words) => {
      consolidateChoiceOptions(words);
    });
    api.getArticleInfo(bookmarksToStudy[0].article_id, (articleInfo) => {
      setInteractiveText(
        new InteractiveText(bookmarksToStudy[0].context, articleInfo, api)
      );
      setArticleInfo(articleInfo);
    });
    consolidateChoice();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function notifyChoiceSelection(selectedChoice) {
    console.log("checking result...");
    if (
      selectedChoice ===
      removePunctuation(bookmarksToStudy[0].from.toLowerCase())
    ) {
      correctAnswer(bookmarksToStudy[0]);
      setIsCorrect(true);
      let concatMessage = messageToAPI + "C";
      handleAnswer(concatMessage);
    } else {
      setIncorrectAnswer(selectedChoice);
      notifyIncorrectAnswer(bookmarksToStudy[0]);
      let concatMessage = messageToAPI + "W";
      setMessageToAPI(concatMessage);
    }
  }

  function buttonSelect() {
    console.log("button select detected");
    selected = true;
  }

  function handleShowSolution() {
    let pressTime = new Date();
    console.log(pressTime - initialTime);
    console.log("^^^^ time elapsed");
    let duration = pressTime - initialTime;
    let message = messageToAPI + "S";

    notifyIncorrectAnswer(bookmarksToStudy[0]);
    setIsCorrect(true);
    handleAnswer(message, duration);
  }

  function handleAnswer(message) {
    let pressTime = new Date();
    console.log(pressTime - initialTime);
    console.log("^^^^ time elapsed");

    api.uploadExerciseFeedback(
      message,
      EXERCISE_TYPE,
      pressTime - initialTime,
      bookmarksToStudy[0].id
    );
  }

  function consolidateChoiceOptions(similarWords) {
    let listOfOptions = [
      bookmarksToStudy[0].bookmark,
      bookmarksToStudy[1].bookmark,
      bookmarksToStudy[2].bookmark,
    ];
    let shuffledListOfOptions = shuffle(listOfOptions);
    setButtonOptions(shuffledListOfOptions);
  }

  function consolidateChoice() {
    let listOfchoices = [0, 1, 2];
    let shuffledListOfChoices = shuffle(listOfchoices);
    setChoiceOptions(shuffledListOfChoices);
  }

  if (!articleInfo) {
    return <LoadingAnimation />;
  }

  return (
    <s.Exercise>
      <div className="headlineWithMoreSpace">
        {strings.audioExerciseTwoHeadline}
      </div>
      <div className="contextExample">
        <TranslatableText
          isCorrect={isCorrect}
          interactiveText={interactiveText}
          translating={true}
          pronouncing={false}
          bookmarkToStudy={bookmarksToStudy[0].from}
        />
      </div>
      <s.CenteredRow>
        {choiceOptions ? (
          choiceOptions.map((option) =>
            0 !== option ? (
              <SpeakButton
                handleSelect={buttonSelect}
                bookmarkToStudy={bookmarksToStudy[option]}
                api={api}
                styling="selected"
                selected={selected}
              />
            ) : (
              <SpeakButton
                handleSelect={buttonSelect}
                bookmarkToStudy={bookmarksToStudy[option]}
                api={api}
                styling="selected"
              />
            )
          )
        ) : (
          <></>
        )}
      </s.CenteredRow>

      {isCorrect && <h1>{bookmarksToStudy[0].to}</h1>}

      {!buttonOptions && <LoadingAnimation />}
      {!isCorrect && (
        <AudioTwoBotInput
          buttonOptions={buttonOptions}
          notifyChoiceSelection={notifyChoiceSelection}
          incorrectAnswer={incorrectAnswer}
          setIncorrectAnswer={setIncorrectAnswer}
          handleShowSolution={handleShowSolution}
          toggleShow={toggleShow}
        />
      )}
      {isCorrect && (
        <NextNavigation
          api={api}
          bookmarksToStudy={bookmarksToStudy}
          moveToNextExercise={moveToNextExercise}
          reload={reload}
          setReload={setReload}
        />
      )}
      <SolutionFeedbackLinks
        handleShowSolution={handleShowSolution}
        toggleShow={toggleShow}
        isCorrect={isCorrect}
      />
    </s.Exercise>
  );
}
