import React, { useState } from 'react';
import styles from './PaginationButton.module.css';

const PaginationButton = ({ page, currentPage, setCurrentPage }) => {

    const handleClick = () => {
        setCurrentPage(page)
    };

    const buttonClass = page ===currentPage ? `${styles.button} ${styles.button__current}` : styles.button;

    return (
        <button
            onClick={handleClick}
            className={buttonClass}
        >
            {page}
        </button>
    );
};

export default PaginationButton;
