import {Menu} from 'antd'
import Link from 'next/link'
import { AppstoreOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'

const {Item} = Menu
const TopNav = () => {
  return (
    <Menu mode='horizontal'>
    <Item icon={<AppstoreOutlined />}>
        <Link href='/'>
         home
        </Link>
    </Item>
    <Item icon={<LoginOutlined /> }>
        <Link href='/login'>
        login
        </Link>
    </Item>
    <Item icon={<UserAddOutlined />}>
        <Link href='/register'>
         register
        </Link>
    </Item>

    </Menu>
  )
}

export default TopNav