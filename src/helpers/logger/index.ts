import { format } from "date-fns";

class Logger {
  getDate(): void {
    console.log(`Server started: ${format(new Date(), "PPp")}`);
  }
}

export default new Logger();
