import type { FC, KeyboardEvent } from 'react'
import { useState } from 'react'
import { Button, Space, Textarea } from 'tdesign-react'
import './index.scss'

interface FooterProps {
  loading: boolean
  onSubmit(content: string): void
}

const Footer: FC<FooterProps> = (props) => {
  const { loading, onSubmit } = props

  const [value, setValue] = useState('')

  const handleChange = (value: string) => {
    setValue(value)
  }

  const handleSubmit = () => {
    if (!value)
      return
    onSubmit(value)
    setValue('')
  }

  const handleKeyPress = (_: string, { e }: { e: KeyboardEvent<HTMLTextAreaElement> }) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      handleSubmit()
    }
  }

  return (
        <Space className="footer-container" style={{ width: '100%' }}>
            <Textarea
                className="footer-input"
                value={value}
                autosize={{ minRows: 1, maxRows: 4 }}
                onKeypress={handleKeyPress}
                onChange={handleChange}
            />
            <Button loading={loading} onClick={handleSubmit}>祈祷</Button>
        </Space>
  )
}

export default Footer
