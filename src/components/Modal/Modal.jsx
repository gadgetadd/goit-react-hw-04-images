import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    descr: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
      console.log('handleKeydown', this.props.onClose);
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      console.log('handleBackdropClick', this.props.onClose);
      this.props.onClose();
    }
  };

  render() {
    const { link, descr } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={link} alt={descr} />
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
}
