import User from '#models/user'
import { inject } from '@adonisjs/core'

@inject()
export default class UserService {
  public async create(user: any): Promise<User> {
    return await User.create(user)
  }
}
