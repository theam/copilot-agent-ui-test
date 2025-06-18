import { useEffect, useState } from 'react'
import type { UserDto } from '../../api/mock-api'
import { UserMockApi } from '../../api/mock-api'
import { UserList } from '../organisms/UserList'

export const Users = () => {
  const [users, setUsers] = useState<UserDto[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadUsers = async () => {
    setIsLoading(true)
    const users = await UserMockApi.getUsers()
    setUsers(users)
    setIsLoading(false)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Users</h1>
      {isLoading ? (
        <div className='flex justify-center items-center h-full'>Loading...</div>
      ) : (
        <UserList users={users} />
      )}
    </div>
  )
}
