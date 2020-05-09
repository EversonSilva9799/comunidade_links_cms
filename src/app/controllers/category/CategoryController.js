import Category from './../../models/category/Category';
import Response from './../../models/Response';
import generateSlug from './../../utils/generateSlug';

class CategoryController {
  async index(req, res) {
    try {
      const categories = await Category.find();
      return res.status(200).json(new Response(200, 'sucesso', categories));
    } catch (err) {
      return res.status(500).json(new Response(500, 'Erro interno', null));
    }
  }

  async store(req, res) {
    try {
      const { name, description } = req.body;
      const slug = generateSlug(name);

      const categoryExists = await Category.findOne({ slug });
      if (categoryExists) {
        return res
          .status(400)
          .json(new Response(400, 'categoria já existe', null));
      }

      const category = await Category.create({ name, description, slug });
      return res
        .status(201)
        .json(new Response(201, 'categoria criada', category));
    } catch (err) {
      return res
        .status(500)
        .json(new Response(500, 'Erro interno', err.message));
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const category = await Category.findOne({ _id: id });
      if (!category) {
        return res
          .status(404)
          .json(new Response(404, 'categoria não encontrada', null));
      }

      category.name = name;
      category.description = description;
      await category.save();

      return res
        .status(200)
        .json(new Response(200, 'categoria editada', category));
    } catch (err) {
      return res
        .status(500)
        .json(new Response(500, 'Erro interno', err.message));
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id });
      if (!category) {
        return res
          .status(404)
          .json(new Response(404, 'categoria não encontrada', null));
      }

      category.remove();

      return res
        .status(200)
        .json(new Response(200, 'categoria excluída', null));
    } catch (err) {
      return res
        .status(500)
        .json(new Response(500, 'Erro interno', err.message));
    }
  }
}

export default new CategoryController();
