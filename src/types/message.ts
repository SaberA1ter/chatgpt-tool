type MessageType = 'myself' | 'their'
export interface Message {
  type: MessageType
  content: string
  time: number
}
export type OriginMessage = Omit<Message, 'time'>
