import { ipcMain } from 'electron'
import { Configuration, OpenAIApi } from 'openai'
import HttpsProxyAgent from 'https-proxy-agent'
import HttpProxyAgent from 'http-proxy-agent'
import { Context, createFailMessage, createSuccessMessage } from '../utils/message'
import { md2Html } from '../utils/markdown'

// 上下文
const context = new Context()

const httpsAgent = new HttpsProxyAgent('http://127.0.0.1:4780')
const httpAgent = new HttpProxyAgent('http://127.0.0.1:4780')
export async function chat(win: Electron.BrowserWindow) {
  const apiKey = 'xxxx'
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)

  ipcMain.handle('send-chat', async (e, { content }: { content: string }) => {
    try {
      const preContext = context.context
      const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '麻烦请用 markdown 回复我。',
          },
          ...preContext,
          { role: 'user', content },
        ],
      }, {
        httpAgent,
        httpsAgent,
      })
      context.add(content, res.data.choices[0].message.content)
      return createSuccessMessage({
        message: md2Html(res.data.choices[0].message.content),
      })
    }
    catch (error) {
      const code = error?.response?.status
      console.log(error)
      return createFailMessage({ code })
    }
  })
}
