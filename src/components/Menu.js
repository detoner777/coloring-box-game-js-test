import React from "react";
import Form from "react-bootstrap/Form";
import Message from "./Message";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default props => {
  const {
    winner,
    showMessage,
    startGame,
    startGameAgain,
    handleChangeSelect,
    handleChangeInput,
    selectedGameSettings,
    inputUserName,
    fetchGameSettings,
    gameStarted
  } = props;

  return (
    <div className="container">
      <Form className="form">
        {" "}
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Row>
            <Col>
              <Form.Control
                className="game-mod"
                as="select"
                value={selectedGameSettings}
                onChange={handleChangeSelect}
                size="lg"
              >
                <option>Pick Game Mode..</option>
                {Object.keys(fetchGameSettings).map(item => (
                  <option key={item} value={item}>
                    {item.split("M")[0].toUpperCase()}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col>
              <Form.Control
                className="user-name"
                type="text"
                placeholder="Enter your name"
                label="User Name"
                size="lg"
                variant="outlined"
                value={inputUserName}
                onChange={handleChangeInput}
              />
            </Col>

            <Col>
              {!winner ? (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={startGame}
                  disabled={
                    selectedGameSettings.length === 0 ||
                    selectedGameSettings === "Pick Game Mode.." ||
                    inputUserName === "" ||
                    gameStarted === true
                  }
                >
                  PLAY
                </Button>
              ) : (
                <Button
                  variant="info"
                  size="lg"
                  onClick={startGameAgain}
                  disabled={
                    selectedGameSettings.length === 0 ||
                    selectedGameSettings === "Pick Game Mode.." ||
                    inputUserName === "" ||
                    gameStarted === true
                  }
                >
                  PLAY AGAIN
                </Button>
              )}
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>{" "}
      {!showMessage ? (
        <div />
      ) : (
        <Message inputUserName={inputUserName} winner={winner} />
      )}
    </div>
  );
};
