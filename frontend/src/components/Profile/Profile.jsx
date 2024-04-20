import styles from './Profile.module.css'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useEffect} from "react";
export const Profile = ()=>{
    const user = useSelector(state => state.auth.data)

    useEffect(() => {

    }, [user]);
    return(
        <div className='profile container'>
            {
                user ?
                    <>
                        <div className={styles.profileWrapper}>
                            <div className={styles.imgBlock}>
                                <img className={styles.profileImg} src={user.avatar_url || './python.png'}/>
                            </div>
                            <div className={styles.profileTextContent}>
                                <h2 className={styles.profileName}> name: {user.name || 'No name available'}</h2>
                                <span
                                    className={styles.profileLogin}> username: {user.login || 'No login available'}</span>
                                <span className={styles.profileBio}>
                                    bio: {user.bio || 'No bio available'}
                                </span>

                                <span className={styles.profileEmail}>email: {user.email || 'No email available'}</span>

                                <span className={styles.profileCompany}>company: {user.company || 'No company available'}</span>

                                <span className={styles.profileLocation}> location: {user.location || 'No location available'}</span>
                                <a className={styles.profileLink} href={user.html_url}>
                                    link to profile:
                                    <span
                                        className={styles.profileLinkText}> {' more details' || 'No name available'}</span>
                                </a>

                                <button className={styles.profileEditBtn}>
                                    <Link to='/profile' className={styles.btnLink}>Edit Profile</Link>
                                </button>

                            </div>

                        </div>


                    </>
                    :
                    <>
                    <div className={styles.profileWrapper}>
                            <div className={styles.imgBlock}>
                                <img className={styles.profileImg} src='./python.png'/>
                            </div>
                            <div className={styles.profileTextContent}>
                                <h2 className={styles.profileName}>Vasya Pupkin</h2>
                                <span className={styles.profileLogin}>Vasya21</span>
                                <span className={styles.profileBio}>
                                    I’m a student and Frontend developer.
😎                                 Let’s Rock!
                                </span>

                                <span className={styles.profileEmail}>Vasya@gmail.com</span>
                                <span className={styles.profileLocation}>Russia, Moscow</span>
                                <a className={styles.profileLink}>luisariza.com</a>


                            </div>

                        </div>


                    </>

            }


        </div>
    )
}