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
  const buyingMarginSJ = parseFloat(document.getElementById("buying-margin-sj").value);
  const buyingMarginOther = parseFloat(document.getElementById("buying-margin-other").value);
  const sellingMargin = parseFloat(document.getElementById("selling-margin").value);
  const wastage = parseFloat(document.getElementById("wastage").value);

  if (isNaN(goldRate) || isNaN(buyingMarginSJ) || isNaN(buyingMarginOther) || isNaN(sellingMargin) || isNaN(wastage)) {
    alert("માન્ય ડેટા નાખો.");
    return;
  }

  if (buyingMarginSJ < 0 || buyingMarginSJ > 100 || buyingMarginOther < 0 || buyingMarginOther > 100 || sellingMargin < 0 || sellingMargin > 100 ) {
    alert("માર્જિન 0 થી 100 માં નાખો");
    return;
  }

  const calculateGoldRate = (percentage, margin) => (goldRate / 10) * percentage / (1 + (margin / 100));
  const calculateTotalPerGram = (percentage, margin) => (goldRate / 10) * percentage / (1 - (margin / 100));

  const goldRate22Sj = roundoff(calculateGoldRate(0.915, buyingMarginSJ), true);
  const goldRate22Other = roundoff(calculateGoldRate(0.915, buyingMarginOther), true);
  const totalPerGram22 = roundoff(calculateTotalPerGram(0.92+(wastage/100), sellingMargin), false);
  const makingCharges22 = (totalPerGram22 - goldRate22Sj);

  const goldRate20Sj = roundoff(calculateGoldRate(0.83, buyingMarginSJ), true);
  const goldRate20Other = roundoff(calculateGoldRate(0.83, buyingMarginOther), true);
  const totalPerGram20 = roundoff(calculateTotalPerGram(0.84+(wastage/100), sellingMargin), false);
  const makingCharges20 = (totalPerGram20 - goldRate20Sj);

  const goldRate18Sj = roundoff(calculateGoldRate(0.75, buyingMarginSJ), true);
  const goldRate18Other = roundoff(calculateGoldRate(0.75, buyingMarginOther), true);
  const totalPerGram18 = roundoff(calculateTotalPerGram(0.76+(wastage/100), sellingMargin), false);
  const makingCharges18 = (totalPerGram18 - goldRate18Sj);

  const goldRate16Sj = roundoff(calculateGoldRate(0.67, buyingMarginSJ), true);
  const goldRate16Other = roundoff(calculateGoldRate(0.65, buyingMarginOther), true);
  const totalPerGram16 = roundoff(calculateTotalPerGram(0.68+(wastage/100), sellingMargin), false);
  const makingCharges16 = (totalPerGram16 - goldRate16Sj);

  const goldRate12Sj = roundoff(calculateGoldRate(0.47, buyingMarginSJ), true);
  const goldRate12Other = roundoff(calculateGoldRate(0.45, buyingMarginOther), true);
  const totalPerGram12 = roundoff(calculateTotalPerGram(0.50+(wastage/100), sellingMargin), false);
  const makingCharges12 = (totalPerGram12 - goldRate12Sj);

  document.getElementById("table-heading").innerText = goldRate;

  const formattedDate = getFormattedDate();
  document.getElementById('dateCell').innerText = formattedDate;

  document.getElementById("gold-rate-22-sj").innerText = goldRate22Sj*10;
  document.getElementById("making-charges-22").innerText = makingCharges22;
  document.getElementById("total-per-gram-22").innerText = totalPerGram22;
  document.getElementById("gold-rate-22-other").innerText = goldRate22Other; 

  document.getElementById("gold-rate-20-sj").innerText = goldRate20Sj*10;
  document.getElementById("making-charges-20").innerText = makingCharges20;
  document.getElementById("total-per-gram-20").innerText = totalPerGram20;
  document.getElementById("gold-rate-20-other").innerText = goldRate20Other;

  document.getElementById("gold-rate-18-sj").innerText = goldRate18Sj*10;
  document.getElementById("making-charges-18").innerText = makingCharges18;
  document.getElementById("total-per-gram-18").innerText = totalPerGram18;
  document.getElementById("gold-rate-18-other").innerText = goldRate18Other;

  document.getElementById("gold-rate-16-sj").innerText = goldRate16Sj*10;
  document.getElementById("making-charges-16").innerText = makingCharges16;
  document.getElementById("total-per-gram-16").innerText = totalPerGram16;
  document.getElementById("gold-rate-16-other").innerText = goldRate16Other;

  document.getElementById("gold-rate-12-sj").innerText = goldRate12Sj*10;
  document.getElementById("making-charges-12").innerText = makingCharges12;
  document.getElementById("total-per-gram-12").innerText = totalPerGram12;
  document.getElementById("gold-rate-12-other").innerText = goldRate12Other;

  document.getElementById("buying-margin-view-sj").innerText = buyingMarginSJ;
  document.getElementById("buying-margin-view-other").innerText = buyingMarginOther;
  document.getElementById("selling-margin-view").innerText = sellingMargin;
  document.getElementById("wastage-view").innerText = wastage;

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
