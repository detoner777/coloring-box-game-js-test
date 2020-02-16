function delayByTimeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

function createDivChild(rowCount, colCount) {
  const div = document.createElement("div");
  div.className = `flex-child child-${rowCount}-${colCount}`;

  return div;
}

function createRow(rowCount, sizePlayingField) {
  const div = document.createElement("div");
  div.className = `flex flex-${rowCount}`;

  for (let colCount = 0; colCount < sizePlayingField; colCount++) {
    div.appendChild(createDivChild(rowCount, colCount));
  }

  return div;
}

export function createPlayingField(sizePlayingField) {
  const playingFieldContainer = document.body.querySelector(
    ".gameplay-container"
  );
  for (let rowCount = 0; rowCount < sizePlayingField; rowCount++) {
    playingFieldContainer.appendChild(createRow(rowCount, sizePlayingField));
  }
}

export function selectRandomChildField(num) {
  const firstRandomNum = Math.floor(Math.random() * num);
  const secondRandomNum = Math.floor(Math.random() * num);
  const randomDiv = document.body.querySelector(
    `.flex-child.child-${firstRandomNum}-${secondRandomNum}`
  );

  if (
    randomDiv.classList.contains("user") ||
    randomDiv.classList.contains("computer")
  ) {
    selectRandomChildField(num);
  } else {
    randomDiv.classList.add("selected");
  }
}

export function score() {
  const userDivCount = document.body.querySelectorAll(".user").length;
  const computerDivCount = document.body.querySelectorAll(".computer").length;
  return { user: userDivCount, computer: computerDivCount };
}

export function clearPlayingField() {
  const playingFieldContainer = document.body.querySelector(
    ".gameplay-container"
  );
  playingFieldContainer.innerHTML = "";
}

export function endGame(field) {
  const { user, computer } = score();
  return (
    user - Math.round(Math.pow(field, 2) / 2) >= 0 ||
    computer - Math.round(Math.pow(field, 2) / 2) >= 0
  );
}
export async function managedToClickSelectedChildField(delay) {
  const selectedDiv = document.body.querySelector(".selected");

  selectedDiv.addEventListener("click", function() {
    this.classList.remove("selected");
    this.classList.add("user");
  });

  await delayByTimeout(delay);

  if (!selectedDiv.classList.contains("user")) {
    selectedDiv.classList.remove("selected");
    selectedDiv.classList.add("computer");
  }
}
function determinateOfWinner() {
  const { user, computer } = score();
  return user > computer ? "user" : "computer";
}

async function logicGame(field, delay) {
  selectRandomChildField(field);
  await managedToClickSelectedChildField(delay);

  if (endGame(field)) {
    return determinateOfWinner();
  } else {
    return logicGame(field, delay);
  }
}

export async function play({ field, delay }) {
  clearPlayingField();
  createPlayingField(field);
  return logicGame(field, delay);
}
