import React, { useState } from "react";
import Button from "../Button/Button";
import { useTimer } from "../../../hooks/useTimer";
import "./Timer.css";

const Timer = () => {
  const { timerActive, timeRemaining, formatTime, startTimer, stopTimer } =
    useTimer();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTimerStart = (minutes) => {
    startTimer(minutes);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="timer-container">
      {!timerActive ? (
        <div className="timer-accordion">
          <button
            onClick={toggleExpanded}
            className="timer-toggle-btn"
            aria-label="Timer options"
          >
            <span className="timer-icon">⏱</span>
            {isExpanded && <span className="timer-label">Start Timer</span>}
          </button>

          {isExpanded && (
            <div className="timer-presets">
              <button
                onClick={() => handleTimerStart(5)}
                className="timer-preset-btn"
              >
                5 min
              </button>
              <button
                onClick={() => handleTimerStart(10)}
                className="timer-preset-btn"
              >
                10 min
              </button>
              <button
                onClick={() => handleTimerStart(15)}
                className="timer-preset-btn"
              >
                15 min
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="timer-active">
          <div
            className={`timer-display ${timeRemaining < 60 ? "timer-ending" : ""}`}
          >
            {formatTime(timeRemaining)}
          </div>
          <Button
            onClick={stopTimer}
            variant="danger"
            className="timer-stop-btn"
          >
            Stop
          </Button>
        </div>
      )}
    </div>
  );
};

export default Timer;
