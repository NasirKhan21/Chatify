const chat  = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const roomName= document.querySelectorAll('.room-name');



newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // update name via chatroom
  const newName = newNameForm.name.value.trim();
  const firstLetterCap = newName.charAt(0).toUpperCase() + newName.slice(1)
  chatroom.updateUserName(firstLetterCap);
  // reset the form
  newNameForm.reset();
  // show then hide the update message
  updateMssg.innerText = `Your name was updated to ${firstLetterCap}`;
  setTimeout(() => updateMssg.innerText = '', 3000);
});

rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    roomName[0].innerHTML = `You are in <strong>${e.target.innerText}</strong> Chatting Room`;
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

// check local storage for name
const username = localStorage.username ? localStorage.username : 'New User';

const chatUI = new ChatUI(chat);
const chatroom = new ChatRoom('general',username)

chatroom.getChats(data=>{
    chatUI.render(data);
})