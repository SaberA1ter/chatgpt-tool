import type { FC } from 'react'
import MessageBox from './MessageBox'
import type { Message } from '@/types/message'
import './index.scss'

interface ITemProps {
  message: Message
}

const ITem: FC<ITemProps> = (props) => {
  const { message } = props
  const isMyself = message.type === 'myself'
  const messageBoxClass = isMyself ? 'item-box-myself' : 'item-box-their'
  const name = isMyself ? '你' : '神'
  const animateClass = isMyself ? 'animate__fadeInRight' : 'animate__fadeInLeft'
  return (
      <div className={`item-box animate__animated ${animateClass}`}>
        <MessageBox className={messageBoxClass} {...message} name={name} />
      </div>
  )
}

export default ITem
