import styles from './Search.module.css'
import {useState} from "react";
import {fetchUsers} from "../../../redux/slices/search.js";
import {clearSearchData} from "../../../redux/slices/search.js";
import {useDispatch} from "react-redux";
import {clearUserRepos} from "../../../redux/slices/repo.js";

export const Search = () =>{
    const [searchQuery, setSearchQuery] = useState('')
    const dispatch = useDispatch()

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' || e.key ==='Enter') {
            getUser();
        }
    };
    const getUser =  ()=>{
        dispatch(clearUserRepos())
        dispatch(clearSearchData())
        dispatch(fetchUsers(searchQuery))
        setSearchQuery('')
    }

    return(
        <div className={styles.searchBlock}>
            <input
                onChange={e =>setSearchQuery(e.target.value)}
                value={searchQuery}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="search users..."
                className={styles.inputSearch}
            />
            <button onClick={getUser} className={styles.searchBtn}> Поиск </button>
        </div>
    )
}