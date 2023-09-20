# Frontend Challenge - Vibbra

## • **_IT Marketplace Project - E-commerce_**

### 1. **General Ideia:**

An application was implemented using `React.js` with _javascript_ following the requested scope. For styling, it was decided to use `scss` using the _BEM (block, element, modifier)_ methodology.

### 2. **Start the environment:**

- As we use `json-server` as a backend simulation, it is necessary to run the json-server server to use the application.
- Just run the command below in the terminal to get the server up and running:

```
json-server --watch db.json
```

- The application was built using Vite. If you want to use the Vite server to view the application, just run the following command and click on the first generated link, localhost:

```
yarn dev --host
```

### 3. **Flow:**

This application includes:

- Header: In our header, we can switch between light or dark themes, search for offers, log in/create an account (if logged out), or create a negotiation/view negotiations (if logged in).

- Homepage: The initial screen that the user accesses to view the available offers, with the option to filter by name. These offers include geolocation, allowing the user to view offers closest to their location if they enable it in their browser; otherwise, all offers will be listed.

- Login screen: It is possible to create a new user by filling in the username, password, and confirming the password. These fields have standard validations, such as minimum and maximum username length, and minimum password requirements (at least one special character, number, and uppercase letter, for example). If all conditions are met, the user is successfully created and saved in our backend simulation (json-server). It is also possible to log in via SSO, using Auth0 (Google, GitHub, etc.).

- After logging into the application, the user returns to the homepage, now with the option to access a dropdown menu, where they can create a request or access all previously created requests. When selecting "create request," the user can enter a new offer, view negotiation details, send a message, and view message history, track status, etc. Clicking on "my negotiations" allows them to list and edit offers already created by them.

### 4. **Note:**

- A simple and pleasing color scheme was chosen for the layout. Easy to interact with and intuitive for the user's better experience.
