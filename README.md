# E-Commerce API

This is an E-Commerce API built with Node.js, Express, and MongoDB. The API allows users to manage products and orders, with validation and error handling integrated using Joi.

## Features

- Create, read, update, and delete products.
- Create and read orders.
- Validate incoming data with Joi.
- Handle errors gracefully with custom error responses.
- Reduce product inventory upon order creation.

## Requirements

- Node.js (v14 or later)
- MongoDB (local or cloud instance)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mostaquenaim/Product-ordering-with-express-ts.git
   cd Product-ordering-with-express-ts
2. **Install dependencies**

   ```bash
   npm install
3. **Set up environment variables**
    Create a .env file in the root directory and add the following environment variables:
   
   ```bash
   PORT=5000
   DB_URL= <your mongodb URI>

<h1>Running the Application</h1>
1. **Start the server**

   ```bash
   nodemon .\dist\server.js
