import {Search} from "./Search/Search.jsx";
import {User} from "./User/User.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth.js";
import {Navigate} from "react-router-dom";
import { selectSearchData} from "../../redux/slices/search.js";
import styles from './userPage.module.css'
import {selectUserRepos} from "../../redux/slices/repo.js";
import {Repository} from "../RepositoryList/Repository/Repository.jsx";
import { useState} from "react";
import {usePagination} from "../../hooks/usePagination.js";
import PaginationButtonBlock from "../PaginationButtonBlock/PaginationButtonBlock.jsx";
import PaginationButton from "../PaginationButtonBlock/PaginationButton/PaginationButton.jsx";

const UserPage = () =>{
    const isAuth = useSelector(selectIsAuth)
    const searchResult = useSelector(selectSearchData)
    const userRepos = useSelector(selectUserRepos)
    const dispatch = useDispatch()

    //Pagination
    const [getPagesArray, getPageCount, getSlicePerPage] = usePagination();
    const totalPages = searchResult? getPageCount(searchResult, 5): getPageCount(userRepos, 5)
    const pagesArray = getPagesArray(totalPages);
    const [currentPage, setCurrentPage] = useState(1)
    const currentItems = searchResult? getSlicePerPage(searchResult, 5, currentPage) : getSlicePerPage(userRepos, 5, currentPage);


    // useEffect(() => {
    //     dispatch(clearSearchData())
    //     dispatch(clearUserRepos())
    // }, []);

    if( !isAuth){
        return <Navigate to="/"/>
    }
    return (
        <div>
            <Search/>
            {
                searchResult?
                    <>
                        <div className={styles.foundUsers}>
                            {searchResult.length > 0 ? (
                                <>
                                    {searchResult.length > 1 ? (
                                        <>
                                            Найдено {searchResult.length} пользователей
                                        </>
                                    ) : (
                                        <>
                                            Найден {searchResult.length} пользователь
                                        </>
                                    )}

                                </>
                            ) : (
                                <>
                                    Пользователи не найдены
                                </>
                            )}

                        </div>

                        {currentItems?.map((user) => (
                            <User
                                key={user.id}
                                login={user.login}
                                avatar_url={user.avatar_url}
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
                    </>
                    :
                    <>
                        <div className={styles.userRepos}>
                            {currentItems?.map((repo) => (
                                <Repository
                                    key={repo.id}
                                    language={repo.language}
                                    full_name={repo.full_name}
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

                    </>
            }
        </div>
    );
};

export default UserPage;