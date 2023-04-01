import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const md = new MarkdownIt({
  highlight(str: string, lang: string) {
    try {
      return `<pre class="hljs"><code>${
              hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          }</code></pre>`
    }
    catch (__) {
      return str
    }
  },
})

export const md2Html = (str: string): string => {
  return md.render(str)
}
