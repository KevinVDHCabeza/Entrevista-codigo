#### Descripción General

El API REST diseñado ofrece endpoints para gestionar usuarios y sus viviendas. A continuación se detallan los principales endpoints y operaciones disponibles:

##### Usuarios

- **GET /users**: Obtiene todos los usuarios.
- **GET /users/{id}**: Obtiene un único usuario por su ID.
- **POST /users**: Crea un nuevo usuario.
- **PATCH /users/{id}**: Actualiza parcialmente un usuario existente.
- **PUT /users/{id}**: Actualiza completamente un usuario existente.
- **DELETE /users/{id}**: Elimina un usuario por su ID.

##### Viviendas

- **GET /users/{userId}/houses**: Obtiene todas las viviendas de un usuario.
- **GET /users/{userId}/houses?city={city}&street={street}&country={country}**: Obtiene las viviendas de un usuario aplicando filtros opcionales de ciudad, calle y país.
- **POST /users/{userId}/houses**: Crea una nueva vivienda para un usuario.
- **PATCH /users/{userId}/houses/{houseId}**: Actualiza parcialmente una vivienda de un usuario.
- **PUT /users/{userId}/houses/{houseId}**: Actualiza completamente una vivienda de un usuario.
- **DELETE /users/{userId}/houses/{houseId}**: Elimina una vivienda de un usuario por su ID.

---

#### Justificación del Diseño

- **Múltiples Métodos de Consulta**: Se utilizan diferentes métodos de consulta (GET, POST, PATCH, PUT, DELETE) para permitir la realización de diversas operaciones sobre los recursos de usuarios y viviendas.
- **Operaciones RESTful**: Se sigue el principio de diseño RESTful para definir las operaciones de manera que sean intuitivas y sigan las convenciones del protocolo HTTP.
- **Parámetros de Consulta**: Para el filtrado de viviendas se utilizan parámetros de consulta (query parameters) en lugar de path parameters, ya que los filtros son opcionales y no están directamente relacionados con la identificación de recursos.
- **Códigos de Estado HTTP**: Se devuelven los códigos de estado HTTP adecuados para cada operación, por ejemplo, 200 OK para respuestas exitosas, 201 Created para creaciones exitosas, 404 Not Found para recursos no encontrados, y 400 Bad Request para solicitudes inválidas.

---

#### Consideraciones Adicionales

- **Actualizar Usuarios Parcialmente vs. Completamente**: Se diferencia entre actualizar usuarios parcialmente (PATCH) y actualizarlos completamente (PUT) para ofrecer flexibilidad al cliente. La actualización parcial permite modificar solo ciertos campos, mientras que la actualización completa requiere el envío de todos los datos del usuario. Esto puede ser útil en diferentes escenarios según las necesidades del cliente.
- **Borrar Usuarios con Viviendas**: Al intentar borrar un usuario que tiene viviendas asociadas, se devuelve un error (por ejemplo, 409 Conflict) para indicar que existen dependencias y que primero deben eliminarse las viviendas asociadas.

