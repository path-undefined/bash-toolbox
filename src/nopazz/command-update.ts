import { askForInput, askForSecret } from "../common/console-input";
import { printEmptyLine, printErrorLine, printHeadline, printLine } from "../common/console-output";
import { AccountManager } from "./account-manager";
import { getRandomString } from "./random-string";

export async function updateAccount(args: string[], accountManager: AccountManager) {
  if (args.length < 1) {
    printErrorLine("Please specify site and username or provide a search query.");
    return;
  }

  const accounts = accountManager.listAccount(args);

  let account = accounts[0];

  if (accounts.length < 1) {
    printErrorLine(`Query "${args.join(" ")}" doesn't match any account.`);
    return;
  }
  if (accounts.length > 1) {
    printLine(`Query "${args.join(" ")}" matches more than 1 account:`);

    printEmptyLine();

    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];

      printHeadline(`${(i + 1).toString().padStart(2, " ")}. ${account.site} - ${account.username}`);

      if (account.message) {
        printLine(`    ${account.message}`);
      }
    }

    printEmptyLine();

    const choice = await askForInput(`Please choose (1~${accounts.length}): `);
    const choiceIndex = Number(choice.trim()) - 1;

    if (Number.isNaN(choiceIndex) || choiceIndex < 0 || choiceIndex >= accounts.length) {
      printErrorLine("Invalid choice. Abort!");
      return;
    }

    account = accounts[choiceIndex];
  }

  printHeadline(`${account.site} - ${account.username}`);
  if (account.message) {
    printLine(account.message);
  }
  printEmptyLine();

  const site = await askForInput(`Site (${account.site}): `) || account.site;
  const username = await askForInput(`Username (${account.username}): `) || account.username;

  const randomPassword = await askForInput("Generate random password? (Y/n): ");
  let password: string;
  if (["Y", "y", ""].includes(randomPassword)) {
    password = getRandomString();
  }
  else {
    password = await askForSecret("Password (empty for no change): ") || account.password;
  }

  const message = await askForInput(`Message (${account.message}): `) || account.message;

  accountManager.deleteAccount(account.site, account.username);

  accountManager.addAccount({
    site,
    username,
    password,
    message,
    updatedAt: Date.now(),
  });
}
