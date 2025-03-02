import { execSync } from "node:child_process";

export function copyToClipboard(content: string) {
  const clipboardCommand = process.env.NOPAZZ_CLIPBOARD;
  execSync(`echo -n '${content}' | ${clipboardCommand}`, { stdio: "ignore" });
}

export function clearClipboard() {
  const clipboardCommand = process.env.NOPAZZ_CLIPBOARD;
  execSync(`echo -n '' | ${clipboardCommand}`, { stdio: "ignore" });
}
