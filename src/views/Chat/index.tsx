import { useEffect, useRef, useState } from 'react'
import { ipcRenderer } from 'electron'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import type { Message } from '@/types/message'
import { formatMessage } from '@/utils/message'
import './index.scss'

export default () => {
  // 聊天记录
  const [messageList, setMessageList] = useState<Message[]>([{
    type: 'my',
    content: '请问你能使用 js 写一段冒泡排序吗',
    id: 12354684,
  }])
  // 是否在加载中
  const [loading, setLoading] = useState(false)
  // 聊天区域
  const messageContainer = useRef<HTMLDivElement>(null)
  // 所选 header Tabs
  const [activeTab, setActiveTab] = useState(0)

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
      type: 'my',
      content,
    })])
  }

  const getChatMainStyle = (key: number) => {
    return {
      // visibility: activeTab === key ? 'visible' : 'hidden',
      display: activeTab === key ? 'flex' : 'none',
    } as const
  }

  useEffect(() => {
    const last = messageList[messageList.length - 1]
    if (last?.type === 'my') {
      send(last.content)
      if (messageContainer.current)
        messageContainer.current.scrollTop = messageContainer.current.scrollHeight
    }
  }, [messageList])
  return (
        <div className="chat-container">
          <div className="chat-header">
            <Header active={activeTab} onChange={setActiveTab} />
          </div>
          <div className="chat-main" style={getChatMainStyle(0)}>
            <div ref={messageContainer} className="main-container">
              <Main messageList={messageList} />
            </div>
            <Footer loading={loading} onSubmit={addMessage} />
          </div>
          <div className="chat-main" style={getChatMainStyle(1)}></div>
        </div>
  )
}
