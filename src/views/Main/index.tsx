import { useState } from 'react'
import Footer from './Footer'
import MessageLog from './MessageLog'
import type { Message } from '@/types/message'
import { formatMessage } from '@/utils/message'
import './index.scss'

export default () => {
  const [messageList, setMessageList] = useState<Message[]>([])

  const send = (content: string) => {
    const newList = [...messageList, formatMessage({
      type: Math.random() > 0.5 ? 'myself' : 'their',
      content,
    })]
    setMessageList(newList)
  }
  return (
        <div className="chat-main">
          <div className="main-header">header</div>
          <div className="main-container">
              <MessageLog messages={messageList} />
          </div>
          <div className="main-footer">
              <Footer onSubmit={send} />
          </div>
        </div>
  )
}
