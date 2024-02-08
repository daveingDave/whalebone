# Whalebone Homework

## Prerequisites

To run the tests, you need to have either of the following prerequisites:

1. **Playwright and Node.js installed**:
    - Ensure you have Node.js installed on your system.
    - Install Playwright by running `npm init playwright@latest` in your terminal.
    - Install dependencies `npm ci`

OR

2. **Docker available**:
    - Docker needs to be installed and configured on your system.

## Usage

### Running Tests

To run the tests:

- `npm run test`: Runs the tests in headless mode.
- `npm run test-headed`: Runs the tests in headed mode.

### Running Tests with Docker

To run the tests using Docker:

- `npm run docker`: Builds and runs the tests inside a Docker container.
