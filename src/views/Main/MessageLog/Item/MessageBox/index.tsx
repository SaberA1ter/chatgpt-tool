import type { FC } from 'react'
import { Avatar } from 'antd'
import type { Message } from '@/types/message'
import './index.scss'

type MessageBoxProps = Message & {
  className?: string
  name: string
}
const MessageBox: FC<MessageBoxProps> = (props) => {
  const { content, className, name, type } = props

  const classname = `message-item ${className ?? ''}`
  const isMyself = type === 'myself'
  const avatarBGI = isMyself ? '#d3d7d4' : '#2a5caa'

  return (
       <div className={classname}>
           <div className="message-item-main">
               <div className="message-container">
                   <div className="message-content">
                       { content }
                   </div>
               </div>
               <div className="message-avatar">
                   <Avatar style={{ backgroundColor: avatarBGI }}>
                       { name }
                   </Avatar>
               </div>
           </div>
       </div>
  )
}

export default MessageBox
