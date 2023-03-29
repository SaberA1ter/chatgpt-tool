import { useState } from 'react'
import type { FC } from 'react'
import { Button, Input } from 'antd'
import './index.scss'

interface FooterProps {
  loading: boolean
  onSubmit(content: string): void
}

const { TextArea } = Input

const Footer: FC<FooterProps> = (props) => {
  const { loading, onSubmit } = props

  const [value, setValue] = useState('')

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    onSubmit(value)
    setValue('')
  }

  return (
        <div className="footer-container">
            <TextArea
                className="footer-input"
                value={value}
                autoSize={{ minRows: 4, maxRows: 4 }}
                onChange={handleChange}
                onPressEnter={handleSubmit}
            />
            <div className="footer-button-groups">
                <Button loading={loading} onClick={handleSubmit}>发送</Button>
            </div>
        </div>
  )
}

export default Footer
