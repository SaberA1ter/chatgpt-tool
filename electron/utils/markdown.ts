import MarkdownIt from 'markdown-it'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'

const md = new MarkdownIt({
  linkify: true,
  highlight(str: string, lang: string) {
    try {
      return `<pre class="hljs hljs-pre"><code>${
              hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          }</code></pre>`
    }
    catch (__) {
      return str
    }
  },
})

md.use(mila, {
  attrs: {
    target: '_blank',
    rel: 'noopener',
  },
})

export const md2Html = (str: string): string => {
  return md.render(str)
}
