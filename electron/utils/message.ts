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
