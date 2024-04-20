import styles from "./Sidebar.module.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth.js";


export const Sidebar = ()=>{
    const isAuth = useSelector(selectIsAuth)


    const  loadRepositories = ( )=>{

    }

    return(
        <div className='sidebar container'>
            {
                isAuth ?
                    <nav>
                        <ul className={styles.navList}>
                            <li className={styles.navItem}>
                                <img src='/repository.svg' alt='' className={styles.navImg}/>
                                <Link onClick={loadRepositories} to='/repositories' className={styles.navLink}>Repositories</Link>
                            </li>
                            <li className={styles.navItem}>
                                <img src='/users.svg' alt='' className={styles.navImg}/>
                                <Link to='/users' className={styles.navLink}>Other Users</Link>
                            </li>
                            <li className={styles.navItem}>
                                <img src='/pencil.svg' alt='' className={styles.navImg}/>
                                <Link to='/profile' className={styles.navLink}>Profile</Link>
                            </li>
                        </ul>
                    </nav>
                    :
                    <nav>
                        <ul className={styles.navList}>
                            <li className={styles.navItem}>
                                <img src='/repository.svg' alt='' className={styles.navImg}/>
                                <Link to='/repositories' className={styles.navLink}>Repositories</Link>
                            </li>
                            <li className={styles.navItem}>
                                <img src='/users.svg' alt='' className={styles.navImg}/>
                                <Link to='/users' className={styles.navLink}>Other Users</Link>
                            </li>
                        </ul>
                    </nav>
            }

        </div>
    )
}