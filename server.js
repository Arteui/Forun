const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://tema333345:qwerty123@cluster0.gz8dh.mongodb.net/Comments?retryWrites=true&w=majority&appName=Cluster0";
console.log('Подключение к MongoDB:', MONGO_URI);
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Подключено к MongoDB'))
  .catch(err => console.error('❌ Ошибка подключения к MongoDB:', err));

// Модель комментария

const commentSchema = new mongoose.Schema({
  text: String,
  id: Number,
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

const Comment = mongoose.model('Comment', commentSchema, 'comm');

app.get('/', async (req, res) => {
  try {
    console.log('Запрос получен на сервер');
    const comments = await Comment.find({}).populate('children');
    console.log('Данные из MongoDB:', comments);

    if (comments.length === 0) {
      console.log('Нет данных в базе');
    }

    res.json(comments);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.post('/comments', async (req, res) => {
  try {
    const { text, parentId } = req.body;  // Получаем текст комментария и parentId
    console.log('Полученные данные:', { text, parentId });  // Логируем данные

    // Создаем новый комментарий
    const newComment = new Comment({
      text: text,
      id: Date.now(),
      children: []  // Новый комментарий изначально не имеет детей
    });

    // Если есть parentId, это значит, что это ответ
    if (parentId) {
      console.log('Ищем родительский комментарий с ID:', parentId);  // Логируем поиск родителя
      // Находим родительский комментарий по parentId
      const parent = await Comment.findById(parentId);

      if (parent) {
        console.log('Родительский комментарий найден:', parent);  // Логируем найденного родителя
        // Добавляем новый комментарий в children родительского комментария
        parent.children.push(newComment._id);  // Добавляем _id нового комментария
        await parent.save();  // Сохраняем родительский комментарий с обновленным полем children
        console.log('Ответ добавлен в родительский комментарий');
      } else {
        return res.status(404).json({ message: 'Родительский комментарий не найден' });
      }
    }

    // Сохраняем сам новый комментарий в базе
    await newComment.save();
    res.status(201).json({ message: 'Комментарий добавлен', comment: newComment });

  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
