## Project Overview
This project is a React-based web application that allows users to browse, filter, sort, and save their favorite stores. It features a dynamic interface with categories, cashback options, letter-based filters, and sorting preferences. Users can explore stores, search for specific ones, and manage their favorites, with preferences saved locally for a personalized experience.

## Features
- Browse and search stores by name or category.
- Filter stores based on cashback status, promotional status, and more.
- Sort stores by name, popularity, and cashback amount.
- Bookmark favorite stores with local storage support.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository and navigate to the project folder.
2. Run `npm install`.
3. Start the project using `npm run start`.
4. Access the React website at http://localhost:3000 and the API at http://localhost:3001.

### API Consumption
The project communicates with the following API endpoints to manage store data:
### Category List API
- **Get List of Categories**: Retrieve a list of categories. 
   Example: http://localhost:3001/categories

### Store Sort
- **Sort by Categories(alphabet)**: Sort stores by starting alphabet character. 
   Example: http://localhost:3001/stores?name_like=^a

- **Sort by Categories(cashback_enabled)**: Sort stores with cashback enabled. 
   Example: http://localhost:3001/stores?cashback_enabled=1

### Store Filter
- **Sort by Categories(name)**: Sort stores by name. 
   Example: http://localhost:3001/stores?name_like=ali

- **Sort by Categories(Popularity)**: Sort stores by popularity based on clicks.
   Example: http://localhost:3001/stores?_sort=clicks&_order=desc

- **Sort by Categories(status)**: Sort stores by status (publish|draft|trash). 
   Example: http://localhost:3001/stores?status=draft
   
- **Sort by Categories(cats)**: Sort stores by category. 
   Example: http://localhost:3001/stores?cats=1

- **Sort by Categories(cashback)**: Sort stores by cashback amount. 
   Example: http://localhost:3001/stores?_sort=amount_type,cashback_amount&_order=asc,desc

### Store Search
- **Sort by Name**: Sort stores by name. 
   Example: http://localhost:3001/stores?name_like=ali

### Pagination
- **Paginate Results**: Use pagination to limit the number of results displayed.
   Example: http://localhost:3001/stores?_page=1&_limit=20

### Conclusion
- This project provides a comprehensive store management interface, with filtering, searching, and sorting functionalities to improve user experience. The application is built using modern frontend technologies, including React and Headless UI. It also interacts with a backend API for fetching store data, categories, and supporting user actions like saving favorite stores.