exports.swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Books API V1",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3007",
        description: "Development server",
      },
    ],
    paths: {
      "/api/v1/books": {
        get: {
          tags: ["Books"],
          summary: "List All Books",
          description: "List All Books",
          responses: {
            200: {
              $ref: "#/responses/BooksResponse",
            },
          },
        },
      },
      "/api/v1/book/{id}": {
        get: {
          summary: "Get Book By Id",
          tags: ["Books"],
          description: "Get Book By Id",
          responses: {
            200: {
              $ref: "#/responses/BookResponse",
            },
          },
          parameters: [
            {
              $ref: "#/parameters/BookByIdParam",
            },
          ],
        },
        delete: {
          tags: ["Books"],
          summary: "Delete Book By Id",
          description: "Delete Book By Id",
          responses: {
            200: {
              $ref: "#/responses/deleteBookResponse",
            },
          },
          parameters: [
            {
              $ref: "#/parameters/BookByIdParam",
            },
          ],
        },
        put: {
          tags: ["Books"],
          summary: "Update Book By Id",
          description: "Update Book By Id",
          responses: {
            200: {
              $ref: "#/responses/updateBookResponse",
            },
          },
          parameters: [
            {
              $ref: "#/parameters/BookByIdParam",
            },
            {
              $ref: "#/parameters/BookBodyParam",
            },
          ],
        },
      },
      "/api/v1/book": {
        post: {
          tags: ["Books"],
          summary: "Create a book",
          description: "Create a book",
          responses: {
            201: {
              $ref: "#/responses/BookCreatedResponse",
            },
          },
          parameters: [
            {
              $ref: "#/parameters/CreateBookBodyParam",
            },
          ],
        },
      },
    },
    definitions: {
      BooksModel: {
        properties: {
          books: {
            type: "array",
            $ref: "#/definitions/BookModel",
          },
        },
      },
      BookModel: {
        properties: {
          _id: {
            type: "string",
          },
          title: {
            type: "string",
          },
          author: {
            type: "string",
          },
          genre: {
            type: "string",
          },
          ISBN: {
            type: "string",
          },
          cover_image: {
            type: "string",
          },
          description: {
            type: "string",
          },
          number_of_pages: {
            type: "integer",
            format: "int32",
          },
          publications: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      UpdateBookModel: {
        properties: {
          title: {
            required: true,
            type: "string",
          },
          author: {
            required: true,
            type: "string",
          },
          ISBN: {
            required: true,
            type: "string",
          },
        },
      },
      CreateBookModel: {
        properties: {
          title: {
            required: true,
            type: "string",
          },
          author: {
            required: true,
            type: "string",
          },
          ISBN: {
            required: true,
            type: "string",
          },
          genre: {
            type: "string",
          },
          cover_image: {
            type: "string",
          },
          number_of_pages: {
            type: "integer",
          },
          publications: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      UpdateBookModelResponse: {
        properties: {
          update: {
            type: "object",
            $ref: "#/definitions/updateBookResponse",
          },
        },
      },
      DeleteBookModelResponse: {
        properties: {
          delete: {
            type: "object",
            $ref: "#/definitions/updateBookResponse",
          },
        },
      },
      updateBookResponse: {
        properties: {
          msg: {
            type: "string",
          },
        },
      },
    },
    responses: {
      BooksResponse: {
        description: "List All Books",
        schema: {
          $ref: "#/definitions/BooksModel",
        },
      },
      BookResponse: {
        description: "Get Book By Id",
        schema: {
          $ref: "#/definitions/BookModel",
        },
      },
      BookCreatedResponse: {
        description: "Create book response",
        schema: {
          $ref: "#/definitions/BookModel",
        },
      },
      updateBookResponse: {
        description: "Book updated status",
        schema: {
          $ref: "#/definitions/UpdateBookModelResponse",
        },
      },
      deleteBookResponse: {
        description: "Book delete status",
        schema: {
          $ref: "#/definitions/DeleteBookModelResponse",
        },
      },
    },
    parameters: {
      BookByIdParam: {
        name: "id",
        in: "path",
        type: "string",
        required: "true",
        placeholder: "",
      },
      BookBodyParam: {
        name: "params",
        in: "body",
        type: "object",
        required: "true",
        schema: {
          $ref: "#/definitions/UpdateBookModel",
        },
      },
      CreateBookBodyParam: {
        name: "params",
        in: "body",
        type: "object",
        required: "true",
        schema: {
          $ref: "#/definitions/CreateBookModel",
        },
      },
    },
  },
  apis: ["./src/service/server.js"],
};
