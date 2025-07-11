import { askForSecret } from "../common/console-input";
import { printLine } from "../common/console-output";
import { AccountManager } from "./account-manager";

export async function changeMainPassword(args: string[], accountManager: AccountManager) {
  const newMainPassword = await askForSecret("New main password: ");
  accountManager.setMainPassword(newMainPassword);

  printLine("Main password successfully updated!");
}
