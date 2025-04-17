import { useState, useRef, useCallback, useEffect } from "react";

export const useTimer = () => {
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerIntervalRef = useRef(null);

  const startTimer = useCallback((minutes) => {
    // Clear any existing timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    const durationInSeconds = minutes * 60;
    setTimerDuration(durationInSeconds);
    setTimeRemaining(durationInSeconds);
    setTimerActive(true);

    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer complete
          clearInterval(timerIntervalRef.current);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setTimerActive(false);
    setTimeRemaining(0);
  }, []);

  // Format seconds to mm:ss
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  return {
    timerActive,
    timeRemaining,
    formatTime,
    startTimer,
    stopTimer,
  };
};
