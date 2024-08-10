import { useState } from 'react'
import './app.scss'
import 'normalize.css'
import { Marked } from 'marked'
import hljs from 'highlight.js'
import { markedHighlight } from 'marked-highlight'
import 'highlight.js/styles/github.css'
import TitleWindow from './components/TitleWindow'

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'javascript'
      return hljs.highlight(code, { language }).value
    }
  })
)

marked.use({
  breaks: true
})

const EDITOR = "EDITOR"
const PREVIEW = "PREVIEW"

function App() {

  const [preview, setPreview] = useState(
    `# Title\n\n## Subtitle\n\n[Link](#)\n\n\`<div>Line code</div>\`\n\n\`\`\`javascript\nfunction func(arg) {\n return 1;\n}\n\n\`\`\`\n\n- Item 1\n  - Item 2\n    - Item 3\n      - Item 4\n\n> Block Quotes\n\n![Code](https://associationsnow.com/wp-content/uploads/2016/01/0111_javascript.jpg)\n\n**Bold text**`
  )

  const [maximizedWindow, setMaximizedWindow] = useState(null)

  const toggleMaximize = (window) => {
    setMaximizedWindow(prevState => (prevState === window ? null : window))
  }

  const createMarkup = () => {
    return { __html: marked.parse(preview) }
  }

  return (
    <div id="box">
      <h1 id="title-app">Markdown Previewer</h1>
        <div className={`box-editor ${maximizedWindow === EDITOR ? 'fullEditor' : maximizedWindow === PREVIEW ? 'hidden' : ''}`}>
          <TitleWindow onClick={() => toggleMaximize(EDITOR)} maximized={maximizedWindow} title="Editor" />
          <textarea value={preview} onChange={e => setPreview(e.target.value)} id="editor"></textarea>
        </div>
        <div className={`box-preview ${maximizedWindow === PREVIEW ? 'fullPreview' : maximizedWindow === EDITOR ? 'hidden' : ''}`}>
          <TitleWindow onClick={() => toggleMaximize(PREVIEW)} maximized={maximizedWindow} title="Preview" />
          <div dangerouslySetInnerHTML={createMarkup()} id="preview"></div>
        </div>
      <a className="dev-author" href="https://github.com/allessandrogomes" target="_blank">by Alessandro Gomes</a>
    </div>
  )
}

export default App
