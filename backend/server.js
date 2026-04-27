const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'temp_secret_change_me';

// Создаем папку uploads если её нет
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

// ============= МИДЛВЭР ДЛЯ ПРОВЕРКИ ТОКЕНА =============
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Требуется авторизация' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Недействительный токен' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен. Требуются права администратора' });
    }
    next();
};

// ============= АВТОРИЗАЦИЯ =============

app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const [existing] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Пользователь с таким именем или email уже существует' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await db.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, 'user']
        );
        
        const token = jwt.sign({ id: result.insertId, username, role: 'user' }, JWT_SECRET, { expiresIn: '24h' });
        
        res.json({ token, user: { id: result.insertId, username, email, role: 'user' } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        
        if (users.length === 0) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }
        
        const user = users[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }
        
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        
        res.json({ 
            token, 
            user: { id: user.id, username: user.username, email: user.email, role: user.role } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// ============= МАРШРУТЫ ДЛЯ ЦВЕТОВ =============

app.get('/api/flowers/table', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        
        const [countResult] = await db.query('SELECT COUNT(*) as total FROM flowers');
        const total = countResult[0].total;
        
        const [rows] = await db.query(
            'SELECT * FROM flowers ORDER BY id LIMIT ? OFFSET ?',
            [limit, offset]
        );
        
        res.json({
            data: rows,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/flowers/all', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, price FROM flowers ORDER BY id');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/flowers/stats', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                COUNT(*) as total,
                AVG(price) as avg_price,
                MIN(price) as min_price,
                MAX(price) as max_price,
                SUM(stock_quantity) as total_stock
            FROM flowers
        `);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/flowers/main', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM flowers LIMIT 3');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/flowers/about', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM flowers LIMIT 5');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============= МАРШРУТЫ ДЛЯ ЦВЕТОВ (CRUD - ТОЛЬКО АДМИН) =============

app.post('/api/flowers', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { name, latin_name, price, stock_quantity, color, season, description, image_url } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO flowers (name, latin_name, price, stock_quantity, color, season, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, latin_name, price, stock_quantity, color, season, description, image_url || '/uploads/1.jpg']
        );
        
        const [newFlower] = await db.query('SELECT * FROM flowers WHERE id = ?', [result.insertId]);
        res.status(201).json(newFlower[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/flowers/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { name, latin_name, price, stock_quantity, color, season, description, image_url } = req.body;
        
        await db.query(
            'UPDATE flowers SET name = ?, latin_name = ?, price = ?, stock_quantity = ?, color = ?, season = ?, description = ?, image_url = ? WHERE id = ?',
            [name, latin_name, price, stock_quantity, color, season, description, image_url, req.params.id]
        );
        
        const [updatedFlower] = await db.query('SELECT * FROM flowers WHERE id = ?', [req.params.id]);
        res.json(updatedFlower[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/flowers/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const [orders] = await db.query('SELECT * FROM orders WHERE flower_id = ?', [req.params.id]);
        
        if (orders.length > 0) {
            return res.status(400).json({ 
                error: 'Нельзя удалить цветок, так как есть связанные заказы',
                orders_count: orders.length 
            });
        }
        
        await db.query('DELETE FROM flowers WHERE id = ?', [req.params.id]);
        res.json({ message: 'Цветок успешно удален', id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// ============= МАРШРУТЫ ДЛЯ ЗАКАЗОВ =============

app.get('/api/orders/table', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        
        const [countResult] = await db.query('SELECT COUNT(*) as total FROM orders');
        const total = countResult[0].total;
        
        const [rows] = await db.query(
            `SELECT o.*, f.name as flower_name 
             FROM orders o 
             LEFT JOIN flowers f ON o.flower_id = f.id 
             ORDER BY o.id DESC 
             LIMIT ? OFFSET ?`,
            [limit, offset]
        );
        
        res.json({
            data: rows,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/orders/stats', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                COUNT(*) as total_orders,
                SUM(total_price) as total_revenue,
                AVG(total_price) as avg_order_value,
                COUNT(DISTINCT customer_email) as unique_customers
            FROM orders
        `);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/orders/contacts', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM orders LIMIT 6');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/employees', async (req, res) => {
    try {
        const employees = [
            { id: 1, name: 'Анна Иванова', position: 'Флорист-дизайнер', experience: '8 лет', photo: '/uploads/11.jpg', bio: 'Создает уникальные букеты с 2015 года' },
            { id: 2, name: 'Мария Петрова', position: 'Старший флорист', experience: '10 лет', photo: '/uploads/22.jpg', bio: 'Эксперт по свадебной флористике' },
            { id: 3, name: 'Елена Сидорова', position: 'Флорист', experience: '5 лет', photo: '/uploads/33.jpg', bio: 'Специализируется на корпоративных заказах' },
            { id: 4, name: 'Ольга Козлова', position: 'Флорист-декоратор', experience: '6 лет', photo: '/uploads/44.jpeg', bio: 'Оформляет мероприятия и праздники' },
            { id: 5, name: 'Татьяна Морозова', position: 'Директор', experience: '12 лет', photo: '/uploads/55.jpeg', bio: 'Основатель цветочного магазина' }
        ];
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============= ВАЖНО: УБЕРИТЕ ИЛИ ИСПРАВИТЕ МАРШРУТ '*' =============
// Если у вас есть маршрут типа '/*', замените его на:

// Тестовый маршрут для проверки работы сервера
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Сервер работает!' });
});

// ИСПРАВЛЕННЫЙ catch-all маршрут (должен быть в самом КОНЦЕ)
app.use('/*', (req, res) => {
    // Если нужно обрабатывать все остальные запросы
    res.status(404).json({ error: 'Маршрут не найден' });
});

// ============= ЗАПУСК СЕРВЕРА =============

app.listen(PORT, () => {
    console.log(`✅ Сервер успешно запущен на порту ${PORT}`);
});
