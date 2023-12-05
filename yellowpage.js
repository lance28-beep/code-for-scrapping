const resultElements = document.querySelectorAll('.result');

document.write('<table>');
document.write('<tr>');
document.write('<th>Rank</th>');
document.write('<th>Company Name</th>');
document.write('<th>BBB Ratings</th>');
document.write('<th>Contact No.</th>');
document.write('<th>Address</th>');
document.write('<th>Years in Business</th>');
document.write('<th>Website</th>');
document.write('</tr>');

resultElements.forEach((result, index) => {
  const companyName = result.querySelector('.business-name').textContent;
  const bbbRating = result.querySelector('.bbb-rating.with-rating') ? result.querySelector('.bbb-rating.with-rating').textContent.trim().replace('BBB Rating:', '') : '';
  const website = result.querySelector('.track-visit-website') ? result.querySelector('.track-visit-website').href : '';
  const phoneNumber = result.querySelector('.phones.phone.primary') ? result.querySelector('.phones.phone.primary').textContent.replace(/\s|\(|\)|-|\D/g, '') : '';
  const addressStreet = result.querySelector('.street-address') ? result.querySelector('.street-address').textContent.trim() : '';
  const addressCity = result.querySelector('.locality') ? result.querySelector('.locality').textContent.trim() : '';
  const address = addressStreet || addressCity ? `${addressStreet}, ${addressCity}` : '';
  const yearsInBusiness = result.querySelector('.years-in-business') ? result.querySelector('.years-in-business').textContent.trim().replace(/\s*years?\s*in\s*business\s*/i, '') : '';

  document.write('<tr>');
  document.write(`<td>${index + 1}</td>`);
  document.write(`<td>${companyName}</td>`);
  document.write(`<td>${bbbRating}</td>`);
  document.write(`<td>${phoneNumber}</td>`);
  document.write(`<td>${address}</td>`);
  document.write(`<td>${yearsInBusiness}</td>`);
  document.write(`<td>${website}</td>`);
  document.write('</tr>');
});

document.write('</table>');


// -------------------------------------------------------
const companyNameEl = document.querySelector('.business-name');
const companyName = companyNameEl ? companyNameEl.textContent.trim() : 'N/A';

const phoneNumberEl = document.querySelector('.phone.dockable');
const phoneNumber = phoneNumberEl ? phoneNumberEl.textContent.replace(/\s|\(|\)|-|\D/g, '') : 'N/A';

const websiteEl = document.querySelector('.website-link.dockable');
const website = websiteEl ? websiteEl.href : 'N/A';

const addressEl = document.querySelector('.address');
const address = addressEl ? addressEl.textContent.trim() : 'N/A';

const dayLabelEl = document.querySelector('.day-label');
const dayLabel = dayLabelEl ? dayLabelEl.textContent.trim() : 'N/A';

const dayHoursEl = document.querySelector('.day-hours time');
const dayHours = dayHoursEl ? dayHoursEl.textContent.trim() : 'N/A';

const yearsInBusinessEl = document.querySelector('.years-in-business .number');
const yearsInBusiness = yearsInBusinessEl ? yearsInBusinessEl.textContent.trim() : 'N/A';

const emailLink = document.querySelector('.email-business');
const emailAddress = emailLink ? emailLink.href.replace('mailto:', '') : 'N/A';

const currentURL = window.location.href;

const rowData = [
  ['Company Name', companyName || 'N/A'],
  ['Phone Number', phoneNumber || 'N/A'],
  ['Website', website || 'N/A'],
  ['Address', address || 'N/A'],
  ['Hours', (dayLabel && dayHours) ? `${dayLabel} ${dayHours}` : 'N/A'],
  ['Years in Business', yearsInBusiness || 'N/A'],
  ['Email Address', emailAddress || 'N/A'],
  ['Sources:', currentURL || 'N/A'], // Add the current URL as a source
];

let tableHtml = '<table style="border: 1px solid black; font-family: Arial, sans-serif;">';

rowData.forEach(([label, value]) => {
  tableHtml += `
    <tr>
      <td style="font-weight: bold; padding: 5px;">${label}</td> <!-- Apply CSS to make the label bold -->
      <td style="padding: 5px;">${value}</td>
    </tr>
  `;
});

tableHtml += '</table>';

document.write(tableHtml);