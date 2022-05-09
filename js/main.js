"use strict";

// CHAMPS --------------------------------------------

let DOMForm;
let DOMUl;

// METHODES ------------------------------------------

function FormValidate(e)
{
    e.preventDefault();

    let date = DOMForm['matchDate'].value;
    let team1 = DOMForm['team1'].value;
    let team2 = DOMForm['team2'].value;
    let score1 = DOMForm['score1'].value;
    let score2 = DOMForm['score2'].value;
    
    if(date == "" || team1 == "" || team2 == "") 
    {
        console.log("Il manque quelque chose..."); // changer en : background-color = orange sur l'input 
        return;
    }
    
    if(score1 == "") score1 = 0;
    if(score2 == "") score2 = 0;

    let key = `BBB${date}-${Date.now()}`;
    let stringContent = `${date}/${team1}/${team2}/${score1}/${score2}`;

    console.log(key, stringContent);
    
    localStorage.setItem(key, stringContent);
    
    // CreateDOMEntry(key,stringContent);

    DOMUl.innerHTML = "";

    LoadData();

    DOMForm.reset();
}


function CreateDOMEntry(key,myString)
{
    let dataArray = myString.split('/');
    // console.table(dataArray);
    let tag = document.createElement('li');
    tag.id = key;
    tag.innerHTML = `
        <ul>
            <li>${dataArray[0]}</li>
            <li>${dataArray[1]}</li>
            <li>${dataArray[2]}</li>
            <li>${dataArray[3]} / ${dataArray[4]}</li>
            <li><input type="button" value="X"></li>
        </ul>
    `;
    DOMUl.appendChild(tag);
}

// Pour le bouton supprimer
function UlClick(e)
{
    let target = e.target;
    let ul;

    if(target.type == "button")
    {
        ul = target.closest('ul').parentNode;
    }

    // console.log(ul.id);

    localStorage.removeItem(ul.id);
    ul.remove();
}


function LoadData()
{
    // Charger les données du LocalStorage
    // https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance
    let archive = {};
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while ( i-- ) {
        let currentKey = keys[i];
        archive[ currentKey ] = localStorage.getItem( currentKey );

        // console.log(currentKey, archive[ currentKey ]);
    }
    
    // console.log(archive);

    keys.sort();

    // console.log(keys);

    for (let i = 0; i < keys.length; i++) {
        // console.log(keys[i],archive[keys[i]]);
        CreateDOMEntry(keys[i], archive[keys[i]]);
    }

    // for (const [key, value] of Object.entries(archive)) {
    //     console.log(`${key}: ${value}`);
    //     // CreateDOMEntry(key, value);
    //   }
}

// function MakeID(length) {
//     let result           = '';
//     let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
//     let charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) 
//     {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// LANCEMENT -----------------------------------------

window.addEventListener('DOMContentLoaded', (event) =>
{
    // DOMButton = document.getElementById('DOMButton');
    // DOMButton.addEventListener('click', ButtonClick);

    DOMForm = document.forms['formulaire'];
    DOMForm.addEventListener('submit', FormValidate);

    DOMUl = document.getElementById('DOMUl');
    
    LoadData();

    DOMUl.addEventListener('click', UlClick);

});