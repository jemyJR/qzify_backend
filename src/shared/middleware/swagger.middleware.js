const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "🎓 Qzify API",
      description: `REST API for Qzify Online Examination System

🔒 **Authentication** • 👥 **User Management** • ❓ **Questions** 

---
**Version**: 1.0.0

**Contact**:
- **Mohamed Gamal** : [LinkedIn](https://www.linkedin.com/in/jemy25/) | [Email](mailto:mohamedgamalwork25@gmail.com)
- **Esraa Gamal** : [LinkedIn]() | [Email](mailto:)
`,
      version: "1.0.0"
    },
    servers: [
      {
        "url": "http://localhost:3000",
        "description": "Local Development Server"
      },
      {
        "url": "https://onlineexamsystem-staging.up.railway.app",
        "description": "Staging Server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    './src/features/**/*.routes.js',
    './src/shared/swagger/**/*.js',
  ],
};

const specs = swaggerJsdoc(options);

const swaggerMiddleware = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerMiddleware;