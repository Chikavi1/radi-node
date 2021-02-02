const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let total = document.getElementById('total');
let amount = document.getElementById('amount');

document.addEventListener("DOMContentLoaded", function(event) {
     total.textContent = parseInt(total.textContent);
});

btn.addEventListener('click',function(){

socket.emit('chat:message',{
    message: message.value,
    amount: amount.value,
    headline: username.value
});
});
function insertAfter(newElement,targetElement) {
// target is what you want it to go after. Look for this elements parent.
var parent = targetElement.parentNode;

// if the parents lastchild is the targetElement...
if (parent.lastChild == targetElement) {
// add the newElement after the target element.
parent.appendChild(newElement);
} else {
// else the target has siblings, insert the new element between the target and it's next sibling.
parent.insertBefore(newElement, targetElement.nextSibling);
}
}

socket.on('chat:message',function(data){
total.textContent = parseInt(total.textContent) + parseInt(data.amount);
//var text = document.createTextNode("This just got added");
//output.insertBefore(text);

// var nuevo_parrafo = document.createElement('p').appendChild(document.createTextNode(`${data.message}`));
var nuevo_parrafo =  document.createElement('div')
nuevo_parrafo.innerHTML = `<div class="ml-5 mt-5 w-3/4 px-2 py-2 bg-gray-100 rounded-md shadow-md">
        <div class="grid grid-cols-2">
            <div class="col-span-1">
            <p class="font-bold">${data.headline}</p>
            </div>
            <div class="col-span-1">
            <p class="text-right text-purple-600 font-bold">$ ${data.amount}.00</p>
            </div>
        </div>
        
        <small>${data.message}</small> 
            
        </div>`;
// Recojemos en una variable el segundo párrafo
// var segundo_p = document.getElementById('padre').getElementsByTagName('p')[0];

// Y ahora lo insertamos
insertAfter(nuevo_parrafo,document.getElementById('entradas')).fadeIn('slow');

});

