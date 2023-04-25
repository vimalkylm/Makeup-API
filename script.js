const makeupContainer = document.getElementById('makeup');
const searchInput = document.getElementById('search');

const fetchData = async () => {
  try {
    const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const displayMakeup = async () => {
  const makeupData = await fetchData();
  makeupContainer.innerHTML = '';
  makeupData.forEach(makeup => {
    const makeupCard = document.createElement('div');
    makeupCard.classList.add('makeup-card');
    const makeupBrand = document.createElement('h2');
    makeupBrand.innerText = makeup.brand;
    const makeupName = document.createElement('h3');
    makeupName.innerText = makeup.name;
    const makeupPrice = document.createElement('p');
    makeupPrice.innerText = `$${makeup.price}`;
    const makeupImage = document.createElement('img');
    makeupImage.src = makeup.image_link;
    const makeupLink = document.createElement('a');
    makeupLink.href = makeup.product_link;
    makeupLink.innerText = 'View on site';
    const makeupDescription = document.createElement('p');
    makeupDescription.innerText = makeup.description;
    makeupCard.appendChild(makeupBrand);
    makeupCard.appendChild(makeupName);
    makeupCard.appendChild(makeupPrice);
    makeupCard.appendChild(makeupImage);
    makeupCard.appendChild(makeupLink);
    makeupCard.appendChild(makeupDescription);
    makeupContainer.appendChild(makeupCard);
  });
};

const searchMakeup = async searchText => {
  const makeupData = await fetchData();
  const filteredMakeup = makeupData.filter(makeup => {
    const regex = new RegExp(searchText, 'gi');
    return makeup.brand.match(regex) || makeup.name.match(regex);
  });
  makeupContainer.innerHTML = '';
  filteredMakeup.forEach(makeup => {
    const makeupCard = document.createElement('div');
    makeupCard.classList.add('makeup-card');
    const makeupBrand = document.createElement('h2');
    makeupBrand.innerHTML = makeup.brand.replace(new RegExp(searchText, 'gi'), match => `<span class="highlight">${match}</span>`);
    const makeupName = document.createElement('h3');
    makeupName.innerHTML = makeup.name.replace(new RegExp(searchText, 'gi'), match => `<span class="highlight">${match}</span>`);
    const makeupPrice = document.createElement('p');
    makeupPrice.innerText = `$${makeup.price}`;
    const makeupImage = document.createElement('img');
    makeupImage.src = makeup.image_link;
    const makeupLink = document.createElement('a');
    makeupLink.href = makeup.product_link;
    makeupLink.innerText = 'View on site';
    const makeupDescription = document.createElement('p');
    makeupDescription.innerText = makeup.description;
    makeupCard.appendChild(makeupBrand);
    makeupCard.appendChild(makeupName);
    makeupCard.appendChild(makeupPrice);
    makeupCard.appendChild(makeupImage);
    makeupCard.appendChild(makeupLink);
    makeupCard.appendChild(makeupDescription);
    makeupContainer.appendChild(makeupCard);
  });
};

displayMakeup();

searchInput.addEventListener('input', () => searchMakeup(searchInput.value));