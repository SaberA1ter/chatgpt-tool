import { ipcMain } from 'electron'
import { Configuration, OpenAIApi } from 'openai'
import HttpsProxyAgent from 'https-proxy-agent'
import HttpProxyAgent from 'http-proxy-agent'
import { createFailMessage, createSuccessMessage } from '../utils/message'

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
      const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content }],
      }, {
        httpAgent,
        httpsAgent,
      })
      return createSuccessMessage({
        message: res.data.choices[0].message.content,
      })
    }
    catch (error) {
      const code = error.response.status
      return createFailMessage({ code })
    }
  })
}
