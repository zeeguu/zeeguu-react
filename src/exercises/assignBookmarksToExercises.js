import { random } from "../utils/basic/arrays";

/**
 * The bookmarks fetched by the API are assigned to the various exercises in the defined exercise session --
 * with the required amount of bookmarks assigned to each exercise and the first set of bookmarks set as
 * currentBookmarksToStudy to begin the exercise session.
 */
function assignBookmarksToExercises(bookmarks, exerciseTypesList) {
  console.log("about to test:");
  console.log(bookmarks);

  const learningCycleEnum = Object.freeze({
    0: "not set",
    1: "receptive",
    2: "productive",
  });

  let exerciseSequence = [];
  let exerciseType_i = 0;
  let bookmark_i = 0;

  const hasLearningCycle = exerciseTypesList.some(exercise => 'learningCycle' in exercise);

  if (hasLearningCycle) {
    for (let i = 0; i < bookmarks.length; i++) {
      // Filter the exercises based on the learning_cycle attribute of the bookmark
      let filteredExercises = exerciseTypesList.filter(exercise => 
        learningCycleEnum[bookmarks[i].learning_cycle] === exercise.learningCycle
      );
      
      let suitableExerciseFound = false;
      while (filteredExercises.length > 0 && !suitableExerciseFound) {
        let selectedExercise = random(filteredExercises);
        
        // Check if there are enough bookmarks for the selected exercise
        if (i + selectedExercise.requiredBookmarks <= bookmarks.length) {
          let exercise = {
            type: selectedExercise.type,
            bookmarks: bookmarks.slice(i, i + selectedExercise.requiredBookmarks),
          };
          exerciseSequence.push(exercise);

          // Skip the assigned bookmarks
          i += selectedExercise.requiredBookmarks - 1;
          suitableExerciseFound = true;
        } else {
          filteredExercises = filteredExercises.filter(exercise => exercise !== selectedExercise);
        }
      }
      
      // Move to the next exercise type, cycling back to the first one if necessary
      exerciseType_i++;
      if (exerciseType_i === exerciseTypesList.length) exerciseType_i = 0;
    }
    return exerciseSequence;

  } else {
    while (bookmark_i < bookmarks.length) {
      let currExRequiredBookmarks =
        exerciseTypesList[exerciseType_i].requiredBookmarks;

      if (bookmark_i + currExRequiredBookmarks <= bookmarks.length) {
        let exercise = {
          type: exerciseTypesList[exerciseType_i].type,
          bookmarks: bookmarks.slice(
            bookmark_i,
            bookmark_i + currExRequiredBookmarks,
          ),
        };
        exerciseSequence.push(exercise);
        bookmark_i += currExRequiredBookmarks;
      }
      exerciseType_i++;
      if (exerciseType_i === exerciseTypesList.length) exerciseType_i = 0;
    }
    return exerciseSequence;
  }
}

export { assignBookmarksToExercises };
