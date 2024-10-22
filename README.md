# Live Football World Cup Scoreboard

Welcome to the **Live Football World Cup Scoreboard** library! This library allows you to track ongoing football matches, update scores, finish matches, and get a summary of all matches in progress, ordered according to specific criteria.

---

**Note**: This library is a simplified implementation intended for educational purposes and may not cover all real-world scenarios.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Starting a Match](#starting-a-match)
  - [Updating a Score](#updating-a-score)
  - [Finishing a Match](#finishing-a-match)
  - [Getting the Summary](#getting-the-summary)
- [Running Tests](#running-tests)
- [Assumptions](#assumptions)
- [Design Decisions](#design-decisions)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Start a New Match**: Begin tracking a new football match with specified home and away teams.
- **Update Scores**: Update the scores of an ongoing match with absolute values.
- **Finish Matches**: Conclude an ongoing match, removing it from the scoreboard.
- **Get Summary**: Retrieve a summary of all matches in progress, ordered by total score and recency.

## Installation

You can install the package from npm:

```bash
npm install football-scoreboard
```

Ensure you have [Node.js](https://nodejs.org/en/) installed on your system.

**or**

Clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/scoreboard.git
cd scoreboard
npm install
```

## Usage

This library is designed to be simple and straightforward to use in any Node.js project.

### Starting a Match

To start tracking a new match:

```typescript
import { Scoreboard } from 'football-scoreboard';

const scoreboard = new Scoreboard();
scoreboard.startMatch('Mexico', 'Canada');
```

### Updating a Score

To update the score of an ongoing match:

```typescript
scoreboard.updateScore('Mexico', 'Canada', 0, 5);
```

The scores are absolute and correspond to the home and away teams, respectively.

### Finishing a Match

To finish a match and remove it from the scoreboard:

```typescript
scoreboard.finishMatch('Mexico', 'Canada');
```

### Getting the Summary

To get a summary of all matches in progress:

```typescript
const summary = scoreboard.getSummary();
console.log(summary);
```

The summary will list matches ordered by their total score (descending). Matches with the same total score are ordered by the most recently started match.

**Example Output:**

```
1. Uruguay 6 - Italy 6
2. Spain 10 - Brazil 2
3. Mexico 0 - Canada 5
4. Argentina 3 - Australia 1
5. Germany 2 - France 2
```

## Running Tests

The project uses [Vitest](https://vitest.dev/) for testing. To run the test suite:

```bash
npm run test
```

Ensure all tests pass before using the library in production.

## Assumptions

- **Unique Team Names**: Each team is uniquely identified by its name. Duplicate team names are not allowed.
- **Case Insensitivity**: Team names are case-insensitive and trimmed of leading/trailing whitespace.
- **Team Participation**: A team cannot participate in more than one match simultaneously.
- **Valid Scores**: Scores are non-negative integers.
- **Team Order**: When updating scores or finishing matches, team names must be provided in the same order as when the match was started (home team first, away team second).

## Design Decisions

- **In-Memory Data Structures**: Used `Map`, `Array`, and `Set` to store matches, sorted matches, and active teams for efficient data management.
- **Normalization of Team Names**: Team names are normalized (trimmed and converted to lowercase) to ensure consistency in comparisons.
- **Order-Independent Match Key**: The match key is generated based on normalized team names to prevent duplicate matches and ensure consistency.
- **Binary Search for Insertion**: A binary search algorithm (`findInsertionIndex`) is used to efficiently insert matches into the sorted array based on total score and start time.
- **Error Handling**: Clear and descriptive error messages are provided for invalid operations, enhancing usability and debugging.

## Project Structure

```
├── src
│   ├── constants.ts       // Error messages and constants
│   ├── match.ts           // Match class definition
│   ├── scoreboard.ts      // Scoreboard class definition
├── tests
│   ├── match.test.ts      // Tests for Match class
│   ├── scoreboard.test.ts // Tests for Scoreboard class
├── package.json           // Project configuration and scripts
├── tsconfig.json          // TypeScript configuration
└── README.md              // Project documentation
```

## Dependencies

- **Node.js**: Runtime environment for executing JavaScript code.
- **TypeScript**: For static type checking and improved code quality.
- **Vitest**: A fast unit test framework for running tests.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes, ensuring code quality and passing tests.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the ISC License.