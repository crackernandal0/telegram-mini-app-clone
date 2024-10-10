import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useApi } from "@/hooks/useApi"; // Make sure to import the hook
import { AppContext } from "@/App";
import "./mine.css";

let url = "https://api.needup.in";

export function Mine({ customerId }) {
  const api = useApi();
  const context = useContext(AppContext);
  const { user, updateUser } = context;
  const [mining, setMining] = useState(false);
  const [value, setValue] = useState(0); // Mining value
  const [timeLeft, setTimeLeft] = useState(0); // Remaining time in seconds
  const [miningEndTime, setMiningEndTime] = useState(null); // Store mining end time
  const [miningStartTime, setMiningStartTime] = useState(null); // Store mining start time
  const [claimed, setClaimed] = useState(false); // To handle claim status

  useEffect(() => {
    const fetchMiningStatus = async () => {
      try {
        const response = await axios.get(
          `${url}/users/mine-status/${customerId}`
        );
        const { isMining, miningEndTime, miningStartTime } = response.data.data;

        if (isMining) {
          const currentTime = new Date();
          const endTime = new Date(miningEndTime);
          const startTime = new Date(miningStartTime);
          const timePassed = Math.floor((currentTime - startTime) / 1000); // Time passed since mining started in seconds
          const timeRemaining = Math.floor((endTime - currentTime) / 1000); // Time remaining in seconds
          console.log("time", timePassed);
          setMiningStartTime(startTime);
          setMiningEndTime(endTime);
          setTimeLeft(timeRemaining);
          setMining(true);
          setValue(parseFloat((timePassed * 0.025).toFixed(3)));
        }
      } catch (error) {
        console.error("Error fetching mining status", error);
      }
    };

    fetchMiningStatus();
  }, [customerId]);

  useEffect(() => {
    let interval;
    if (mining && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1); // Countdown
        setValue((prev) => parseFloat((prev + 0.025).toFixed(3))); // Increment mining value based on the real-time mining process
      }, 1000);

      if (timeLeft === 0) {
        clearInterval(interval);
        setMining(false);
      }
    }
    return () => clearInterval(interval);
  }, [mining, timeLeft]);

  // Handle starting mining
  const handleStartMining = async () => {
    try {
      const response = await axios.post(`${url}/users/start-mine`, {
        customerId,
        duration: 12, // 12 hours or seconds for testing
      });
      const miningEnd = new Date(response.data.data.miningEndTime);
      const miningStart = new Date(response.data.data.miningStartTime);
      const timeRemaining = Math.floor((miningEnd - new Date()) / 1000); // Calculate time left in seconds

      setMiningStartTime(miningStart);
      setMiningEndTime(miningEnd);
      setTimeLeft(timeRemaining);
      setMining(true);
      setValue(0); // Reset mining value
      setClaimed(false); // Reset claim status
    } catch (error) {
      console.error("Error starting mining", error);
    }
  };

  // Handle claiming the token
  const handleClaimToken = () => {
    // Simulate the claim process
    api.post(`/users/add-coins`, {
      telegramUserId: customerId,
      coinsToAdd: value,
    });

    updateUser({
      token: user.token + value,
    });
    setClaimed(true); // After claiming, the button to start mining again should appear
    setMining(false); // Ensure mining is stopped
    setValue(0); // Reset mining value for the next session
  };

  return (
    <div className="mine-container">
      {!mining && !claimed ? (
        // Start Mining Button
        <button onClick={handleStartMining} className="start-mining-btn">
          Start Mining
        </button>
      ) : mining && timeLeft > 0 ? (
        // Mining is active and time is left
        <footer className="farming">
          <p>⚡ Mining {value}</p>
          <p className="time-left">{`Time left: ${Math.floor(
            timeLeft / 3600
          )}h ${Math.floor((timeLeft % 3600) / 60)}m ${timeLeft % 60}s`}</p>
        </footer>
      ) : (
        // Show Claim Token button after mining ends
        <button onClick={handleClaimToken} className="claim-token-btn">
          Claim Token
        </button>
      )}

      {/* Show the Start Mining button again after claiming */}
      {claimed && (
        <button onClick={handleStartMining} className="start-mining-btn">
          Start Mining Again
        </button>
      )}
    </div>
  );
}
