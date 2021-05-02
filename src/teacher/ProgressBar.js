import React, { useEffect, useState } from "react";
import * as s from "./ProgressBar.sc";

const ProgressBar = ({ student }) => {
  const [readingTimeString, setReadingTimeString] = useState("");
  const [exerciseTimeString, setExerciseTimeString] = useState("");

  useEffect(() => {
    const readingHours = Math.floor(student.reading_time / 3600);
    const readingMinutes = Math.ceil((student.reading_time / 60) % 60);
    readingHours < 1
      ? setReadingTimeString(readingMinutes + "m")
      : setReadingTimeString(readingHours + "h " + readingMinutes + "m");

    const exerciseHours = Math.floor(student.exercises_done / 3600);
    const exerciseMinutes = Math.ceil((student.exercises_done / 60) % 60);
    exerciseHours < 1
    ? setExerciseTimeString(exerciseMinutes + "m")
    : setExerciseTimeString(exerciseHours + "h " + exerciseMinutes + "m");
    // eslint-disable-next-line
  }, [student]);

  const setReadingCorners = () => {
    let readingCorners = "25px 0 0 25px";
    if (student.exercises_done === 0) {
      readingCorners = "25px";
    }
    return readingCorners;
  };

  const setExerciseCorners = () => {
    let exerciseCorners = "0 25px 25px 0";
    if (student.reading_time === 0) {
      exerciseCorners = "25px";
    }
    return exerciseCorners;
  };

  return (
    <s.ProgressBar
      readingCorners={() => setReadingCorners()}
      exerciseCorners={() => setExerciseCorners()}
    >
      <div
        className="activity-bar"
        style={{
          width: student.normalized_activity_proportion + "%",
        }}
      >
        <div
          className="activity-bar"
          id="reading"
          style={{
            width: student.learning_proportion + "%",
          }}
        >
          {/* Not showing the reading time if it is less than 3 min */}
          {student.reading_time > 120 ? readingTimeString : ""}
        </div>
        <div
          className="activity-bar"
          id="exercises"
          style={{
            width: 100 - student.learning_proportion + "%",
          }}
        >
          {/* Not showing the exercise time if it is less than 3 min */}
          {student.exercises_done > 120 ? exerciseTimeString : ""}
        </div>
      </div>
    </s.ProgressBar>
  );
};
export default ProgressBar;
