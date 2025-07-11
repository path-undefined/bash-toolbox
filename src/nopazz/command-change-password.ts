import { askForSecret } from "../common/console-input";
import { printEmptyLine, printLine } from "../common/console-output";
import { AccountManager } from "./account-manager";

export async function changeMainPassword(args: string[], accountManager: AccountManager) {
  const newMainPassword = await askForSecret("New main password: ");
  accountManager.setMainPassword(newMainPassword);

  printEmptyLine();

  printLine("Main password successfully updated!");
}
