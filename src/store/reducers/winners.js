const FETCHED_WINNERS = "fetched_winners";
const REQUEST_SENT = "request_send";
const WINNERS_POSTED = "winners_posted";

const initState = {
  loaded: false,
  winners: []
};

export default function(state = initState, action) {
  switch (action.type) {
    case REQUEST_SENT:
      return {
        ...state,
        ...{
          loaded: false
        }
      };
    case FETCHED_WINNERS:
      return {
        ...state,
        ...{
          winners: action.data,
          loaded: true
        }
      };
    case WINNERS_POSTED:
      return {
        ...state,
        ...{
          winners: action.data,
          loaded: true
        }
      };
    default:
      return state;
  }
}
