import { askForInput, askForSecret } from "../common/console-input";
import { getRandomString } from "./random-string";
import { AccountManager } from "./account-manager";

export async function addAccount(args: string[], accountManager: AccountManager) {
  const site = await askForInput("Site: ");
  const username = await askForInput("Username: ");

  const randomPassword = await askForInput("Generate random password? (Y/n): ");
  let password: string = "";
  if (["Y", "y", ""].includes(randomPassword)) {
    password = getRandomString();
  }
  else {
    password = await askForSecret("Password: ");
  }

  const message = await askForInput("Message: ");

  accountManager.addAccount({
    site,
    username,
    password,
    message,
    updatedAt: Date.now(),
  });
}
