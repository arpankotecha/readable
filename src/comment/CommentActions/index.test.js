import * as actions from './index'

it('creates a new addComment action', () => {
  const addComment = actions.addComment({"id": 1})
  expect(addComment).toMatchSnapshot()
})

it('creates a new deleteComment action', () => {
  const deleteComment = actions.deleteComment({"id": 1})
  expect(deleteComment).toMatchSnapshot()
})

it('creates a new updateCommentVoteCount action', () => {
  const updateCommentVoteCount = actions.updateCommentVoteCount({"id":1}, 2)
  expect(updateCommentVoteCount).toMatchSnapshot()
})

it('creates a new incrementCommentCount action', () => {
  const incrementCommentCount = actions.incrementCommentCount(1)
  expect(incrementCommentCount).toMatchSnapshot()
})

