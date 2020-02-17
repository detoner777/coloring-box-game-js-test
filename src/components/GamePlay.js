import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as winnerAction from "../store/actions/actions";
import { clearPlayingField, play } from "../game-logic/GameLogic";
import GameAPI from "../game-api/GameAPI";
import Spinner from "react-bootstrap/Spinner";
import Menu from "./Menu";

export default () => {
  const dispatch = useDispatch();

  const [selectedGameSettings, setSelectedGameSettings] = useState("");
  const [inputUserName, setInputUserName] = useState("");
  const [fetchGameSettings, setGameSettings] = useState("");
  const [gameStarted, setGameStarted] = useState("");
  const [winner, setWinner] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const startGame = async () => {
    setGameStarted(true);
    const res = await play(fetchGameSettings[selectedGameSettings]);
    setWinner(res);
    setShowMessage(true);
    setGameStarted(false);

    const payload = { winner: res, userName: inputUserName };
    dispatch(winnerAction.postWinner(payload));
  };

  const startGameAgain = async () => {
    setGameStarted(true);
    clearPlayingField();
    setShowMessage(false);
    await startGame();
  };

  const handleChangeSelect = event => {
    setShowMessage(false);
    setSelectedGameSettings(event.target.value);
  };

  const handleChangeInput = event => {
    setShowMessage(false);
    setInputUserName(event.target.value);
  };
  useEffect(() => {
    (async function fetchData() {
      setGameSettings(await new GameAPI().getSettings());
    })();
  }, []);

  return (
    <div>
      {!fetchGameSettings ? (
        <Spinner animation="border" className="menu-spinner" />
      ) : (
        <Menu
          fetchGameSettings={fetchGameSettings}
          inputUserName={inputUserName}
          selectedGameSettings={selectedGameSettings}
          winner={winner}
          showMessage={showMessage}
          handleChangeSelect={handleChangeSelect}
          handleChangeInput={handleChangeInput}
          startGame={startGame}
          startGameAgain={startGameAgain}
          gameStarted={gameStarted}
        />
      )}
      <div className="gameplay-container" />
    </div>
  );
};
