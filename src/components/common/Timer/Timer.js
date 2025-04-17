import React from "react";
import Button from "../Button/Button";
import { useTimer } from "../../../hooks/useTimer";
import "./Timer.css";

const Timer = () => {
  const { timerActive, timeRemaining, formatTime, startTimer, stopTimer } =
    useTimer();

  return (
    <div className="timer-container">
      <div className="timer-controls">
        {!timerActive ? (
          <>
            <Button onClick={() => startTimer(5)} className="timer-btn">
              5 Min Timer
            </Button>
            <Button onClick={() => startTimer(10)} className="timer-btn">
              10 Min Timer
            </Button>
            <Button onClick={() => startTimer(15)} className="timer-btn">
              15 Min Timer
            </Button>
          </>
        ) : (
          <Button
            onClick={stopTimer}
            variant="danger"
            className="timer-stop-btn"
          >
            Stop Timer
          </Button>
        )}
      </div>
      {timerActive && (
        <div
          className={`timer-display ${timeRemaining < 60 ? "timer-ending" : ""}`}
        >
          Time Remaining: {formatTime(timeRemaining)}
        </div>
      )}
    </div>
  );
};

export default Timer;
