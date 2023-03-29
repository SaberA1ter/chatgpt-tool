import type { FC } from 'react'
import Item from './Item'
import type { Message } from '@/types/message'
import './index.scss'

interface MessageLogProps {
  messages: Message[]
}

const MessageLog: FC<MessageLogProps> = (props) => {
  const { messages } = props

  return (
        <div className="message-log">
            {
                messages.map(item => <Item key={item.time} message={item} />)
            }
        </div>
  )
}
export default MessageLog
