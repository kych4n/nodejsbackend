const socket = io("http://localhost:3000/chat");    // 클라이언트 측에서 네임스페이스를 추가하는 방법은 io 객체 생성 시 주소값 뒤에 네임스페이스를 붙임
const roomSocket = io("http://localhost:3000/room");
const nickname = prompt("Enter the nickname");
let currentRoom = '';

// function sendMessage(){
//     const message = $('#message').val();
//     $("#chat").append(`<div>me : ${message}</div>`);
//     socket.emit('message', {message, nickname});
// }

function sendMessage(){
    if (currentRoom === ''){
        alert("Choose a room");
        return;
    }
    const message = $('#message').val();
    const data = {message, nickname, room: currentRoom};
    $("#chat").append(`<div>me : ${message}</div>`);
    roomSocket.emit('message', data);
    return false;
}

function createRoom(){
    const room = prompt("Enter the room name");
    roomSocket.emit("createRoom", {room, nickname});
}

socket.on("connect", ()=>{
    console.log("connected");
});

socket.on("message", (message)=>{
    $("#chat").append(`<div>${message}</div>`);
});

socket.on("notice", (data)=>{
    $("#notice").append(`<div>${data.message}</div>`);
})

roomSocket.on("message", (data)=>{
    console.log(data);
    $("#chat").append(`<div>${data.message}</div>`);
});

roomSocket.on("rooms", (data) => {
    console.log(data);
    $('#rooms').empty();
    data.forEach((room) => {
        $('#rooms').append(`<li>${room} <button onclick="joinRoom('${room}')">join</button></li>`);
    });
});

function joinRoom(room) {
    roomSocket.emit('joinRoom', {room, nickname, toLeaveRoom: currentRoom});
    $("#chat").html("");
    currentRoom = room;
}

