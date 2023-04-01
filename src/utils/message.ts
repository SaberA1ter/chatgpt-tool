import dayjs from 'dayjs'
import type { Message, OriginMessage } from '@/types/message'

export const formatMessage = ({ type, content }: OriginMessage): Message => ({
  type,
  content,
  id: dayjs().unix(),
})
