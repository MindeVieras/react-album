import React, { useState, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Translate } from 'react-redux-i18n'
import { Button, Drawer, Tooltip, Menu } from 'antd'
import {
  MenuOutlined,
  TeamOutlined,
  DeleteOutlined,
  LogoutOutlined,
  PictureOutlined,
} from '@ant-design/icons'

export const MainMenu = () => {
  const { location } = useHistory()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Tooltip mouseEnterDelay={1} title={<Translate value="tooltip.mainMenu" />}>
        <Button
          type="link"
          shape="circle"
          size="large"
          ghost={true}
          onClick={handleClick}
          icon={<MenuOutlined />}
        />
      </Tooltip>
      <Drawer
        title="User Name!"
        placement="right"
        closable={true}
        onClose={handleClose}
        visible={Boolean(anchorEl)}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Menu defaultSelectedKeys={[location.pathname]} mode="inline">
          <Menu.Item key="/">
            <PictureOutlined />
            <Link to="/">
              <Translate value="mainMenu.albums" />
            </Link>
          </Menu.Item>
          <Menu.Item key="/users">
            <TeamOutlined />
            <Link to="/users">
              <Translate value="mainMenu.users" />
            </Link>
          </Menu.Item>
          <Menu.Item key="/trash">
            <DeleteOutlined />
            <Link to="/trash">
              <Translate value="mainMenu.trash" />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <LogoutOutlined />
            <Link to="/login">
              <Translate value="mainMenu.logout" />
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Fragment>
  )
}
