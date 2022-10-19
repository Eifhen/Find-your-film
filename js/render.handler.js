
import CardComponent from "./card.component.js";


export default function RenderHandler(element_id, arr, type){
    const element = document.getElementById(`${element_id}`);

    if(arr.length > 0){
        let cards = '';
        arr.forEach(item =>  cards += CardComponent(item, type))
        element.innerHTML = cards;
        return true;
    }

    element.innerHTML = '';
    return false;
}