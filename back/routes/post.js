const express = require('express');
const db = require('../models');
const { Post, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const postRouter = express.Router();

postRouter.route('/').get(async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        // 커멘트 join 문 order by
        [db.Comment, 'createdAt', 'DESC'],
      ],
      include: [
        { model: db.User, attributes: ['id', 'nickname'] },
        { model: db.Image },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: db.User,
          as: 'Liker',
          attributes: ['id'],
        },
      ],
    });

    return res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

postRouter
  .route('/')
  .post(isLoggedIn, async (req, res, next) => {
    const { new_post } = req.body;
    try {
      const post = await Post.create({
        content: new_post,
        UserId: req.user.id,
      });

      const responseData = await Post.findOne({
        where: {
          id: post.id,
        },
        include: [
          {
            model: db.User,
          },
          {
            model: db.Comment,
          },
          {
            model: db.Image,
          },
          {
            model: db.User,
            as: 'Liker',
            attributes: ['id'],
          },
        ],
      });

      res.status(201).json(responseData);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

postRouter
  .route('/:postId')
  .delete(isLoggedIn, async (req, res, next) => {
    try {
      const postId = req.params.postId;
      await Post.destroy({
        where: {
          id: postId,
        },
      });
      res.json({ PostId: postId });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

postRouter
  .route('/:postId/comment')
  .post(isLoggedIn, async (req, res, next) => {
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId },
      });

      if (!post) {
        return res
          .status(403)
          .send('존재하지 않는 게시물 입니다.');
      }

      const comment = await Comment.create({
        content: req.body.content,
        PostId: parseInt(post.id),
        UserId: req.user.id,
      });

      const fullComment = await Comment.findOne({
        where: {
          id: comment.id,
        },
        include: [
          {
            model: db.User,
            attributes: ['id', 'nickname'],
          },
        ],
      });

      res.status(200).send(fullComment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

postRouter
  .route('/:postId/like')
  .patch(isLoggedIn, async (req, res, next) => {
    try {
      const userId = req.user.id;

      const post = await Post.findOne({
        where: {
          id: req.params.postId,
        },
      });
      if (!post) {
        res
          .status(403)
          .send('존재하지 않는 게시물 입니다.');
      }

      await post.addLiker(userId);

      return res.json({
        PostId: post.id,
        UserId: userId,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

postRouter
  .route('/:postId/like')
  .delete(isLoggedIn, async (req, res, next) => {
    try {
      const userId = req.user.id;

      const post = await Post.findOne({
        where: {
          id: req.params.postId,
        },
      });
      if (!post) {
        res
          .status(403)
          .send('존재하지 않는 게시물 입니다.');
      }

      await post.removeLiker(userId);

      return res.json({
        PostId: post.id,
        UserId: userId,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = postRouter;
