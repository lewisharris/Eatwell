import React from "react";

export default function WelcomeMessage(props) {
  const remainingCalories = props.leftCal;
  return (
    <div>
      {remainingCalories > 0 ? (
        <div>
          <div> Nice one {props.name}!</div>
          Its looking like you're on track to stick to your plan today. Keep it
          up!
        </div>
      ) : (
        <div>
          <div>Uh-oh {props.name}!</div> it looks like you've gone over your
          calories for the day. Try to stay under your target in future to
          achieve your goals.
        </div>
      )}
    </div>
  );
}
