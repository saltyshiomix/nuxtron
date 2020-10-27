import chalk from 'chalk';

const log = (text: string) => {
  console.log(chalk`{cyan [nuxtron]} ${text}`);
};

export default log;
