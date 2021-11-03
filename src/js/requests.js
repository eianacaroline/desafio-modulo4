import { cardCostructor, totalConstructor, cityConstructor, errorMessage} from "./page-constructor.js";

export const fetchCity = async(state, city) => {
    try {
        var response = await fetch(`https://private-9e061d-piweb.apiary-mock.com/venda?state=${state}&city=${city}`.toLowerCase());
        const data =  await response.json();
        cardCostructor(data);
        totalConstructor(data);
        cityConstructor(data);
    } catch (e) { errorMessage(e.name) }
}

export default fetchCity;