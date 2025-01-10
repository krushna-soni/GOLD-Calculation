document.getElementById("calculate-btn").addEventListener("click", calculateRates);
document.getElementById("back-btn").addEventListener("click", () => {
  document.getElementById("table-section").style.display = "none";
  document.getElementById("input-section").style.display = "block";
});

document.getElementById("save-btn").addEventListener("click", saveTable);

function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear()).slice(2);
  return day + '-' + month + '-' + year;
}
function roundoff(Rate, isBuying) {
  let rate; 

  if (isBuying) {
    rate = Math.floor(Rate);
    let lastDigit = rate % 10;
    if (lastDigit >= 1 && lastDigit <= 4) {
      rate -= lastDigit;
    } else if (lastDigit >= 6 && lastDigit <= 9) {
      rate += 5 - lastDigit;
    }
  } else {
    rate = Math.ceil(Rate);
    let lastDigit = rate % 10;
    if (lastDigit >= 1 && lastDigit <= 4) {
      rate += 5 - lastDigit;
    } else if (lastDigit >= 6 && lastDigit <= 9) {
      rate += 10 - lastDigit;
    }
  }

  return rate; 
}

function calculateRates() {
  const goldRate = parseFloat(document.getElementById("gold-rate").value);
  const buyingMargin = parseFloat(document.getElementById("buying-margin").value);
  const sellingMargin = parseFloat(document.getElementById("selling-margin").value);

  if (isNaN(goldRate) || isNaN(buyingMargin) || isNaN(sellingMargin)) {
    alert("માન્ય ડેટા નાખો.");
    return;
  }

  if (buyingMargin < 0 || buyingMargin > 100 || sellingMargin < 0 || sellingMargin > 100) {
    alert("માર્જિન 0 થી 100 માં નાખો");
    return;
  }

  const calculateGoldRate = (percentage, margin) => (goldRate / 10) * percentage / (1 + (margin / 100));
  const calculateTotalPerGram = (percentage, margin) => (goldRate / 10) * percentage / (1 - (margin / 100));

  const goldRate22 = roundoff(calculateGoldRate(0.915, buyingMargin), true);
  const totalPerGram22 = roundoff(calculateTotalPerGram(0.98, sellingMargin), false);
  const makingCharges22 = (totalPerGram22 - goldRate22);

  const goldRate20 = roundoff(calculateGoldRate(0.83, buyingMargin), true);
  const totalPerGram20 = roundoff(calculateTotalPerGram(0.90, sellingMargin), false);
  const makingCharges20 = (totalPerGram20 - goldRate20);

  const goldRate18 = roundoff(calculateGoldRate(0.75, buyingMargin), true);
  const totalPerGram18 = roundoff(calculateTotalPerGram(0.82, sellingMargin), false);
  const makingCharges18 = (totalPerGram18 - goldRate18);

  document.getElementById("table-heading").innerText = goldRate;

  const formattedDate = getFormattedDate();
  document.getElementById('dateCell').innerText = formattedDate;

  document.getElementById("gold-rate-22").innerText = goldRate22*10;
  document.getElementById("making-charges-22").innerText = makingCharges22;
  document.getElementById("total-per-gram-22").innerText = totalPerGram22;

  document.getElementById("gold-rate-20").innerText = goldRate20*10;
  document.getElementById("making-charges-20").innerText = makingCharges20;
  document.getElementById("total-per-gram-20").innerText = totalPerGram20;

  document.getElementById("gold-rate-18").innerText = goldRate18*10;
  document.getElementById("making-charges-18").innerText = makingCharges18;
  document.getElementById("total-per-gram-18").innerText = totalPerGram18;

  document.getElementById("input-section").style.display = "none";
  document.getElementById("table-section").style.display = "block";
}

function saveTable() {
  const tableContainer = document.getElementById('table-section');
  const saveButton = document.getElementById('save-btn');
  const backButton = document.getElementById('back-btn');

  // Temporarily hide buttons
  saveButton.style.display = 'none';
  backButton.style.display = 'none';

  html2canvas(tableContainer).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'rateTable.jpg';
    link.click();

    // Show buttons again
    saveButton.style.display = 'block';
    backButton.style.display = 'block';
  });
}