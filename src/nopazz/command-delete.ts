import { AccountManager } from "./account-manager";
import { askForInput } from "../common/console-input";
import { printEmptyLine, printErrorLine, printHeadline, printLine } from "../common/console-output";

export async function deleteAccount(args: string[], accountManager: AccountManager) {
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

  const site = account.site;
  const username = account.username;

  accountManager.deleteAccount(site, username);
}
