import style from './Login.module.css';
const Login = ({loginByGithub}) => {
    const handleClick = ()=>{
        console.log('this handleclick')
        loginByGithub()
    }
    return (
        <div className={style.authWrapper}>
            <button type="primary" onClick={handleClick} className={style.logoBtn}>
                <img src="./github-logo.svg" className={style.logoBtnImg}/>
                Login with GitHub
            </button>
        </div>

    );
};

export default Login;
