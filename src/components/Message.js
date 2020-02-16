import React from "react";

function Message(props) {
  const { winner, inputUserName } = props;

  return (
    <div className="winner-message">
      <div>
        {winner === "user" ? (
          <p> Player {inputUserName} win!</p>
        ) : (
          <p>Computer win!</p>
        )}
      </div>
    </div>
  );
}

export default Message;
