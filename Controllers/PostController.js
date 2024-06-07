import Post from "../models/Post.js";
import PostModel from "../models/Post.js";
import { validationResult } from "express-validator";

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        id: postId,
      },
      {
        title: req.body.title,
        mini_title: req.body.mini_title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        date: req.body.date,
        user: req.userId,
        viewCount: req.viewCount,
      }
    )
      .then(() => {
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Данной статьи не существует",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка при обновлении новости",
    });
  }
};

export const removePost = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndDelete({
      id: postId,
    })
      .then(() => {
        res.json({
          message: "Новость успешно удалена",
          postId: postId,
        });
      })
      .catch((err, doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Новость не найдена",
          });
        }
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить новость",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка при удалении новости",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndUpdate(
      {
        id: postId,
      },
      {
        $inc: {
          viewCount: 1,
        },
      },
      {
        returnDocument: "after",
      }
    )
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Новость не найдена",
          });
        }
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось получить новость",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка при получении новости",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const posts = await PostModel.find().populate({
      path: "user",
      select: ["name", "avatar"],
    });

    res.json(posts);

    if (!posts) {
      return res.status(404).json({
        message: "Новостей не существует",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Ошибка при получении всех новостей",
    });
  }
};

export const get4 = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const posts = await PostModel.find().populate({
      path: "user",
      select: ["name", "avatar"],
    });

    res.json(posts.slice(-4));

    if (!posts) {
      return res.status(404).json({
        message: "Новостей не существует",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Ошибка при получении всех новостей",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const doc = new PostModel({
      title: req.body.title,
      mini_title: req.body.mini_title,
      description: req.body.description,
      date: req.body.date,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать новость",
    });
  }
};
