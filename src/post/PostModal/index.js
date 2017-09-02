import React, { Component } from 'react'
import Modal from 'react-modal'

class PostModal extends Component {
  modalSubmit(e) {
    const { onSubmit } = this.props
    e.preventDefault()
    onSubmit(
      this.title.value,
      this.desc.value, 
      this.name.value,
      this.category.value
    )
  }

  render() {
    const { 
      isOpen, 
      onRequestClose, 
      title, 
      defaultTitle,
      defaultBody, 
      defaultAuthor,
      defaultCategory,
      titlePlaceholder,
      bodyPlaceholder,
      authorPlaceholder,
      categoryPlaceholder
    } = this.props

    return (
      <Modal
        className="modal-card vcentered"
        overlayClassName="modal-background"
        isOpen={isOpen}
        contentLabel="EditPostModal"
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
            <input 
              className="input"
              type="text" 
              ref={category=>this.category=category} 
              defaultValue={defaultCategory}
              placeholder={categoryPlaceholder}
              required 
            />
            <input 
              className="input"
              type="text" 
              ref={title=>this.title=title} 
              defaultValue={defaultTitle}
              placeholder={titlePlaceholder}
              required 
            />
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

export default PostModal
