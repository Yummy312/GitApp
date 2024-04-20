import styles from './Footer.module.css'
const Footer = () => {
    return (
        <div className='footer container'>
            <div className={styles.footerInner}>
                <nav className={styles.menu}>
                    <ul className={styles.menuList}>

                        <li className={styles.menuItem}>
                            <a className={styles.menuLink} href='https://docs.github.com/ru'>Docs</a>
                        </li>
                        <li className={styles.menuItem}>
                            <a className={styles.menuLink}
                               href='https://docs.github.com/ru/site-policy/privacy-policies/github-general-privacy-statement'>
                                Privacy
                            </a>
                        </li>
                        <li className={styles.menuItem}>
                            <a className={styles.menuLink} href='https://github.com/security'>Security</a>
                        </li>
                        <li className={styles.menuItem}>
                            <a className={styles.menuLink}
                               href='https://docs.github.com/ru/support/contacting-github-support'>
                                Contact Github
                            </a>
                        </li>
                        <li className={styles.menuItem}>
                            <a className={styles.menuLink}
                               href='https://docs.github.com/en/rest?apiVersion=2022-11-28'>API</a>
                        </li>
                        <li className={styles.menuItem}>
                            <a className={styles.menuLink} href='https://github.com/pricing'>Pricing</a>
                        </li>
                        <li className={styles.menuItem}>
                            <a className={styles.menuLink} href='https://github.com/about'>About</a>
                        </li>
                        <li className={styles.menuItem}>
                            <a className={styles.menuLink} href='https://github.blog/'>Blog</a>
                        </li>


                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default Footer;