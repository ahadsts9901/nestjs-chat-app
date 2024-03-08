import { Injectable } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketService {
    @SubscribeMessage('message')
    handleMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
        console.log(body);
        console.log('connecting', socket.id);
    }
}
