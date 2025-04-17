import React, { useRef, useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children, size = "medium" }) => {
  const modalRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle body class for preventing scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      // Important: Make sure we remove the class when modal is closed
      document.body.classList.remove("modal-open");
    }

    // Cleanup function - critical to ensure the class is removed
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]); // Only depend on isOpen, not on animation states

  // Handle animation and visibility
  useEffect(() => {
    if (isOpen) {
      // First make it visible
      setIsVisible(true);

      // Then trigger animation in the next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      // Start closing animation
      setIsAnimating(false);

      // Wait for animation to finish before removing from DOM
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Ensure body class is removed when modal is fully hidden
        document.body.classList.remove("modal-open");
      }, 300); // Match this to your CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Set focus to modal for accessibility
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle background click
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render anything if not visible
  if (!isVisible) return null;

  return (
    <div
      className={`modal-overlay ${isAnimating ? "open" : ""}`}
      onClick={handleBackgroundClick}
      tabIndex={-1}
      ref={modalRef}
      aria-modal="true"
      aria-labelledby="modal-title"
      role="dialog"
    >
      <div className={`modal-content modal-${size}`}>
        <div className="modal-header">
          <h3 id="modal-title" className="modal-title">
            {title}
          </h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
