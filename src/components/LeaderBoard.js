import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as winnersList from "../store/actions/actions";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";

const spinners = () => {
  return (
    <div className="spinners">
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </div>
  );
};

export default function LeaderBoard() {
  const dispatch = useDispatch();
  const winnersState = useSelector(state => state.winners);
  const { winners, loaded } = winnersState;

  useEffect(() => {
    dispatch(winnersList.getWinners());
  }, [dispatch]);

  return (
    <div className="container-sm">
      <p>Leader board</p>
      <ListGroup as="ul">
        {!loaded
          ? spinners()
          : winners
              .reverse()
              .filter((item, key) => key < 10)
              .map(item => (
                <div key={item.id}>
                  <ListGroup.Item>
                    {item.winner} {item.date}
                  </ListGroup.Item>
                </div>
              ))}
      </ListGroup>
    </div>
  );
}
