const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'flower_shop',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.DB_SSL === 'true' ? {} : false
});

// Проверка подключения
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ База данных успешно подключена');
        connection.release();
    } catch (error) {
        console.error('❌ Ошибка подключения к БД:', error.message);
    }
})();

module.exports = pool;
