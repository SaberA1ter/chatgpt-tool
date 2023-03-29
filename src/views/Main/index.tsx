import { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import Footer from './Footer'
import MessageLog from './MessageLog'
import type { Message } from '@/types/message'
import { formatMessage } from '@/utils/message'
import './index.scss'

export default () => {
  const [messageList, setMessageList] = useState<Message[]>([])

  const send = async (content: string) => {
    const { message } = await ipcRenderer.invoke('send-chat', { content })
    setMessageList([...messageList, formatMessage({
      type: 'their',
      content: message,
    })])
  }

  const addMessage = (content: string) => {
    setMessageList([...messageList, formatMessage({
      type: 'myself',
      content,
    })])
  }

  useEffect(() => {
    const last = messageList[messageList.length - 1]
    if (last?.type === 'myself')
      send(last.content)
  }, [messageList])
  return (
        <div className="chat-main">
          <div className="main-header">header</div>
          <div className="main-container">
              <MessageLog messages={messageList} />
          </div>
          <div className="main-footer">
              <Footer onSubmit={addMessage} />
          </div>
        </div>
  )
}
