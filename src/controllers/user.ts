import { CreateUserBody } from "../interfaces/create-user-body";
import { Controller, Post } from "../lib";

@Controller()
export class UserController {
  index() {
    return `
    <form action="/user/create" method="post">
      <h1>Create user</h1>
      <div>
        <label for="email">Email</label>
        <input type="text" id="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Create</button>
    </form>
    `;
  }

  @Post()
  create(body: CreateUserBody) {
    return {
      email: body.email,
    };
  }
}
