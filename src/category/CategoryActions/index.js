export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category
  }
}

export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories
  }
}

