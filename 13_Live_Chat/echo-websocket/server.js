const WebSocket = require("ws");
const server = new WebSocket.Server({port: 3000});  // web socket server class의 인스턴스

server.on("connection", ws => { // server.on은 서버에서 첫번째 매개변수 이벤트가 발생했을 때, 두번째 매개변수를 실행, ws는 web socket 클래스의 인스턴스
    ws.send("Server Connected");    

    ws.on("message", message => {
        ws.send(`Response from server: ${message}`);
    });

    ws.on('close', () => {
        console.log("Connection closed");
    });
})