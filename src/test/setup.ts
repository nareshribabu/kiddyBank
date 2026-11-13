import '@testing-library/jest-dom/vitest'

/** jsdom does not implement the modal dialog methods, so stub their open state and close event. */
HTMLDialogElement.prototype.showModal = function showModal() {
  this.setAttribute('open', '')
}
HTMLDialogElement.prototype.close = function close() {
  this.removeAttribute('open')
  this.dispatchEvent(new Event('close'))
}
