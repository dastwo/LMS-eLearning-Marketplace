import {Menu} from 'antd'
import Link from 'next/link'
import axios from 'axios'
import { AppstoreOutlined, CoffeeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, CarryOutFilled, TeamOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { Context } from "../context";
import {useRouter} from 'next/router';
import { toast } from "react-toastify";
const {Item, SubMenu, ItemGroup} = Menu
const TopNav = () => {
  const [current, setCurrent] = useState('')
  const router = useRouter()
  const {state, dispatch} = useContext(Context)

  const {user} = state
  useEffect(()=>{
    process.browser && setCurrent(window.location.pathname)
  },[process.browser && window.location.pathname])

  const logout = async ()=>{
    try {
      const {data} = await axios.get('/api/logout')
      dispatch({type: 'LOGOUT'})
      localStorage.removeItem('user')
      toast.success(data.message)
      router.push('/login')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Menu mode='horizontal' activeKey={[current]} selectedKeys={[current]}>
    <Item key='/' onClick={(e)=> setCurrent(e.key)} icon={<AppstoreOutlined />}>
        <Link href='/'>
         home
        </Link>
    </Item>
    {user && user.role && user.role.includes('Instructor') ? <Item key='/instructor/course/create' onClick={(e)=> setCurrent(e.key)} icon={<CarryOutFilled /> }>
        <Link href='/instructor/course/create'>
        Course Create
        </Link>
    </Item> :
     <Item key='/user/become-instructor' onClick={(e)=> setCurrent(e.key)} icon={<TeamOutlined /> }>
        <Link href='/user/become-instructor'>
        become instructor
        </Link>
    </Item>}
    
    {user === null  && (
      <>
      <Item key='/login' onClick={(e)=> setCurrent(e.key)} icon={<LoginOutlined /> }>
        <Link href='/login'>
        login
        </Link>
    </Item>
    <Item key='/register' onClick={(e)=> setCurrent(e.key)} icon={<UserAddOutlined />}>
        <Link href='/register'>
         register
        </Link>
    </Item>
      </>
    )}

{user && user.role && user.role.includes('Instructor') && 
<Item key='/instructor'  onClick={(e)=> setCurrent(e.key)} icon={<CarryOutFilled /> }>
        <Link href='/instructor'>
        instructor
        </Link>
    </Item>
     }

   {user !== null && (
    <SubMenu key={'SubMenu'} icon={<CoffeeOutlined/>} title={user && user.name} className=''>
      <ItemGroup>
      <Item key={'/user'} className=''>
        <Link href='/user'>
        Dashboard
        </Link>
      </Item>
      <Item  onClick={logout}className=''>
        Logout

      </Item>
      </ItemGroup>
      
    </SubMenu>
   )}

    
    </Menu>
  )
}

export default TopNav