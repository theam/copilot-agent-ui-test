import type { UserDto } from '../../api/mock-api'

import { UserCard } from '../molecules/UserCard'

interface Props {
  users: UserDto[]
}

export const UserList = ({ users }: Props) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.userId} user={user} />
      ))}
    </div>
  )
}
