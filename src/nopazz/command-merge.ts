import { AccountManager } from "./account-manager";
import { askForInput, askForSecret } from "../common/console-input";
import { printEmptyLine, printErrorLine, printHeadline, printLine } from "../common/console-output";

export async function mergeAccount(args: string[], accountManager: AccountManager) {
  if (args.length < 1) {
    printErrorLine("Please specify the path to another account file to merge.");
    return;
  }

  const accountFilePath = args[0];

  const mainPassword = await askForSecret(`Main password for ${accountFilePath}: `);

  printEmptyLine();

  const anotherAccountManager = new AccountManager(accountFilePath, mainPassword);
  anotherAccountManager.readAccountFile();

  const incomingAccounts = anotherAccountManager.listAccount([""]);

  for (const incomingAccount of incomingAccounts) {
    const matchingAccount = accountManager.getAccount(
      incomingAccount.site,
      incomingAccount.username,
    );

    if (!matchingAccount) {
      accountManager.addAccount(incomingAccount);
      printLine(`Created account ${incomingAccount.site} - ${incomingAccount.username}`);
      printEmptyLine();
      continue;
    }

    if (
      matchingAccount.password === incomingAccount.password
      && matchingAccount.message === incomingAccount.message
    ) {
      continue;
    }

    printLine(`The incoming account ${incomingAccount.site} - ${incomingAccount.username} doesn't match existing account.`);
    printLine(`The ${incomingAccount.updatedAt > matchingAccount.updatedAt ? "incoming" : "existing"} account is newer:`);

    printHeadline("    i. accept incoming account");
    printHeadline("    e. keep existing account");

    const choice = (await askForInput("Please choose (i or e, default i): ")).trim();

    if (choice === "e") {
      printLine(`Keep existing account for ${matchingAccount.site} - ${matchingAccount.username}`);
      continue;
    }

    printLine(`Update using incoming account for ${matchingAccount.site} - ${matchingAccount.username}`);
    printEmptyLine();

    accountManager.deleteAccount(matchingAccount.site, matchingAccount.username);
    accountManager.addAccount({
      ...incomingAccount,
      updatedAt: Date.now(),
    });
  }
}
