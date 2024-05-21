import AxiosClient from './AxiosClient'

const Category = {
  getCategories: async () => AxiosClient.get('categories'),
}

export default Category
