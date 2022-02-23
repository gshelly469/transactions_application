# transactions_application

### Step 1: Setup the environment in the local environment
1) Clone the repository in the Application folder 
2) Go to the Application folder in cmd and run `npm install` command
3) Open new cmd reminal, go to `Application->client` and run `npm install` command
> The Front-end application will run on the port 3000 of local machine and Back-end application will run on the port 5000

### Step 2: Add .env file
Add .env file to application folder</br>
First variable is the `Secret_key_jwt` for the signing of the JWT token</br>
Second variable is the `DB_connection` for the MongoDB srv connection string

### Step 3: Run the Application
1) In application folder run `npm start` in cmd to run the epxress
2) In application->client folder run `npm start` in cmd to the react app

## This application is vulnerable to `xss attacks` as it stores JWT token in local storage. Kindly wait for further updates
