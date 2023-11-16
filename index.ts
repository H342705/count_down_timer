import inquirer from 'inquirer';
import { format, differenceInMilliseconds } from 'date-fns';


async function getTargetDateFromUser(): Promise<Date> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'targetDate',
      message: 'Enter the target date (YYYY-MM-DD):',
      validate: (input) => {
        const date = new Date(input);
        return isNaN(date.getTime()) ? 'Invalid date format' : true;
      },
    },
  ]);
  return new Date(answers.targetDate);
}

function calculateTimeDifference(targetDate: Date): number {
  const currentDate = new Date();
  return differenceInMilliseconds(targetDate, currentDate);
}

function formatTimeRemaining(timeRemaining: number): string {
  const seconds = Math.floor(timeRemaining / 1000) % 60;
  const minutes = Math.floor(timeRemaining / (1000 * 60)) % 60;
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60)) % 24;
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

async function startCountdown(): Promise<void> {
  const targetDate = await getTargetDateFromUser();

  setInterval(() => {
    const timeRemaining = calculateTimeDifference(targetDate);
    const formattedTime = formatTimeRemaining(timeRemaining);
    console.log(`Time remaining: ${formattedTime}`);
  }, 1000);
}

// Start the countdown
startCountdown();
