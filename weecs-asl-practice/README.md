# WEECS ASL Practice

A browser-based prototype for practicing selected American Sign Language fingerspelling letters. The current practice session uses ten rounds, awards 10 points for a correct recognized letter, and awards zero points while resetting the streak for a skipped round.

## Run locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To run the automated tests and production build:

```sh
npm run test -- --run
npm run build
```

## Practice and saved progress

Practice prompts use the supported-letter set defined in `src/game/gameLogic.js`. Predictions are accepted only while a session is active, only when marked stable, and only when the event timestamp is recent and newer than the last accepted event. Paused, completed, loading, error, missing, unsupported, duplicate, and stale predictions cannot award points.

Completed sessions are saved in the browser under the `aslPracticeProgress` localStorage key. The Progress page lists results and can reset this application’s saved history; it does not clear unrelated browser storage. Incomplete sessions and webcam media are not saved. If browser storage is unavailable or contains invalid data, the app reports the issue and practice logic remains usable.

The prediction controls on the Practice page are development mocks. Real camera-model prediction delivery still requires integration with the hand-tracking component.

## Limitations

This is a learning prototype, not a complete ASL course or authoritative assessment of signing ability. It practices selected static letters only and does not recognize words or sentences.
