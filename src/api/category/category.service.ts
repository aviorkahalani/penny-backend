import { Category } from '../../db/models/category'

const fetchCategories = async () => {
  return await Category.find({})
}

export default {
  fetchCategories,
}
