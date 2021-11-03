import { amenities } from "./data.js";

const cardImg = (value) => {
    const cardImage = document.createElement('img');
    const cardImageContainer = document.createElement('div');
    const src = document.createAttribute('src');
    src.value = value.medias.map(value => value.url);
    cardImageContainer.classList.add('container-image', 'col-5');
    cardImage.classList.add('card-image');
    cardImage.setAttributeNode(src);
    cardImageContainer.append(cardImage);
    return cardImageContainer;
}

const cardTitle = (value) => {
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add("title-card");
    cardTitle.innerText = value.link.name;
    return cardTitle;
}

const cardInfos = (value) => {
    const cardInfos = document.createElement('p');
    const usableArea = document.createElement('span');
    const bedrooms = document.createElement('span');
    const bathrooms = document.createElement('span');
    const parkingSpaces = document.createElement('span');
    usableArea.innerText = `${value.listing.usableAreas} m² `;
    bedrooms.innerText = `${value.listing.bedrooms} Quartos `;
    bathrooms.innerText = `${value.listing.bathrooms} Banheiros `;
    parkingSpaces.innerText = `${value.listing.parkingSpaces} Vagas `;
    cardInfos.append(usableArea, bedrooms, bathrooms, parkingSpaces)
    return cardInfos;
}

const amenitiesTranslate = (amenityToCheck) => {
    return amenities.filter((item) => amenityToCheck === item.amenity).reduce((ac, item) => item.translate, "");
}

const cardAmenities = (value) => {
    const cardAmenities = document.createElement('p');
    value.listing.amenities.map(value => {
        const item = document.createElement('span');
        item.classList.add('itens-amenities');
        cardAmenities.classList.add('amenities');
        if(value) item.append(amenitiesTranslate(value));
        cardAmenities.append(item);
    })
        return cardAmenities;
}

const cardAddress = (value) => {
    const cardAddress = document.createElement('p');
    cardAddress.classList.add('address');
    cardAddress.innerText = `${value.listing.address.street}, ${value.listing.address.streetNumber} - ${value.listing.address.neighborhood}, ${value.listing.address.city} - ${value.listing.address.stateAcronym}`;
    return cardAddress;
}

const cardPricing = (value) => {
    const currency = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 0})
    const cardPricing = document.createElement('div');
    const price = document.createElement('h4');
    const condominio = document.createElement('p');
    price.classList.add('price');
    condominio.classList.add('condominio');
    price.innerHTML = `<span>${currency.format(value.listing.pricingInfos[0].price)}</span>`;
    if (value.listing.pricingInfos[0].monthlyCondoFee) condominio.innerHTML = `Condomínio <span class="condominio-value">${currency.format(value.listing.pricingInfos[0].price)}</span>`;
    cardPricing.append(price, condominio);
    return cardPricing;
}

export const cardCostructor = (data) => {
    const resultsList = document.querySelector('.results-list');
    const errorMessage = document.querySelector('.error-message');
    errorMessage.innerHTML = "";
    resultsList.innerHTML = "";
    const searchData = data.search.result.listings;

    searchData.map(value => {
        const cardValue = document.createElement('article');
        const cardContent = document.createElement('div');
        const cardContainer = document.createElement('div');
        cardContent.classList.add('card-content', 'col-7');
        cardContainer.classList.add('row');
        cardValue.classList.add("card", "container");
        cardContent.append(cardAddress(value), cardTitle(value), cardInfos(value), cardAmenities(value), cardPricing(value));
        cardContainer.append(cardImg(value), cardContent);
        cardValue.append(cardContainer);
        resultsList.append(cardValue);
    })
}

export const totalConstructor = (data) => {
    const totalCount = document.querySelector('.total');
    totalCount.classList.add('total-text');
    totalCount.innerHTML = `<span class="total-number">${data.search.totalCount}</span> Apartamentos à venda em ${data.search.result.listings[0].listing.address.city} - ${data.search.result.listings[0].listing.address.stateAcronym}`;
}

const resetCity = () => {
    const cityValue = document.querySelector('.city');
    const cityValue2 = document.querySelector('#city');
    const resetValue = document.querySelector('.button-reset');
    const resetValue2 = document.querySelector('#button-reset');

    resetValue.addEventListener('click', evt => {
        evt.preventDefault();
        const inputSearch = document.querySelector('.input-search');
        const totalCount = document.querySelector('.total');
        const resultsList = document.querySelector('.results-list');
        cityValue.classList.remove('button-border');
        totalCount.innerHTML = "";
        resultsList.innerHTML = "";
        cityValue.innerHTML = "";
        cityValue2.innerHTML = "";
        inputSearch.value = "";
    })

    resetValue2.addEventListener('click', evt => {
        evt.preventDefault();
        const inputSearch = document.querySelector('.input-search');
        const totalCount = document.querySelector('.total');
        const resultsList = document.querySelector('.results-list');
        cityValue.classList.remove('button-border');
        totalCount.innerHTML = "";
        resultsList.innerHTML = "";
        cityValue.innerHTML = "";
        inputSearch.value = "";
    })
}

export const cityConstructor = (data) => {
    const cityValue = document.querySelector('.city');
    const cityValue2 = document.querySelector('#city');
    cityValue.classList.add('button-border');
    cityValue.innerHTML = `${data.search.result.listings[0].listing.address.city} - ${data.search.result.listings[0].listing.address.stateAcronym} <span class="button-reset">&times;</span>`;
    cityValue2.innerHTML = `${data.search.result.listings[0].listing.address.city} - ${data.search.result.listings[0].listing.address.stateAcronym} <button id="button-reset">&times;</button>`;

    resetCity();
}

export const errorMessage = (erro) => {
    const cityValue = document.querySelector('.city');
    const cityValue2 = document.querySelector('#city');
    const inputSearch = document.querySelector('.input-search');
    const resultsList = document.querySelector('.results-list');
    cityValue.classList.remove('button-border');
    const totalCount = document.querySelector('.total');
    const errorMessage = document.querySelector('.error-message');
    totalCount.innerHTML = "";
    resultsList.innerHTML = "";
    cityValue.innerHTML = "";
    cityValue2.innerHTML = "";
    inputSearch.value = "";
    const errorPhrase = document.createElement('h4');
    const errorStatus = document.createElement('h4');
    const errorPhrase2 = document.createElement('h4');
    errorMessage.classList.add('erro');
    errorPhrase.classList.add('error-message');
    errorStatus.classList.add('error-status');
    errorPhrase2.classList.add('error-message');
    errorPhrase.append(`Oops, algo deu errado na sua busca`);
    errorStatus.append(`status: ${erro.status}`);
    errorPhrase2.append(`Por favor, tente novamente.`);
    errorMessage.append(errorPhrase, errorStatus, errorPhrase2);
}