import GameAPI from "../../game-api/GameAPI";
const FETCHED_WINNERS = "fetched_winners";
const REQUEST_SENT = "request_send";
const WINNERS_POSTED = "winners_posted";


export function postWinner(payload) {
  return function(dispatch) {
    dispatch({
      type: REQUEST_SENT
    });
    new GameAPI().postWinner(payload).then(res => {
      return dispatch({
        type: WINNERS_POSTED,
        data: res
      });
    });
  };
}

export function getWinners() {
  return function(dispatch) {
    dispatch({
      type: REQUEST_SENT
    });
    new GameAPI().getWinners().then(res => {
      return dispatch({
        type: FETCHED_WINNERS,
        data: res
      });
    });
  };
}
