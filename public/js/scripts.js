const socket = io('/chattings');

const getElmentById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElmentById('hello_stranger');
const chattingBoxElement = getElmentById('chatting_box');
const formElement = getElmentById('chat_form');

socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected!`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username} : ${chat}`);
});
socket.on('disconnec_user', (username) =>
  drawNewChat(`${username}: disconnected..`),
);
const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    drawNewChat(`me : ${inputValue}`);
    event.target.elements[0].value = '';
  }
};
//draw
const drawHelloToStranger = (username) =>
  (helloStrangerElement.innerText = `hello ${username} stranger :D`);
const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
  <div> 
  ${message}
  </div>`;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};
function helloUser() {
  const username = prompt('what is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloToStranger(data);
  });
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();
