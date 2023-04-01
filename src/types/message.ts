type MessageType = 'my' | 'their'
export interface Message {
  type: MessageType
  content: string
  // id 就是发送/收到时的时间戳
  id: number
}
export type OriginMessage = Omit<Message, 'id'>
