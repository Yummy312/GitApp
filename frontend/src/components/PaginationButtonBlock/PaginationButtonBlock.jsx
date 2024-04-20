import styles from './PaginationButtonBlock.module.css'
const PaginationButtonBlock = ({children}) => {
    return (
        <div className={styles.paginationBtnBody}>
            {children}
        </div>
    );
};

export default PaginationButtonBlock;