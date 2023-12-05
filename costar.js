const annualAwardWinners = document.querySelectorAll('.annual-award-winners--items-wrapper');
let table = '<table><thead><tr><th>Market Area</th><th>Year</th><th>Title</th><th>Company Name</th><th>Winner Name</th></tr></thead><tbody>';

annualAwardWinners.forEach(function (award) {
  const title = award.querySelector('h3').innerText;
  const viewsRows = award.querySelectorAll('.views-row');

  viewsRows.forEach(function (viewsRow, index) {
    const nodeContent = viewsRow.querySelector('.node__content');
    const winner = nodeContent.querySelector('.field--name-field-winner');
    const companyName = nodeContent.querySelector('.field--name-field-company-name');

    const marketSelectElement = document.getElementById('edit-market');
    const marketSelectedOption = marketSelectElement.querySelector('option[selected="selected"]');

    const yearSelectElement = document.getElementById('edit-year');
    const yearSelectedOption = yearSelectElement.querySelector('option[selected="selected"]');

    const marketArea = marketSelectedOption ? marketSelectedOption.innerText : '';
    const year = yearSelectedOption ? yearSelectedOption.innerText : '';

    if (winner && winner.innerText.trim() !== '') {
      table += `<tr><td>${marketArea}</td><td>${year}</td><td>${title}</td><td>${companyName ? companyName.innerText : ''}</td><td>${winner.innerText}</td></tr>`;
    } else {
      table += `<tr><td>${marketArea}</td><td>${year}</td><td>${title}</td><td>${companyName ? companyName.innerText : ''}</td><td></td></tr>`;
    }
  });
});

table += '</tbody></table>';

document.write(table);
