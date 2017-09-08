import * as actions from './index'

it('creates a new addCategory action', () => {
  const addCategory = actions.addCategory("newCategory")
  expect(addCategory).toMatchSnapshot()
})

