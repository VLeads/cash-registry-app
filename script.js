const billAmt = document.querySelector("#billAmt");

const billBtn = document.querySelector("#billBtn");

const cashGiven = document.querySelector(".cashGiven");
const cashGivenInput = document.querySelector("#cashGivenInput");
const checkBtn = document.querySelector("#checkBtn");

const returnAmt = document.querySelector("#return");

const errMsg = document.querySelector(".errMsg");

const change = document.querySelector(".change");

const noOfNotes = document.querySelectorAll(".noOfNotes");

const notes = [2000, 500, 100, 20, 10, 5, 1];
// const billWarning = document.querySelector("#billWarning");

cashGiven.style.display = "none";
change.style.display = "none";

billBtn.addEventListener("click", () => {
  hideError();
  const billVal = billAmt.value;
  if (billVal > 0) {
    billBtn.style.display = "none";
    cashGiven.style.display = "block";
  } else {
    cashGiven.style.display = "none";
    showError("Enter valid bill amount");
  }
});

checkBtn.addEventListener("click", () => {
  hideError();
  let cashVal = Number(cashGivenInput.value);
  let billVal = Number(billAmt.value);
  if (cashVal > 0) {
    if (cashVal < billVal) {
      extra = billVal - cashVal;
      showError(`You have to pay "${extra}" more`);
    } else if (cashVal == billVal) {
      console.log("no amount");
      showError("No Amount is left to returned");
    } else {
      calculateNotes(billVal, cashVal);
    }
  } else {
    showError("Enter valid bill amount & cash given to continue");
  }
});

function calculateNotes(bill, cash) {
  // clearNotes();
  hideError();
  let returnAmount = cash - bill;
  returnAmt.textContent = "Return Change : " + returnAmount;

  if (returnAmount < 1) {
    showError("No amount should be returned");
    return;
  }

  change.style.display = "block";

  for (let i = 0; i < notes.length; i++) {
    returnAmount = compareNotes(returnAmount, notes[i], i);
  }
}

function compareNotes(remainder, noteAmt, index) {
  if (remainder >= noteAmt) {
    let note = Math.floor(remainder / noteAmt);
    remainder = remainder - note * noteAmt;
    noOfNotes[index].innerText = `${note}`;
  }
  return remainder;
}

// to clear note counting on every new click
function clearNotes() {
  for (let note of noteAmt) {
    notes.innerText = "";
  }
}

function showError(text) {
  errMsg.style.display = "block";
  errMsg.innerText = text;
  change.style.display = "none";
}

function hideError() {
  errMsg.style.display = "none";
}
