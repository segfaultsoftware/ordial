import chalk from "chalk";

/**
 * Add a step to the current test and log the results
 * @param {string} testDescription
 * @param {Promise<void>} testingScript
 * @returns {Promise<void>}
 */
const step = (testDescription, testingScript) => {
  return testingScript.then(() => {
    console.log(chalk.green("    ✓") + chalk.gray(` ${testDescription}`));
  }).catch((error) => {
    console.log(chalk.red("    ✗") + chalk.gray(` ${testDescription}`));
    throw error;
  });
};

export default step;