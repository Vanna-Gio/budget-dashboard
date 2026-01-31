import PropTypes from "prop-types";
import './Modal.css';

const { useEffect } = require("react");

function Modal ({ isOpen, onClose, children }) {
    //Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';

        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow= 'unset';
        };

    },[isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    ×
                </button>
                {children}
            </div>
        </div>
    )
}

Modal.propTypes ={
    isOpen: PropTypes.bool.isRequired,
    onclose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;