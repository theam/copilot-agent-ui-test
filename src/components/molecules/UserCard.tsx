import type { UserDto } from '../../api/mock-api'

interface Props {
  user: UserDto
}

export const UserCard = ({ user }: Props) => {
  return <div>{user.name}</div>
}
