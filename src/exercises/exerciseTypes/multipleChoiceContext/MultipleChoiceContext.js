import { useState, useEffect, useContext } from "react";
import * as s from "../Exercise.sc.js";
import strings from "../../../i18n/definitions";
import NextNavigation from "../NextNavigation";
import LoadingAnimation from "../../../components/LoadingAnimation.js";
import InteractiveText from "../../../reader/InteractiveText.js";
import { SpeechContext } from "../../../contexts/SpeechContext.js";
import useSubSessionTimer from "../../../hooks/useSubSessionTimer.js";
import shuffle from "../../../assorted/fisherYatesShuffle";
import exerciseTypes from "../../ExerciseTypeConstants.js";
import LearningCycleIndicator from "../../LearningCycleIndicator.js";

const EXERCISE_TYPE = exerciseTypes.multipleChoiceContext;

export default function MultipleChoiceContext({
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
  exerciseSessionId,
  activeSessionDuration,
}) {
  const [messageToAPI, setMessageToAPI] = useState("");
  const [exerciseBookmarks, setExerciseBookmarks] = useState(null);
  const [interactiveText, setInteractiveText] = useState(null);
  const speech = useContext(SpeechContext);
  const [getCurrentSubSessionDuration] = useSubSessionTimer(
    activeSessionDuration,
  );
  const [incorrectAnswer, setIncorrectAnswer] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedOption, setClickedOption] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setExerciseType(EXERCISE_TYPE);
    let initExerciseBookmarks = [...bookmarksToStudy];
    for (let i = 0; i < initExerciseBookmarks.length; i++) {
      if (i === 0)
        initExerciseBookmarks[i].isExercise = true
      else
        initExerciseBookmarks[i].isExercise = false
    }
    setExerciseBookmarks(shuffle(initExerciseBookmarks));

    setInteractiveText(
      new InteractiveText(
        bookmarksToStudy[0].context,
        bookmarksToStudy[0].from_lang,
        bookmarksToStudy[0].article_id,
        api,
        "TRANSLATE WORDS IN EXERCISE",
        EXERCISE_TYPE,
        speech,
      ),
    );
  }, []);

  function handleShowSolution() {
    let message = messageToAPI + "S";
    notifyIncorrectAnswer(bookmarksToStudy[0]);
    setIsCorrect(true);
    handleAnswer(message);
    setShowSolution(true);
  }

 function notifyChoiceSelection(selectedChoiceId, selectedChoiceContext, index, e) {
    if(isCorrect) return;
    setClickedOption(index);
    if (
        selectedChoiceId === bookmarksToStudy[0].id
    ) {
        setShowSolution(true);
        setClickedIndex(index);
        correctAnswer(bookmarksToStudy[0]);
        setIsCorrect(true);
        let concatMessage = messageToAPI + "C";
        handleAnswer(concatMessage);
    } else {
        setClickedIndex(null);
        setIncorrectAnswer(selectedChoiceId);
        notifyIncorrectAnswer(bookmarksToStudy[0]);
        let concatMessage = messageToAPI + "W";
        setMessageToAPI(concatMessage);
            setTimeout(() => {
              setClickedOption(null);
            }, 500)
    }
  }

  function handleAnswer(message) {
    setMessageToAPI(message);
    api.uploadExerciseFinalizedData(
      message,
      EXERCISE_TYPE,
      getCurrentSubSessionDuration(activeSessionDuration, "ms"),
      bookmarksToStudy[0].id,
      exerciseSessionId,
    );
  }

  function getHighlightedWord(word){
    return `<span class="highlightedWord">${word}</span>`;
  }

  if (!interactiveText) {
    return <LoadingAnimation />;
  }

  return (
    <s.Exercise className="findWordInContext">
      <div className="headlineWithMoreSpace">
        {strings.multipleChoiceContextHeadline}
      </div>
      <div className="learningCycleIndicator">
        <LearningCycleIndicator
          learningCycle={bookmarksToStudy[0].learning_cycle}
          coolingInterval={bookmarksToStudy[0].cooling_interval}
        />
      </div>
      <h1 className="wordInContextHeadline">{bookmarksToStudy[0].from}</h1>
        {exerciseBookmarks.map((option, index) => (
            <s.MultipleChoiceContext 
                key={index} 
                clicked={index === clickedIndex}
                isCorrect={isCorrect}
                className={clickedOption !== null ? (index === clickedOption) ? (option.isExercise) ? "correct" : "wrong" : "" : ""}
                onClick={(e) => notifyChoiceSelection(option.id, option.context, index, e)}>
                <div dangerouslySetInnerHTML={{ __html: showSolution
                        ? (option.isExercise ? option.context.replace(option.from, getHighlightedWord(option.from)) : option.context.replace(option.from, `<b>${option.from}</b>`))
                        : option.context.replace(option.from, '_____')
                      }}/>
            </s.MultipleChoiceContext>
        ))}

      <NextNavigation
        message={messageToAPI}
        api={api}
        bookmarksToStudy={bookmarksToStudy}
        moveToNextExercise={moveToNextExercise}
        reload={reload}
        setReload={setReload}
        handleShowSolution={(e) => handleShowSolution(e, undefined)}
        toggleShow={toggleShow}
        isCorrect={isCorrect}
      />
    </s.Exercise>
  );
}
