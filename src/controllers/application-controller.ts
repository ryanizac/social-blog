import { Controller } from "../lib";

@Controller({
  basepath: "/",
})
export class ApplicationController {
  index() {
    return "Called from home";
  }
}
