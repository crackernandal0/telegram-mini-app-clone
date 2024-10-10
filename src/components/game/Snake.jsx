const Snake = (props) => {
  return (
    <div>
      {props.snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
          width: "20px",  // Increase snake size
          height: "20px",
        };

        // Different style for the head
        if (i === props.snakeDots.length - 1) {
          return <div className="snake-head" key={i} style={style} />;
        }

        // Different style for the tail (first dot)
        if (i === 0) {
          return <div className="snake-tail" key={i} style={style} />;
        }

        return <div className="snake-body" key={i} style={style} />;
      })}
    </div>
  );
};

export default Snake;
