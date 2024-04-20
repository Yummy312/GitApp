import {useForm} from "react-hook-form";
import axios from "../../../axios.js";
import styles from './Form.module.css'
import {updateUserData} from "../../redux/slices/auth.js";
import {useDispatch} from "react-redux";

export const Form = ()=>{
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {

        },
        mode: 'onChange'
    })




    const onSubmit = async (userData) => {
        try {
            const { data } = await axios.post('http://localhost:5000/updateUserData', userData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            });
            dispatch(updateUserData(data))
        } catch (err) {
            console.log(err);
            alert("Произошла ошибка при обновлении данных");
        }
    };
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formWrapper}>
                    <input {...register("bio")} placeholder='description' className={styles.inputForm}/>

                    <input {...register("company")} placeholder='company' className={styles.inputForm}/>

                    <input {...register("location")} placeholder='location' className={styles.inputForm}/>
                    <button type='submit' className={styles.btnForm}>
                        <span className={styles.btnFormText}> submit</span>
                    </button>
                </div>
            </form>
        </>
    )
}

