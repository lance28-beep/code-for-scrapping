const companyElements = document.querySelectorAll('.text-blue-medium.css-1jw2l11.eou9tt70');
const bbbRatingsElements = document.querySelectorAll('.css-1k0ktya.e1akw1fw0');
const contactNoElements = document.querySelectorAll('.bds-body.css-1u1ibea.e230xlr0');
const addressElements = document.querySelectorAll('.bds-body.text-size-5.text-gray-70');

document.write('<table>');
document.write('<tr>');
document.write('<th>Rank</th>');
document.write('<th>Company Name</th>');
document.write('<th>BBB Ratings</th>');
document.write('<th>Contact No.</th>');
document.write('<th>Address</th>');
document.write('</tr>');

for (let i = 0; i < companyElements.length; i++) {
  const companyName = companyElements[i].textContent;
  const bbbRating = bbbRatingsElements[i].textContent.replace('BBB Rating:', '').trim();
  const contactNo = contactNoElements[i].textContent.replace(/\s|\(|\)|-|\D/g, '');
  const address = addressElements[i].textContent;

  document.write('<tr>');
  document.write(`<td>${i + 1}</td>`);
  document.write(`<td>${companyName}</td>`);
  document.write(`<td>${bbbRating}</td>`);
  document.write(`<td>${contactNo}</td>`);
  document.write(`<td>${address}</td>`);
  document.write('</tr>');
}

document.write('</table>');

// https://www.bbb.org/us/ks/cheney/category/plumber
// ------------------------------------------
// inside the bbb
const companyNameElement = document.querySelector('.bds-h2.font-normal.text-black');
const companyName = companyNameElement ? companyNameElement.textContent.trim() : 'N/A';

const addressElement = document.querySelector('address');
const address = addressElement ? addressElement.textContent.trim() : 'N/A';

const websiteElement = document.querySelector('.dtm-url');
const website = websiteElement ? websiteElement.href : 'N/A';

const phoneNumberElement = document.querySelector('.dtm-phone');
const phoneNumber = phoneNumberElement ? phoneNumberElement.textContent.replace(/\s|\(|\)|-|\D/g, '') : 'N/A';

const ratingElement = document.querySelector('.dtm-rating span:first-child');
const rating = ratingElement ? ratingElement.textContent : 'N/A';

const currentURL = window.location.href;

const yearEls = document.querySelectorAll('p.bds-body strong');
let yearsInBusiness = 'N/A';

for (const el of yearEls) {
  if (el.textContent.includes('Years in Business:')) {
    const yearsInBusinessText = el.parentNode.textContent.trim().match(/\d+/);
    if (yearsInBusinessText) {
      yearsInBusiness = yearsInBusinessText[0];
      break;
    }
  }
}

const bbbSeal = document.querySelector('img[src$="AB-seal-horz.svg"]');
const bbbLink = document.querySelector('a.bds-body');
let bbbRating;

if (bbbSeal) {
  bbbRating = bbbSeal.alt;
} else if (bbbLink) {
  bbbRating = bbbLink.textContent.trim();
} else {
  bbbRating = 'N/A';
}

const rowData = [
  ['Company Name', companyName],
  ['Address', address],
  ['Phone Number', phoneNumber],
  ['Website', website],
  ['Rating', rating],
  ['BBB Accredited?', bbbRating],
  ['Years in Business', yearsInBusiness],
  ['Sources:', currentURL],
];

let tableHtml = '<table style="border: 1px solid black; font-family: Arial, sans-serif;">';

rowData.forEach(([label, value]) => {
  let valueCellStyle = '';
  let formattedValue = value;

  if (label === 'BBB Accredited?') {
    if (value === 'This business is not BBB Accredited') {
      valueCellStyle = ' style="font-weight: bold; text-transform: uppercase; color: red;"';
    } else {
      const bbbHtml = '<span style="font-weight: bold; text-transform: uppercase; color: blue;">BBB</span>';
      formattedValue = value.replace('BBB', bbbHtml);
    }
  }

  tableHtml += `
    <tr>
      <td style="font-weight: bold; padding: 5px;">${label}</td>
      <td style="padding: 5px;"${valueCellStyle}>${formattedValue}</td>
    </tr>
  `;
});

tableHtml += '</table>';

document.write(tableHtml);




