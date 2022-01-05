import { SocketSchema, Socket as SocketModel } from './models/sockets.model';
import { Chatting, ChattingSchema } from './models/chattings.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chatting.name,
        schema: ChattingSchema,
      },
      {
        name: SocketModel.name,
        schema: SocketSchema,
      },
    ]),
  ],
  providers: [ChatsGateway],
})
export class ChatsModule {}
