#### General Description

The designed REST API offers endpoints to manage users and their houses. Below are the main endpoints and available operations:

##### Users

- **GET /users**: Retrieves all users.
- **GET /users/{id}**: Retrieves a single user by their ID.
- **POST /users**: Creates a new user.
- **PATCH /users/{id}**: Partially updates an existing user.
- **PUT /users/{id}**: Fully updates an existing user.
- **DELETE /users/{id}**: Deletes a user by their ID.

##### Houses

- **GET /users/{userId}/houses**: Retrieves all houses of a user.
- **GET /users/{userId}/houses?city={city}&street={street}&country={country}**: Retrieves the houses of a user applying optional filters of city, street, and country.
- **POST /users/{userId}/houses**: Creates a new house for a user.
- **PATCH /users/{userId}/houses/{houseId}**: Partially updates a user's house.
- **PUT /users/{userId}/houses/{houseId}**: Fully updates a user's house.
- **DELETE /users/{userId}/houses/{houseId}**: Deletes a user's house by its ID.

---

#### Design Justification

- **Multiple Query Methods**: Different query methods (GET, POST, PATCH, PUT, DELETE) are used to allow various operations on user and house resources.
- **RESTful Operations**: The RESTful design principle is followed to define operations in an intuitive manner that adheres to HTTP protocol conventions.
- **Query Parameters**: Query parameters are used for house filtering instead of path parameters, as the filters are optional and not directly related to resource identification.
- **HTTP Status Codes**: Appropriate HTTP status codes are returned for each operation, e.g., 200 OK for successful responses, 201 Created for successful creations, 404 Not Found for non-existent resources, and 400 Bad Request for invalid requests.

---

#### Additional Considerations

- **Partial vs. Complete User Updates**: There is a distinction between partially updating users (PATCH) and fully updating them (PUT) to offer flexibility to the client. Partial updates allow modifying only certain fields, while full updates require sending all user data. This can be useful in different scenarios depending on the client's needs.
- **Deleting Users with Houses**: When attempting to delete a user who has associated houses, an error (e.g., 409 Conflict) is returned to indicate that dependencies exist and the associated houses must be deleted first.
