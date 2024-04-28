function createTable(input, tableNum) {
  let inputArray = input.split("#").map(Number);

  let rows = inputArray[0];
  let columns = inputArray[1];
  let val = inputArray[2];
  let table = `<table id='table${tableNum}'>`;

  for (let i = 0; i < rows; i++) {
    table += "<tr>";
    for (let j = 0; j < columns; j++) {
      table += `<td>${val}</td>`;
      if (j == columns - 1 && i == rows - 1) break;
      val = prompt(`Enter value ${j + 2 + rows * i}`);
    }
    table += "</tr>";
  }
  document.getElementById(`table${tableNum}-container`).innerHTML = table;
}

function calcTable() {
  let table1 = document.getElementById("table1");
  let table2 = document.getElementById("table2");

  let table3 = "<table>";
  let uniqueValues = [];
  for (let row = 0; row < table1.rows.length; row++) {
    table3 += "<tr>";
    if (table1.rows[row].cells.length !== table2.rows[row].cells.length) {
      console.error(
        "Error: Row",
        row + 1,
        "has different cell count in tables"
      );
      return;
    }
    for (let col = 0; col < table1.rows[row].cells.length; col++) {
      const cell1Value = table1.rows[row].cells[col].innerText;
      const cell2Value = table2.rows[row].cells[col].innerText;

      let result;
      if (cell1Value === cell2Value) {
        result = cell1Value;
      } else {
        result = cell1Value * cell2Value;
      }
      let bgColor = uniqueValues.includes(result) ? "lightblue" : "lightgreen";
      if (!uniqueValues.includes(result)) {
        uniqueValues.push(result);
      }
      table3 += `<td style="background-color: ${bgColor}">${result}</td>`;
    }
    table3 += "</tr>";
  }

  table3 += "</table>";
  document.getElementById("table3-container").innerHTML = table3;
}
