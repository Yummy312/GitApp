import styles from './User.module.css'
import {useDispatch} from "react-redux";
import {clearUserRepos, fetchUserRepositories} from "../../../redux/slices/repo.js";
import {clearSearchData} from "../../../redux/slices/search.js";
export const User = ({login, avatar_url})=>{
    const dispatch = useDispatch()

    const handlerClick = ()=>{
        // console.log(`ты нажал на пользователя ${login}`)
        dispatch(clearUserRepos())
        dispatch(clearSearchData())
        dispatch(fetchUserRepositories(login))
    }
    return(
        <div  onClick={handlerClick} className={styles.userWrapper}>
            <div className={styles.userBody}>
                <div className={styles.userContent}>
                    <img className={styles.userImg} src={avatar_url || './python.png'} alt='#'/>
                    <h3 className={styles.userName}> {login || 'userName'}</h3>
                </div>
            </div>
        </div>
    )
}