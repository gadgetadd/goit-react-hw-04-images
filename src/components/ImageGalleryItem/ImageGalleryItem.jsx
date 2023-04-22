import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ link, descr, full }) => {
  const [modal, setModal] = useState(null);

  return (
    <li className={css.ImageGalleryItem} onClick={() => setModal(full)}>
      <img className={css['ImageGalleryItem-image']} src={link} alt={descr} />
      {modal && (
        <Modal link={full} descr={descr} onClose={() => setModal(null)} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  descr: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  full: PropTypes.string.isRequired,
};
