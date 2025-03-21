const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://tema333345:qwerty123@cluster0.gz8dh.mongodb.net/Comments?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Подключено к MongoDB'))
  .catch(err => console.error('❌ Ошибка подключения к MongoDB:', err));

const commentSchema = new mongoose.Schema({
  text: String,
  id: Number,             // Твой ID
  children: [Object]      // Дети храним как массив объектов
});

const Comment = mongoose.model('Comment', commentSchema, 'comm');

// Получение комментариев
app.get('/', async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
});

// Функция для рекурсивного добавления ответа
function addCommentRecursive(comments, parentId, newComment) {
  for (let comment of comments) {
    if (comment.id === Number(parentId)) {   
      if (!comment.children) {
        comment.children = [];
      }
      comment.children.push(newComment);
      return true;
    }

    if (comment.children && comment.children.length > 0) {
      if (addCommentRecursive(comment.children, parentId, newComment)) {
        return true;  
      }
    }
  }
  return false;
}

// Добавление комментария
app.post('/comments', async (req, res) => {
  try {
    const { text, parentId } = req.body;
    const newComment = {
      text,
      id: Date.now(),
      children: []
    };

    const comments = await Comment.find({});
    
    if (parentId) {
      // Рекурсивно ищем родительский комментарий по твоему ID
      const updated = addCommentRecursive(comments, parentId, newComment);

      if (!updated) {
        return res.status(404).json({ message: 'Родительский комментарий не найден' });
      }

      // Перезаписываем все комментарии в базу (неэффективно для огромных данных, но нормально для твоего случая)
      await Comment.deleteMany({});
      await Comment.insertMany(comments);
      
      console.log('Ответ добавлен в родительский комментарий:', parentId);
    } else {
      // Добавляем новый корневой комментарий
      const comment = new Comment(newComment);
      await comment.save();
      console.log('Добавлен корневой комментарий');
    }

    res.status(201).json({ message: 'Комментарий добавлен' });

  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
