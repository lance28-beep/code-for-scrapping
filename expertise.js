const providerHeadings = document.querySelectorAll('.ProviderCard_heading__IxVx4');
const ratingComponents = document.querySelectorAll('.ProviderCard_card__jreqB');
const ratingsData = [];

ratingComponents.forEach((ratingComponent) => {
  const reputationElement = ratingComponent.querySelector('.RatingBadge_rating__E9y0D span');
  const googleRating = ratingComponent.querySelector('dt:nth-of-type(1) + dd').textContent;
  const yelpRating = ratingComponent.querySelector('dt:nth-of-type(2) + dd').textContent;
  const facebookRating = ratingComponent.querySelector('dt:nth-of-type(3) + dd').textContent;

  const reputation = reputationElement ? reputationElement.textContent : 'N/A';
  
  ratingsData.push({
    reputation,
    googleRating,
    yelpRating,
    facebookRating,
  });
});

let table = '<table><thead><tr><th>Company Name</th><th>Owners Name</th><th>Email Address</th><th>Phone Number</th><th>Office Address</th><th>Website</th><th>Types of Moves?</th><th>Full Service?</th><th>Years in Business</th><th>Licensing # / accreditation</th><th>BBB ratings</th><th>Expertise.com Rating</th><th>Facebook Review/Score</th><th>Google Review/Score</th><th>Yelp Review/Score</th></tr></thead><tbody>';

providerHeadings.forEach((providerHeading, index) => {
  const companyName = providerHeading.textContent.trim();
  const website = providerHeading.querySelector('a').href;
  const address = providerHeading.parentElement.parentElement.querySelector('[data-track="provider_address"]').textContent.trim();
  const empty = "";

  const reputation = ratingsData[index].reputation;
  const googleRating = ratingsData[index].googleRating;
  const yelpRating = ratingsData[index].yelpRating;
  const facebookRating = ratingsData[index].facebookRating;

  table += `<tr><td>${companyName}</td><td>${empty}</td><td>${empty}</td><td>${empty}</td><td>${address}</td><td>${website}</td><td>${empty}</td><td>${empty}</td><td>${empty}</td><td>${empty}</td><td>${empty}</td><td>${reputation}</td><td>${facebookRating}</td><td>${googleRating}</td><td>${yelpRating}</td></tr>`;
});

table += '</tbody></table>';

document.write(table);
