import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import moment from "moment";
import random from "random";

const N = 150;

const run = (cmd, date) =>
  execSync(cmd, {
    stdio: "inherit",
    env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
  });

for (let i = 0; i < N; i++) {
  const date = moment()
    .subtract(random.int(0, 50), "w")
    .subtract(random.int(0, 6), "d")
    .hour(random.int(9, 20))
    .minute(random.int(0, 59))
    .second(random.int(0, 59))
    .format();

  writeFileSync("data.json", JSON.stringify({ date }));
  run("git add data.json", date);
  run(`git commit -m "chore: activity ${date}"`, date);
  process.stdout.write(".");
}

execSync("git push", { stdio: "inherit" });
console.log("\ndone");
