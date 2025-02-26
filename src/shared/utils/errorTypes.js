class RuntimeError extends Error {
    constructor(message, details = null, statusCode = 500) {
      super(message);
      this.name = this.constructor.name;
      this.details = details;
      this.statusCode = statusCode;
    }
  }
  
  class ResourceNotFoundError extends RuntimeError {
    constructor(resource, field, value, message = 'Not Found') {
      const details = `${resource} with ${field}: ${value} not found`;
      super(message, details, 404);
      this.resource = resource;
      this.field = field;
      this.value = value;
    }
  }
  
  module.exports = { RuntimeError, ResourceNotFoundError };