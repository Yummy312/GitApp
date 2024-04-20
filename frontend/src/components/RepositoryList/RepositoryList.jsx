import styles from './RepositoryList.module.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Repository} from "./Repository/Repository.jsx";

import {
    clearPublicRepos, clearPrivateRepos,
    fetchPrivateRepositories,
    fetchPublicRepositories,
    selectPrivateRepos,
    selectPublicRepos
} from "../../redux/slices/repo.js";
import PaginationButtonBlock from "../PaginationButtonBlock/PaginationButtonBlock.jsx";
import PaginationButton from "../PaginationButtonBlock/PaginationButton/PaginationButton.jsx";
import {usePagination} from "../../hooks/usePagination.js";

// Ваш компонент RepositoryList с исправлениями
const RepositoryList = () => {
    const user = useSelector(state => state.auth.data)
    const publicRepos = useSelector(selectPublicRepos)
    const privateRepos = useSelector(selectPrivateRepos)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [currentTab, setCurrentTab] = useState('public') // Добавлено состояние для отслеживания текущей вкладки

    // Pagination
    const [getPagesArray, getPageCount, getSlicePerPage] = usePagination();
    const totalPages = currentTab === 'public' ? getPageCount(publicRepos, 4) : getPageCount(privateRepos, 5);
    const pagesArray = getPagesArray(totalPages);
    const currentItems = currentTab === 'public' ? getSlicePerPage(publicRepos, 4, currentPage) : getSlicePerPage(privateRepos, 5, currentPage);

    useEffect(() => {
        if (user) {
            dispatch(fetchPublicRepositories())
            dispatch(clearPrivateRepos())
        }
    }, [])

    useEffect(() => {
        // Reset current page when tab changes
        setCurrentPage(1);
    }, [currentTab]);

    const loadRepositories = (type) => {
        dispatch(fetchPublicRepositories())
        dispatch(clearPrivateRepos())
        if (user) {
            if (type === 'public') {
                dispatch(fetchPublicRepositories())
                dispatch(clearPrivateRepos())
            } else {
                dispatch(fetchPrivateRepositories())
                dispatch(clearPublicRepos())
            }
            setCurrentTab(type); // Обновляем текущую вкладку
        }
    }

    return (
        <div className={styles.RepoList}>
            <div className={styles.tabs}>
                <button onClick={() => loadRepositories('public')} className={styles.tab}>Public</button>
                <button onClick={() => loadRepositories('private')} className={styles.tab}>Private</button>
            </div>
            <div className={styles.repos}>
                {currentItems && currentItems.map((repo) => (
                    <Repository
                        key={repo.id}
                        language={repo.language}
                        full_name={repo.full_name || repo.name} // Используем поле full_name или name в зависимости от типа репозитория
                        html_url={repo.html_url}
                        login={repo.owner.login}
                    />
                ))}
                <PaginationButtonBlock>
                    {pagesArray.map((page) =>
                        <PaginationButton
                            key={page}
                            page={page}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </PaginationButtonBlock>
            </div>
        </div>
    );
};

export default RepositoryList