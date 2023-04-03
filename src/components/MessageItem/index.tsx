import type { FC } from 'react'
import { Avatar, Card, Space } from 'tdesign-react'
import classNames from 'classnames'
import type { Message } from '@/types/message'
import My from '@/assets/my.png'
import Their from '@/assets/their.png'
import './index.scss'

interface MessageProps {
  message: Message
}

const MessageLog: FC<MessageProps> = (props) => {
  const { message } = props

  const { content, type } = message

  const isMyself = type === 'my'

  const avatar = isMyself ? My : Their

  const className = classNames('message-item', 'animate__animated', {
    'message-item-my': isMyself,
    'message-item-their': !isMyself,
    'animate__fadeInRight': isMyself,
    'animate__fadeInLeft': !isMyself,
  })
  return (
        <Space className={className}>
            <Card hoverShadow>
                {
                    isMyself
                      ? content
                      : (
                            <div dangerouslySetInnerHTML={{
                              __html: content,
                            }}></div>
                        )
                }
            </Card>
            <Avatar image={avatar} />
        </Space>
  )
}
export default MessageLog
