import * as actions from './index'

it('creates a new addComment action', () => {
  const addComment = actions.addComment({"id": 1})
  expect(addComment).toMatchSnapshot()
})

it('creates a new deleteComment action', () => {
  const deleteComment = actions.deleteComment({"id": 1})
  expect(deleteComment).toMatchSnapshot()
})

it('creates a new addCategory action', () => {
  const addCategory = actions.addCategory("newCategory")
  expect(addCategory).toMatchSnapshot()
})

it('creates a new addPost action', () => {
  const addPost = actions.addPost({"id": 1})
  expect(addPost).toMatchSnapshot()
})

it('creates a new updateVoteCount action', () => {
  const updateVoteCount = actions.updateVoteCount(1, 2)
  expect(updateVoteCount).toMatchSnapshot()
})

it('creates a new updateCommentVoteCount action', () => {
  const updateCommentVoteCount = actions.updateCommentVoteCount({"id":1}, 2)
  expect(updateCommentVoteCount).toMatchSnapshot()
})

it('creates a new incrementCommentCount action', () => {
  const incrementCommentCount = actions.incrementCommentCount(1)
  expect(incrementCommentCount).toMatchSnapshot()
})

