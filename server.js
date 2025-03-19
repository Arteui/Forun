const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Подключение к MongoDB Atlas
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://tema333345:qwerty123@forumdata.i71cb.mongodb.net/?retryWrites=true&w=majority&appName=ForumData';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB подключен'))
  .catch(err => console.error('Ошибка подключения:', err));

// Модель данных
const commentSchema = new mongoose.Schema({
  text: String,
  id: Number,
  children: Array
});

const Comment = mongoose.model('comme', commentSchema, 'comme');

// API для получения комментариев
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).send('Ошибка получения данных');
  }
});

// Запуск сервера
app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));
