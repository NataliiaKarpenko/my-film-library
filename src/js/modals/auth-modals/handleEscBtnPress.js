export function handleEscBtnPress(e, modal) {
  if (e.key === 'Escape') {
    modal.close();
    document.removeEventListener('keydown', handleEscBtnPress);
  }
}
