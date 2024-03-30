const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Підключення до бази даних PostgreSQL
const sequelize = new Sequelize('roman', 'roman', 'roman', {
    host: 'localhost',
    port: 9911,
    dialect: 'postgres'
});

// Опис моделі користувача (User)
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Синхронізуємо модель з базою даних
User.sync();

// Запит на отримання користувачів
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Помилка отримання користувачів:', error);
        res.status(500).json({ error: 'Помилка отримання користувачів' });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ where: { id: userId } });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Користувач не знайдений' });
        }
    } catch (error) {
        console.error('Помилка отримання користувача за id:', error);
        res.status(500).json({ error: 'Помилка отримання користувача за id' });
    }
});

// Слухаємо запити на вказаному порті
app.listen(port, () => {
    console.log(`Сервер запущено на порті ${port}`);
});
