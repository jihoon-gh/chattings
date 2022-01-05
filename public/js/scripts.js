const socket = io('/chattings');

const getElmentById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElmentById('hello_stranger');
const chattingBoxElement = getElmentById('chatting_box');
const formElement = getElmentById('chat_form');

socket.on('user_connected', (userName) => {
  console.log(`${userName} connected!`);
});

const drawHelloToStranger = (userName) =>
  (helloStrangerElement.innerText = `hello ${userName} stranger :D`);

function helloUser() {
  const userName = prompt('what is your name?');
  socket.emit('new_user', userName, (data) => {
    drawHelloToStranger(data);
  });
}

function init() {
  helloUser();
}

init();
