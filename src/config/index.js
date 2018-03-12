export default {
    database: 'mongodb://localhost/appify_db',
    port: 3000,
    test_port: 3001,
    test_env: 'test',
    defaultChannel: 'general',
    secret: 'UNICORNS_ARE_REAL',
    secret_ENV: process.env.JWT_SECRET
}