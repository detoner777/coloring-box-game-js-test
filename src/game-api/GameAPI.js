import axios from "axios";

function getSassionDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toString().split(" ")[1];
  const year = date.getFullYear();
  const time = date
    .toString()
    .split(" ")[4]
    .slice(0, 5);

  return `${day} ${month} ${year}, ${time} `;
}

export default class GameAPI {
  constructor() {
    this.url = "https://starnavi-frontend-test-task.herokuapp.com/";
  }
  getSettings() {
    return axios
      .get(`${this.url}game-settings`)
      .then(res => res.data)
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }
  getWinners() {
    return axios
      .get(`${this.url}winners`)
      .then(res => res.data)
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }
  postWinner({ winner, userName }) {
    const data = {
      winner: winner === "user" ? userName : "Computer",
      date: getSassionDate()
    };
    return axios
      .post(`${this.url}winners`, data)
      .then(res => res.data)
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }
}
