import React from "react";

const Food = (props) => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`,
  };

  // Apply different class if it's big food
  const foodClass = props.type === "big" ? "big-food" : "food";
// console.log('fodClass',foodClass)
  return <div className={foodClass} style={style} />;
};

export default Food;
