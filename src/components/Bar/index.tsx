import { useEffect, useState } from 'react'
import { Button, Divider, Space } from 'tdesign-react'
import { CloseIcon, RectangleIcon, RelativityIcon, RemoveIcon } from 'tdesign-icons-react'
import { ipcRenderer } from 'electron'
import './index.scss'

const Bar = () => {
  const [isMax, setIsMax] = useState(false)

  const handleMini = () => {
    ipcRenderer.send('win-min')
  }

  const handleRecover = () => {
    ipcRenderer.send('win-recover')
  }

  const handleClose = () => {
    ipcRenderer.send('win-close')
  }

  useEffect(() => {
    ipcRenderer.on('maximize-change', (e: unknown, state: { isMax: boolean }) => {
      setIsMax(state.isMax)
    })
    return () => {
      ipcRenderer.removeAllListeners('maximize-change')
    }
  }, [])
  return (
        <div className="app-bar">
            <div className="bar-button-groups">ChatGPT Tool</div>
            <div className="bar-button-groups">
                <Space size="0" separator={<Divider layout="vertical" />}>
                    <Button theme="primary" variant="text" onClick={handleMini}>
                        <RemoveIcon />
                    </Button>
                    <Button theme="warning" variant="text" onClick={handleRecover}>
                        {
                            isMax ? <RelativityIcon /> : <RectangleIcon />
                        }
                    </Button>
                    <Button theme="danger" variant="text" onClick={handleClose}>
                        <CloseIcon />
                    </Button>
                </Space>
            </div>
        </div>
  )
}
export default Bar
