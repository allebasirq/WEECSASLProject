import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision'

import modelAssetUrl from './models/gesture_recognizer_ASL.task?url';

// Create task for image file processing:
const vision = await FilesetResolver.forVisionTasks(
  // path/to/wasm/root
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);


// Gesture Recognizer, base settings, non-customized model
const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: modelAssetUrl // need to replace with custom model
  },
  runningMode: "VIDEO",
  numHands: 1
});

await gestureRecognizer.setOptions({ runningMode: "video" });

let lastVideoTime = -1; // seconds
let lastTimestamp = 0; // milliseconds

// Render the video, process results each frame
export function renderLoop(video, onResults, shouldContinue = () => true) {
// const video = document.getElementById("video"); // receive the video
if(!video || !shouldContinue()) return; // double checking if video exists

// Only process when the video has a new frame
  if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
    const timestamp = Math.max(Math.round(performance.now()), lastTimestamp + 1); // current milliseconds (get the max of both just in case)
    const gestureRecognitionResult = gestureRecognizer.recognizeForVideo(video, timestamp); // requires the video and timestamp in milliseconds
    processResult(gestureRecognitionResult, timestamp);

    if (onResults) {
      onResults(gestureRecognitionResult);
    }

    lastVideoTime = video.currentTime; // update seconds
    lastTimestamp = timestamp; // update milliseconds
  }

  // get the next frame
  if (shouldContinue()) {
    requestAnimationFrame(() => {
      renderLoop(video, onResults, shouldContinue);
    });
  }
}

// Get the name, score, and handedness from the results
export function processResult(result, timestamp) {
  const gesture = result.gestures?.[0]?.[0];
  const hand = result.handedness?.[0]?.[0];

  // if there is no gesture or hand recognized, return nothing (failsafe)
  if (!gesture || !hand) return;

  var categoryName = gesture.categoryName;
  if (categoryName == "")
    categoryName = "none";
  const categoryScore = (gesture.score * 100).toFixed(2); // from the demo
  const handedness = hand.displayName;

  // Name: (none = not a recognized sign, empty string = error with dataset, but treat the same as none)
  const resultObject = {categoryName, categoryScore, handedness, timestamp};
  const resultString = JSON.stringify(resultObject); // this is the JSON string that contains the result data

  // Log the category name, score, and handedness
  //console.log(resultString); // test
  console.log(`Category: ${categoryName}, Score: ${categoryScore}, Handedness: ${handedness}`);

  // Draw landmarks
  
}