import { create } from 'zustand';
import type { UserDto } from '@/api/mock-api.ts';

interface UserState {
  users: UserDto[];
  setUsers: (users: UserDto[]) => void;
  addUser: (user: UserDto) => void;
  updateUser: (userId: string, updatedUser: UserDto) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (userId, updatedUser) => set((state) => ({
    users: state.users.map((user) => 
      user.userId === userId ? updatedUser : user
    )
  })),
})); 