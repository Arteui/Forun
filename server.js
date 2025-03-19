const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://tema333345:qwerty123@cluster0.gz8dh.mongodb.net/comments?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Подключено к MongoDB'))
  .catch(err => console.error('❌ Ошибка подключения к MongoDB:', err));

// Модель комментария
const Comment = mongoose.model('Comment', new mongoose.Schema({
  text: String,
  children: Array
}), 'comm');  // <-- Указываем правильную коллекцию

// 📌 Возвращаем JSON, а не HTML
app.get('/', async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);  // Возвращаем JSON, а не HTML
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// ⚠️ Добавь обработчик для несуществующих маршрутов (чтобы не было 404 HTML)
app.use((req, res) => {
  res.status(404).json({ message: 'Ресурс не найден' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));




app.get('/', async (req, res) => {
  try {
    console.log('Запрос получен на сервер');
    const comments = await Comment.find({});
    console.log('Данные из MongoDB:', comments); // Логируем данные
    if (comments.length === 0) {
      console.log('Нет данных в базе');
    }
    res.json(comments);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
