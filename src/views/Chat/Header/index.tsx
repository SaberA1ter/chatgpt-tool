import type { TabValue } from 'tdesign-react'
import { Tabs } from 'tdesign-react'
import type { FC } from 'react'

interface HeaderProps {
  active: number
  onChange(active: number): void
}

const { TabPanel } = Tabs

const Header: FC<HeaderProps> = (props) => {
  const { active, onChange } = props
  const handleActiveChange = (value: TabValue) => {
    onChange(value as number)
  }
  return (
      <Tabs value={active} theme="card" onChange={handleActiveChange}>
          <TabPanel value={0} label="聊天"></TabPanel>
          <TabPanel value={1} label="设置"></TabPanel>
      </Tabs>
  )
}

export default Header
