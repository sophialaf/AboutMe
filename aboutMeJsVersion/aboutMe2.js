const firstChunk = document.createElement('div');
firstChunk.id = "intro";
document.body.appendChild(firstChunk);

const myName = document.createElement('h1');
myName.innerText = 'I am Sophia';
firstChunk.appendChild(myName);

const location = document.createElement('p');
location.innerText = 'I hail from New York';
firstChunk.appendChild(location);

const secChunk = document.createElement('div');
secChunk.id = 'middle';
document.body.appendChild(secChunk);

const hobbies = document.createElement('p');
hobbies.innerText = 'A couple hobbies of mine include:';
secChunk.appendChild(hobbies);

const hobbiesList = document.createElement('ul');
secChunk.appendChild(hobbiesList);

const bul1 = document.createElement('li');
bul1.innerText = "painting";
hobbiesList.appendChild(bul1);

const bul2 = document.createElement('li');
bul1.innerText = "reading";
hobbiesList.appendChild(bul2);


const bul3 = document.createElement('li');
bul1.innerText = "bull fighting";
hobbiesList.appendChild(bul3);







