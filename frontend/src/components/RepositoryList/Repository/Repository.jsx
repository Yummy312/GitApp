import {Navigate} from "react-router-dom";
import styles from './Repository.module.css'
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../../redux/slices/auth.js";
export const Repository = ({full_name, html_url, description, language, name, login})=>{
    const user = useSelector(selectIsAuth)


    if( !user){
        // console.log('you are not')
        return <Navigate to="/"/>
    }
    return(
        <div className={styles.repo}>
            {
                user ?
                    <div className={styles.repoBody}>
                        <a className={styles.repoName} href={html_url || "#"}>
                            <img src='./book.svg' alt='book'/>
                            {full_name || name}

                        </a>

                        <div className={styles.technologies}>
                            <div className={styles.technology}>
                                <div className={styles.circle}></div>
                                {language || 'Unknown' }
                            </div>

                            <a className={styles.author} href='#'>
                                {login}
                            </a>
                        </div>


                    </div>
                    :
                    <div className={styles.repoBody}>
                        <a className={styles.repoName}>
                            <img src='./book.svg' alt='book'/>
                        </a>

                        <div className={styles.technologies}>
                            <div className={styles.technology}>
                                <div className={styles.circle}></div>
                                Vue
                            </div>

                            <a className={styles.author} href='#'>
                                Vasya
                            </a>
                        </div>


                    </div>
            }

        </div>
    )
}