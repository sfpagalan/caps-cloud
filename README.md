# CAPS Cloud

CAPS Cloud is a cloud-based version of the Code Academy Parcel Service (CAPS), a real-time package delivery tracking system. It uses AWS services such as SQS and SNS for managing package delivery events between vendors and drivers. This README provides an overview of the project, instructions for setting it up, and how to use it.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Running](#running)
- [Testing](#testing)
- [Deployment](#deployment)
- [Author](#author)
- [License](#license)

## Getting Started

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/sfpagalan/caps-cloud.git
   cd caps-cloud
    `npm install`

## Project Structure

caps-cloud/
  ├── node_modules/
  ├── src/
  │     ├── drivers/
  │     │     ├── driver.js
  │     ├── vendors/
  │     │     ├── vendor.js
  ├── tests/
  │     ├── drivers/
  │     │     ├── driver.test.js
  │     ├── vendors/
  │     │     ├── vendor.test.js
  ├── .gitignore
  ├── LICENSE
  ├── package-lock.json
  ├── package.json
  ├── README.md

## Running

1. Start the driver:
    `npm run driver`

2. Start the vendor:
    `npm run vendor`

## Testing

1. Run the tests using:
    `npm test`

## Deployment

## Author

Sydney Mae Pagalan

## License

This project is licensed under the [License Name] License - see the [LICENSE.md](LICENSE.md) file for details.
