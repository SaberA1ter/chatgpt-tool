import type { ChatCompletionRequestMessage } from 'openai'

// 最大上下文数量
const MAX_MESSAGE = 3

export class Context {
  private readonly list: ChatCompletionRequestMessage[]

  constructor() {
    this.list = []
  }

  public add(userMessage: string, assistantMessage: string) {
    if (!userMessage || !assistantMessage)
      return
    if (this.list.length === MAX_MESSAGE * 2)
      this.list.splice(0, 2)

    this.list.push({
      role: 'user',
      content: userMessage,
    }, {
      role: 'assistant',
      content: assistantMessage,
    })
  }

  public get context() {
    return [...this.list]
  }
}

const errorCodeMap: Record<string, string> = {
  401: 'error 401 可能是你的 apiKey 不对劲！',
  403: 'error 403 拒绝访问，哒咩！',
}

const createMessage = ({ type, message }): { type: 'success' | 'fail'; message: string } => ({
  type,
  message,
})

export const createFailMessage = ({ code }) => createMessage({
  type: 'fail',
  message: errorCodeMap[code] ?? code ? `error ${code} 繁忙或者异常，请稍后再试！哒咩哒咩哒咩哟` : 'error: 发生甚么事了？发生甚么事了？发生甚么事了？',
})

export const createSuccessMessage = ({ message }) => createMessage({
  type: 'success',
  message,
})
