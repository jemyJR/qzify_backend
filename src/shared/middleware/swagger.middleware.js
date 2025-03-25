const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "🎓 Qzify API",
      description: `🎓 **Qzify API Documentation**

### ✨ **Features**
🔑 **Authentication · 👥 User Management · ❓ Questions Management · 📝 Quiz Attempts · 🛡️ Security**

---

### 📚 **Repository**
Find the source code and contribute to the project on GitHub:  [Qzify Backend GitHub Repository](https://github.com/jemyJR/qzify_backend)

---

### 📞 **Contact**
- **Mohamed Gamal**: [LinkedIn](https://www.linkedin.com/in/jemy25/) | [Email](mailto:mohamedgamalwork25@gmail.com)
- **Esraa Gamal**: [LinkedIn](https://www.linkedin.com) | [Email](mailto:)
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