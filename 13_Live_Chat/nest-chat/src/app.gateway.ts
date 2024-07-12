import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({namespace: "chat"}) // 웹 소켓 서버 설정을 위한 데코레이터, 네임스페이스를 추가하면 채팅방 느낌
export class ChatGateWay {
    @WebSocketServer() server: Server;  // 웹 소켓 서버 인스턴스에 접근하는 데코레이터

    @SubscribeMessage('message')    // message라는 이벤트를 구독하라는 리스너
    handleMessage(socket: Socket, data: any): void {   // socket은 연결된 웹 소켓에 대한 인스턴스, data는 전달받은 데이터
        const {message, nickname} = data;
        // this.server.emit("message", `client-${nickname} : ${data}`,);    // server.emit은 나를 포함한 모든 클라이언트에게 전송
        socket.broadcast.emit("message", `${nickname} : ${message}`,);  // 보낸 사람을 제외하고 전송
    }
}

@WebSocketGateway({namespace: "room"}) // 웹 소켓 서버 설정을 위한 데코레이터, 네임스페이스를 추가하면 채팅방 느낌
export class RoomGateWay {
    constructor(private readonly chatGateway: ChatGateWay){}
    rooms = [];

    @WebSocketServer() server: Server;  // 웹 소켓 서버 인스턴스에 접근하는 데코레이터

    @SubscribeMessage('createRoom')    // message라는 이벤트를 구독하라는 리스너
    handleMessage(socket: Socket, data: any): void {   // socket은 연결된 웹 소켓에 대한 인스턴스, data는 전달받은 데이터
        const {room, nickname} = data;
        this.chatGateway.server.emit('notice', {
            message: `${nickname} created ${room} room`
        });

        this.rooms.push(room);
        this.server.emit('rooms', this.rooms);
    }

    @SubscribeMessage('message')    // message라는 이벤트를 구독하라는 리스너
    handleMessageToRoom(socket: Socket, data: any): void {   // socket은 연결된 웹 소켓에 대한 인스턴스, data는 전달받은 데이터
        const {message, nickname, room} = data;
        socket.broadcast.to(room).emit('message', {
            message: `${nickname}: ${message}`
        });
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(socket: Socket, data){
        const {nickname, room, toLeaveRoom} = data;
        socket.leave(toLeaveRoom);
        this.chatGateway.server.emit('notice', {
            message: `${nickname} entered ${room}`
        });
        socket.join(room);
    }
}