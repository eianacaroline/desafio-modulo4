import {fetchCity} from "./requests.js"
import { cityState } from "./data.js";

const search = () => {
    const inputSearch = document.querySelector('.input-search');

    inputSearch.addEventListener('blur', event => {
        event.preventDefault();
        const inputValue = inputSearch.value.trim().toLowerCase().replaceAll(' ', '-').replace(/Ã|ã/g, 'a');
        const state = cityState.filter((item) => inputValue === item.city || inputValue === item.state).reduce((ac, item) => item.state, "");
        const city = cityState.filter((item) => inputValue === item.city || inputValue === item.state).reduce((ac, item) => item.city, "");
        if (inputValue) fetchCity(state, city);
    })
}

search();



