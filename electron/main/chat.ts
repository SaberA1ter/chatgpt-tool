import { ipcMain } from 'electron'
import { Configuration, OpenAIApi } from 'openai'
import HttpsProxyAgent from 'https-proxy-agent'
import HttpProxyAgent from 'http-proxy-agent'
import { createFailMessage, createSuccessMessage } from '../utils/message'
import { md2Html } from '../utils/markdown'

const httpsAgent = new HttpsProxyAgent('http://127.0.0.1:4780')
const httpAgent = new HttpProxyAgent('http://127.0.0.1:4780')
export async function chat(win: Electron.BrowserWindow) {
  const apiKey = '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'
  const configuration = new Configuration({
    apiKey,
  })
  const openai = new OpenAIApi(configuration)

  ipcMain.handle('send-chat', async (e, { content }: { content: string }) => {
    try {
      const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '麻烦请用 markdown 回复我。',
          },
          { role: 'user', content },
        ],
      }, {
        httpAgent,
        httpsAgent,
      })
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
