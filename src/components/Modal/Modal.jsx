import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ descr, link, onClose }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={link} alt={descr} />
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  descr: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
