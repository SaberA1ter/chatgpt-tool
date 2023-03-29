import { useEffect, useRef, useState } from 'react'
import { ipcRenderer } from 'electron'
import Footer from './Footer'
import MessageLog from './MessageLog'
import type { Message } from '@/types/message'
import { formatMessage } from '@/utils/message'
import './index.scss'

export default () => {
  const [messageList, setMessageList] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const messageContainer = useRef<HTMLDivElement>(null)

  const send = async (content: string) => {
    setLoading(true)
    const { message } = await ipcRenderer.invoke('send-chat', { content })
    setMessageList([...messageList, formatMessage({
      type: 'their',
      content: message,
    })])
    setLoading(false)
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

    if (messageContainer.current)
      messageContainer.current.scrollTop = messageContainer.current.scrollHeight
  }, [messageList])
  return (
        <div className="chat-main">
          <div className="main-header">header</div>
          <div ref={messageContainer} className="main-container">
              <MessageLog messages={messageList} />
          </div>
          <div className="main-footer">
              <Footer loading={loading} onSubmit={addMessage} />
          </div>
        </div>
  )
}
