import { users } from '@/api/mock-data'

export interface UserDto {
  userId: string
  name: string
  username: string
  email: string
  userTin: string
  phone: string
  website?: string
}

export interface CreateUserDto {
  name: string
  username: string
  email: string
  userTin: string
  phone: string
  website?: string
}

export interface UpdateUserDto {
  name?: string
  username?: string
  email?: string
  userTin?: string
  phone?: string
  website?: string
}

export class UserMockApi {
  public static async getUsers(): Promise<UserDto[]> {
    const delay = Math.random() * 2000 + 1000 // Random delay between 1s and 3s
    await new Promise((resolve) => setTimeout(resolve, delay))
    return users
  }

  public static async getUserById(userId: string): Promise<UserDto | undefined> {
    const delay = Math.random() * 2000 + 1000 // Random delay between 1s and 3s
    await new Promise((resolve) => setTimeout(resolve, delay))
    return users.find((user) => user.userId === userId)
  }

  public static async createUser(user: CreateUserDto): Promise<UserDto> {
    const delay = Math.random() * 2000 + 1000 // Random delay between 1s and 3s
    await new Promise((resolve) => setTimeout(resolve, delay))
    const newUser = { ...user, userId: String(users.length + 1) }
    users.push(newUser)
    return newUser
  }

  public static async updateUser(
    userId: string,
    user: UpdateUserDto
  ): Promise<UserDto | undefined> {
    const delay = Math.random() * 2000 + 1000 // Random delay between 1s and 3s
    await new Promise((resolve) => setTimeout(resolve, delay))
    const index = users.findIndex((user) => user.userId === userId)
    if (index === -1) {
      return undefined
    }
    users[index] = { ...users[index], ...user }
    return users[index]
  }
}
