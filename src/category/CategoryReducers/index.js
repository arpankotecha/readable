import { ADD_CATEGORY, ADD_CATEGORIES } from '../CategoryActions'

function categories(state=[], action){
  switch(action.type) {
    case ADD_CATEGORIES:
      return [...state, ...action.categories]
    case ADD_CATEGORY:
      return [...state, action.category]
    default:
      return state
  }
}

export default categories
