import * as actions from './index'

it('creates a new addPost action', () => {
  const addPost = actions.addPost({"id": 1})
  expect(addPost).toMatchSnapshot()
})

it('creates a new updateVoteCount action', () => {
  const updateVoteCount = actions.updateVoteCount(1, 2)
  expect(updateVoteCount).toMatchSnapshot()
})

