import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'

class CommentModal extends Component {
  modalSubmit(e) {
    const { onSubmit } = this.props
    e.preventDefault()
    onSubmit(this.desc.value, this.name.value)
  }

  render() {
    const { 
      isOpen, 
      onRequestClose, 
      title, 
      defaultBody, 
      defaultAuthor,
      bodyPlaceholder,
      authorPlaceholder
    } = this.props

    return (
      <Modal
        className="modal-card vcentered"
        overlayClassName="modal-background"
        isOpen={isOpen}
        contentLabel="EditCommentModal"
        onRequestClose={onRequestClose}
      >
        <header className="modal-card-head">
          <p className="modal-card-title">
            {title}
          </p>
          <button 
            className="delete" 
            aria-label="close"
            onClick={onRequestClose} />
        </header>
        <form onSubmit={(e) => this.modalSubmit(e)}>
          <section className="modar-card-body">
            <textarea 
              className="textarea"
              ref={desc => this.desc=desc} 
              defaultValue={defaultBody}
              placeholder={bodyPlaceholder}
              required 
            />
            <input 
              className="input"
              type="text" 
              ref={name=>this.name=name} 
              defaultValue={defaultAuthor}
              placeholder={authorPlaceholder}
              required 
            />
          </section>
          <footer className="modal-card-foot">
            <button 
              className="button"
              id="submit" 
              type="submit">
              Save
            </button>
          </footer>
        </form>
      </Modal>
    )
  }
}

export default CommentModal
