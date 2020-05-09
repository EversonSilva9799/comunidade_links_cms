import Link from './../../models/link/Link';
import Post from './../../models/post/Post';
import Response from './../../models/Response';

class LinkController {
  async index(req, res) {
    try {
      const links = await Link.find();
      return res.status(200).json(new Response(200, 'sucesso', links));
    } catch (err) {
      return res
        .status(500)
        .json(new Response(500, 'Erro interno', err.message));
    }
  }

  async store(req, res) {
    try {
      const { originalLink, shortenedLink, postId } = req.body;

      const post = await Post.findOne({ _id: postId });
      if (!post) {
        return res
          .status(404)
          .json(new Response(404, 'post não encontrado', null));
      }

      const link = await Link.create({
        originalLink,
        shortenedLink,
        post: postId,
      });

      post.links.push(link);
      await post.save();

      return res.status(201).json(new Response(201, 'link criado', link));
    } catch (err) {
      return res
        .status(500)
        .json(new Response(500, 'Erro interno', err.message));
    }
  }

  async update(req, res) {
    try {
      const { originalLink, shortenedLink } = req.body;
      const { id } = req.params;

      let link = await Link.findOne({ _id: id });
      if (!link) {
        return res
          .status(404)
          .json(new Response(404, 'link não encontrado', null));
      }

      link.originalLink = originalLink;
      link.shortenedLink = shortenedLink;
      await link.save();

      return res.status(200).json(new Response(200, 'link editado', link));
    } catch (err) {
      return res
        .status(500)
        .json(new Response(500, 'Erro interno', err.message));
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const link = await Link.findOne({ _id: id });
      if (!link) {
        return res
          .status(404)
          .json(new Response(404, 'link não encontrado', null));
      }

      link.remove();

      return res.status(200).json(new Response(200, 'link excluído', null));
    } catch (err) {
      return res
        .status(500)
        .json(new Response(500, 'Erro interno', err.message));
    }
  }
}

export default new LinkController();
