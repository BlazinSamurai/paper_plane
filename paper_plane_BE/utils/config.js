// If .env exists -> Use the production secret from the file
// If .env doesn't exist -> Use the fallback "the-most..."

const { JWT_SECRET = "the-most-secret-key" } = process.env;

module.exports = { JWT_SECRET };
