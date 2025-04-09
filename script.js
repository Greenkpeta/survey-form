// Example variables – these can be reassigned for testing.
let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// Currency values in cents
const currencyUnits = [
  { name: "ONE HUNDRED", value: 10000 },
  { name: "TWENTY", value: 2000 },
  { name: "TEN", value: 1000 },
  { name: "FIVE", value: 500 },
  { name: "ONE", value: 100 },
  { name: "QUARTER", value: 25 },
  { name: "DIME", value: 10 },
  { name: "NICKEL", value: 5 },
  { name: "PENNY", value: 1 }
];

document.getElementById("purchase-btn").addEventListener("click", function() {
  // Get the cash provided from the input element (id="cash")
  let cash = parseFloat(document.getElementById("cash").value);
  
  // If cash provided is less than price, alert the customer.
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  // If cash equals price, show exact cash message.
  if (cash === price) {
    document.getElementById("change-due").textContent =
      "No change due - customer paid with exact cash";
    return;
  }
  
  // Calculate the change due in dollars and then in cents (to avoid FP issues)
  let changeDue = cash - price;
  let changeDueCents = Math.round(changeDue * 100);
  
  // Calculate total cash in drawer (in cents)
  let totalCidCents = cid.reduce((acc, curr) => acc + Math.round(curr[1] * 100), 0);
  
  // If total cash in drawer is less than change due, cannot give proper change.
  if (totalCidCents < changeDueCents) {
    document.getElementById("change-due").textContent =
      "Status: INSUFFICIENT_FUNDS";
    return;
  }
  
  // If the cash in drawer exactly equals the change due, status CLOSED.
  if (totalCidCents === changeDueCents) {
    let closedOutput = "Status: CLOSED";
    // Loop through the original cid and add non-zero amounts.
    cid.forEach(([currency, amount]) => {
      if (amount > 0) {
        closedOutput += " " + currency + ": $" + amount;
      }
    });
    document.getElementById("change-due").textContent = closedOutput;
    return;
  }
  
  // Otherwise, try to provide change using available currency in descending order.
  // Create a drawer object mapping currency names to their available amounts in cents.
  let drawer = {};
  for (let i = 0; i < cid.length; i++) {
    let currName = cid[i][0];
    // Multiply by 100 to convert dollars to cents.
    drawer[currName] = Math.round(cid[i][1] * 100);
  }
  
  let changeArray = [];
  // Iterate over currency units (highest to lowest)
  for (let i = 0; i < currencyUnits.length; i++) {
    let currName = currencyUnits[i].name;
    let currValue = currencyUnits[i].value;
    let amountUsed = 0;
    
    // While we still need change and there is enough of this currency unit in the drawer
    while (changeDueCents >= currValue && drawer[currName] > 0) {
      changeDueCents -= currValue;
      drawer[currName] -= currValue;
      amountUsed += currValue;
    }
    
    // If we used any of this unit, record it (convert back to dollars)
    if (amountUsed > 0) {
      changeArray.push({ name: currName, amount: amountUsed / 100 });
    }
  }
  
  // If we were unable to return the exact change, show insufficient funds.
  if (changeDueCents > 0) {
    document.getElementById("change-due").textContent =
      "Status: INSUFFICIENT_FUNDS";
    return;
  }
  
  // Build the output string for status OPEN and list each currency used.
  let output = "Status: OPEN";
  changeArray.forEach(entry => {
    output += " " + entry.name + ": $" + entry.amount;
  });
  
  document.getElementById("change-due").textContent = output;
});