import React, { useState, useEffect, useCallback, useContext } from "react";
// import SnakeImage from "./images/snake.jpg";
import { useApi } from "@/hooks/useApi"; // Make sure to import the hook
import { AppContext } from "@/App";
import "./App.css";
import Snake from "./Snake";
import Food from "./Food";
import Buttons from "./Buttons";

const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  food: getRandomFood(),
  direction: "RIGHT",
  speed: 100,
  snakeDots: [
    [8, 8],
    [8, 8],
  ],
  score: 0,
  isGameOver: false,
};

export function Game() {
  const api = useApi();
  const context = useContext(AppContext);
  const { user, updateUser } = context;
  const [isSnakeGameStart, setIsSnakeGameStart] = useState(false);
  const [food, setFood] = useState(initialState.food);
  const [direction, setDirection] = useState(initialState.direction);
  const [speed, setSpeed] = useState(initialState.speed);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(initialState.score);
  const [snakeDots, setSnakeDots] = useState(initialState.snakeDots);
  const [foodCount, setFoodCount] = useState(0);
  const [bigFood, setBigFood] = useState(initialState.bigFood);
  const [isBigFoodVisible, setIsBigFoodVisible] = useState(
    initialState.isBigFoodVisible
  );
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isSnakeGameStart && !isGameOver) {
      const moveSnakeInterval = setInterval(moveSnake, speed);
      document.onkeydown = onKeyDown;
      return () => {
        clearInterval(moveSnakeInterval);
        document.onkeydown = null;
      };
    }
  }, [direction, speed, isSnakeGameStart, isGameOver, snakeDots]);

  useEffect(() => {
    if (isSnakeGameStart && !isGameOver) {
      onSnakeOutOfBounds();
      onSnakeCollapsed();
      onSnakeEats();
    }
  }, [snakeDots]);

  const onKeyDown = (e) => {
    e.preventDefault();
    const { keyCode } = e;
    switch (keyCode) {
      case 37:
        if (direction !== "RIGHT") {
          setDirection("LEFT");
        }
        break;
      case 38:
        if (direction !== "DOWN") {
          setDirection("UP");
        }
        break;
      case 39:
        if (direction !== "LEFT") {
          setDirection("RIGHT");
        }
        break;
      case 40:
        if (direction !== "UP") {
          setDirection("DOWN");
        }
        break;
      default:
        break;
    }
  };

  const moveSnake = useCallback(() => {
    if (isSnakeGameStart && !isGameOver) {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];
      switch (direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
        default:
          break;
      }
      dots.push(head);
      dots.shift();
      setSnakeDots(dots);
    }
  }, [direction, snakeDots, isSnakeGameStart, isGameOver]);

  const onSnakeOutOfBounds = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      gameOver();
    }
  };

  const onSnakeCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    });
  };

  const onSnakeEats = () => {
    let head = snakeDots[snakeDots.length - 1];

    // Tolerance-based collision detection for regular food
    const tolerance = 3;
    let distanceX = Math.abs(head[0] - food[0]);
    let distanceY = Math.abs(head[1] - food[1]);

    // Check if the snake eats the regular food
    if (distanceX < tolerance && distanceY < tolerance) {
      setFood(getRandomFood());
      increaseSnake();
      setScore(score + 1);
      setFoodCount(foodCount + 1);
      increaseSpeed();

      if ((foodCount + 1) % 5 === 0) {
        showBigFood();
      }
    }

    // Check if the snake eats the big food
    if (isBigFoodVisible) {
      let distanceBigX = Math.abs(head[0] - bigFood[0]);
      let distanceBigY = Math.abs(head[1] - bigFood[1]);

      if (distanceBigX < tolerance && distanceBigY < tolerance) {
        onSnakeEatsBigFood();
      }
    }
  };

  const showBigFood = () => {
    console.log("big food");
    setBigFood(getRandomFood());
    setIsBigFoodVisible(true);
    setTimeout(() => {
      setIsBigFoodVisible(false);
    }, 5000);
  };

  const onSnakeEatsBigFood = () => {
    setScore(score + 5); // Increase score by 5
    setIsBigFoodVisible(false); // Hide the big food
  };

  // const onSnakeEats = () => {
  //   let head = snakeDots[snakeDots.length - 1];
  //   const tolerance = 3;
  //   let distanceX = Math.abs(head[0] - food[0]);
  //   let distanceY = Math.abs(head[1] - food[1]);

  //   if (distanceX < tolerance && distanceY < tolerance) {
  //     setFood(getRandomFood());
  //     increaseSnake();
  //     setScore(score + 1);
  //     increaseSpeed();
  //   }
  // };

  const increaseSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const increaseSpeed = () => {
    if (speed > 10) {
      setSpeed(speed - 10);
    }
  };

  const gameOver = () => {
    console.log("score", score);

    api.post(`/users/add-coins`, {
      telegramUserId: user?.id,
      coinsToAdd: score,
    });

    updateUser({
      token: user.token + score,
    });

    setIsGameOver(true);
  };

  const onRight = () => {
    if (direction !== "LEFT") {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];
      head = [head[0] + 2, head[1]];
      dots.push(head);
      dots.shift();
      setDirection("RIGHT");
      setSnakeDots(dots);
    }
  };

  const onLeft = () => {
    if (direction !== "RIGHT") {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];
      head = [head[0] - 2, head[1]];
      dots.push(head);
      dots.shift();
      setDirection("LEFT");
      setSnakeDots(dots);
    }
  };

  const onDown = () => {
    if (direction !== "UP") {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];
      head = [head[0], head[1] + 2];
      dots.push(head);
      dots.shift();
      setDirection("DOWN");
      setSnakeDots(dots);
    }
  };

  const onUp = () => {
    if (direction !== "DOWN") {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];
      head = [head[0], head[1] - 2];
      dots.push(head);
      dots.shift();
      setDirection("UP");
      setSnakeDots(dots);
    }
  };

  const startSnakeGame = () => {
    setIsSnakeGameStart(true);
    setIsGameOver(false);
    setIsFullScreen(true);
    setScore(0);
    setFood(initialState.food);
    setDirection(initialState.direction);
    setSpeed(initialState.speed);
    setSnakeDots(initialState.snakeDots);
  };

  const restartSnakeGame = () => {
    setIsSnakeGameStart(false);
    setIsGameOver(false);
    setIsFullScreen(false);
    setScore(0);
    setFood(initialState.food);
    setDirection(initialState.direction);
    setSpeed(initialState.speed);
    setSnakeDots(initialState.snakeDots);
  };

  const exitGame = () => {
    setIsSnakeGameStart(false);
    console.log(isSnakeGameStart);
    setIsFullScreen(false);
  };

  return (
    <div className={`container ${isFullScreen ? "fullscreen" : ""}`}>
      {isSnakeGameStart ? (
        <div className="game-info">
          <div className="flex justify-between w-full p-4">
            <p className="score">{score}</p>
            <button className="exit-btn text-white" onClick={exitGame}>
              X
            </button>
          </div>
          <div className="snake-box">
            {isGameOver ? (
              <div className="game-over">Game Over</div>
            ) : (
              <>
                <Snake snakeDots={snakeDots} />
                <Food dot={food} />
                {isBigFoodVisible && (
                  <Food type="big" dot={bigFood} className="big-food" />
                )}
              </>
            )}
          </div>
          {isGameOver ? (
            <p className="restart" onClick={restartSnakeGame}>
              Restart
            </p>
          ) : (
            <Buttons
              onLeft={onLeft}
              onRight={onRight}
              onUp={onUp}
              onDown={onDown}
            />
          )}
        </div>
      ) : (
        <div className="game-info">
          {/* <img src={SnakeImage} alt="snake" /> */}
          <h2 onClick={startSnakeGame}>Play Game</h2>
          {/* <p>
            internet is missing. welcome to the 60s. a time of no internet and
            great music.
          </p> */}
        </div>
      )}
    </div>
  );
}
