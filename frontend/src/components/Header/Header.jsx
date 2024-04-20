import styles from './Header.module.css'
import Login from "../Login/Login.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, logout} from "../../redux/slices/auth.js";
import {useEffect, useState} from "react";
import {Config} from "../../../config.js";
import axios from "../../../axios.js";

export const Header = () => {
    const dispatch = useDispatch()
    const [codeParam, setCodeParam] = useState('');
    const user = useSelector(state => state.auth.data)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setCodeParam(urlParams.get('code'));
    }, []);


    useEffect(()=>{
        if(localStorage.getItem('accessToken')){
            dispatch(fetchAuthMe())
        }
    },[])

    // Проверяем наличие accessToken при монтировании компонента
    useEffect(() => {
        const getAccessToken = async () => {
            try {
                const { data } = await axios.get('/getAccessToken?code=' + codeParam);
                if (data) {
                    localStorage.setItem('accessToken', data);
                    dispatch(fetchAuthMe())

                }
            } catch (err) {
                console.error('Ошибка при получении токена доступа:', err.message);
            }
        };

        if (localStorage.getItem('accessToken') === null) {
            getAccessToken();
        }
    }, [codeParam]);

    const loginByGithub = async () => {
        // Проверяем, что пользователь не аутентифицирован и localStorage не содержит accessToken
        if ( localStorage.getItem('accessToken') === null) {
            console.log('working Login func')
            try {
                window.location.assign(Config.GITHUB_AUTH_URL);
            } catch (err) {
                console.error('Ошибка при получении конфигурации для входа через GitHub:', err.message);
            }
        }
    };

    const removeAccessToken = ()=>{
        localStorage.removeItem('accessToken')
        dispatch(logout())
    }

    return (
        <header className='header container'>
            <div className={styles.headerInner}>
                {
                    user?
                        <>
                            <div className={styles.ui}>
                                <div className={styles.logoWrapper}>
                                    <div className={styles.logoImg}>
                                        <img src='./github-logo.svg' alt=''/>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.profileImg}>
                                <button
                                    className={styles.logoutBtn}
                                    onClick={removeAccessToken}
                                >
                                    Logout
                                </button>

                                <img className={styles.profileIcon} src={user.avatar_url || './python.png'}/>
                            </div>
                        </>
                        :
                        <Login
                            loginByGithub={loginByGithub}
                        />
                }

            </div>
        </header>
    )
}