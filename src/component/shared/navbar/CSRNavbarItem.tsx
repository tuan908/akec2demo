import { useAppSelector } from '@/app/hooks'
import { Route } from '@/constant'
import styled from '@emotion/styled'
import { signIn, signOut, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

const Badge = dynamic(() => import('@mui/material/Badge'))
const Link = dynamic(() => import('next/link'))
const NextImage = dynamic(() => import('next/image'))

const CSRNavbarItem = () => {
  const items = useAppSelector(state => state.order).length
  const { data } = useSession()

  if (data)
    return (
      <Badge
        className='cursor-pointer w-1/9 sm:w-full flex items-center justify-center p-2 sm:justify-center'
        color='error'
        variant={`${items > 0 ? 'dot' : 'standard'}`}
      >
        <Wrapper>
          <NextImage
            className='w-auto h-auto sm:w-9 sm:h-9 rounded-full hover:cursor-pointer'
            src={data!?.user!?.image!}
            alt=''
            width={60}
            height={60}
          />
          <ul>
            <li>
              <Link href={Route.Account}>Tài khoản</Link>
            </li>
            <li>
              <Link href={Route.Cart}>Đơn mua</Link>
            </li>
            <li onClick={() => signOut()}>Đăng xuất</li>
          </ul>
        </Wrapper>
      </Badge>
    )

  return (
    <button
      className='mx-auto text-center text-lg p-2 w-1/9 sm:w-full flex justify-center items-center'
      onClick={() => signIn('google', { redirect: true })}
    >
      Login
    </button>
  )
}

export default CSRNavbarItem

const Wrapper = styled.div`
  position: relative;

  :hover {
    cursor: pointer hover:opacity-100;
    opacity: 0.9;
  }

  @media (min-width: 768px) {
    :hover > ul {
      display: block;
      position: absolute;

      z-index: 49;
    }
  }

  ul {
    display: none;
    width: 200px;

    background-color: #333;
    left: 0;
  }

  li {
    padding: 0.625rem 0.75rem;
    border: 1px solid #fff;

    :hover {
      background-color: rgb(110, 116, 139);
    }
  }
`