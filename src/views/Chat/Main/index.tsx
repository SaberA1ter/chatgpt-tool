import type { FC } from 'react'
import Item from '@/components/MessageItem/index'
import type { Message } from '@/types/message'
import './index.scss'

interface Main {
  messageList: Message[]
}

const MessageLog: FC<Main> = (props) => {
  const { messageList } = props

  return (
        <div className="message-log">
            {
                messageList.map(message => <Item key={message.id} message={message} />)
            }
        </div>
  )
}
export default MessageLog
