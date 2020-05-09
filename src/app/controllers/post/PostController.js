import Post from './../../models/post/Post';
import Category from './../../models/category/Category';
import Response from './../../models/Response';
import generateSlug from './../../utils/generateSlug';

class PostController {
  async index(req, res) {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      return res.status(200).json(new Response(200, 'sucesso', posts));
    } catch (err) {
      return res.status(500).json(new Response(500, 'Erro interno', null));
    }
  }

  async get(req, res) {
    try {
      let { link = '' } = req.params;
      link = generateSlug(link);

      const post = await Post.findOne({ link }).populate('links');

      if (!post) {
        return res
          .status(404)
          .json(new Response(404, 'post não encontrado', null));
      }

      return res.status(200).json(new Response(200, 'sucesso', post));
    } catch (err) {
      return res
        .status(500)
        .json(new Response(500, 'Erro interno', err.message));
    }
  }

  async store(req, res) {
    try {
      const { title, server, year, size, categoryId } = req.body;
      const { filename: image } = req.file;
      const link = generateSlug(title);

      const postExists = await Post.findOne({ link });
      if (postExists) {
        return res.status(400).json(new Response(400, 'post já existe', null));
      }

      const category = await Category.findOne({ _id: categoryId });
      if (!category) {
        return res
          .status(404)
          .json(new Response(404, 'categoria não encontrada', null));
      }

      const post = await Post.create({
        title,
        server,
        year,
        link,
        size,
        image,
        category,
      });
      category.posts.push(post);
      await category.save();

      return res.status(201).json(new Response(201, 'post criado', post));
    } catch (err) {
      return res
        .status(500)
        .json(new Response(500, 'Erro interno', err.message));
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, server, year, size } = req.body;
    const link = generateSlug(title);
    let image;

    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res
        .status(404)
        .json(new Response(404, 'post não encontrado', null));
    }

    if (req.file) {
      image = req.file.filename;
      post.image = image;
    }

    post.title = title;
    post.server = server;
    post.year = year;
    post.size = size;
    post.link = link;

    await post.save();

    return res.status(200).json(new Response(200, 'post editado', post));
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findOne({ _id: id });
      if (!post) {
        return res
          .status(404)
          .json(new Response(404, 'post não encontrado', null));
      }

      await post.remove();

      return res.status(200).json(new Response(200, 'post excluído', null));
    } catch (err) {
      return res
        .status(500)
        .json(new Response(500, 'Erro interno', err.message));
    }
  }
}

export default new PostController();
