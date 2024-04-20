import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import axios from 'axios'

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json());



const CLIENT_ID = "7d00f68d0840725a726f"
const CLIENT_SECRET = "b95c4220eaa773403d6f44ee23ba49313e046f7f"
const PORT = process.env.PORT || 5000;


// Нужно
app.get('/getAccessToken', async(req, res)=>{
    const code = req.query.code; // Получаем временный код из запроса
    const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`
    try{
        const { data } = await axios.post(`https://github.com/login/oauth/access_token${params}`, null, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        res.json(data.access_token)
    }catch (err) {
        // console.warn('Ошибка при получении токена:', err.message);
        res.status(500).json({ error: 'Произошла ошибка попробуйте еще раз' });
    }
})

// Нужно
app.get('/getUserData', async(req, res)=>{
    try{
        const accessToken = req.get("Authorization")
        // Выполняем запрос к GitHub API для получения данных пользователя
        const { data } = await axios.get("https://api.github.com/user", {
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json',
            }
        });
        res.json(data)

    }catch (err){
        console.warn('Ошибка при получении данных пользователя:', err.message);
        res.status(500).json({ error: 'Произошла ошибка при получении  пользователя' });
    }
})


// Нужно
app.post('/updateUserData', async (req, res) => {
    const accessToken = req.get('Authorization'); // Получаем маркер доступа из заголовка

    try {
        // Выполняем запрос к серверу GitHub с маркером доступа
        const { data } = await axios.patch("https://api.github.com/user", req.body, {
            headers: {
                'Authorization': accessToken, // Передаем маркер доступа в заголовке
                'Content-Type': 'application/json',
                "User-Agent": "GitMyAppNuri"

            },
        });

        res.json(data); // Отправляем ответ с данными
    } catch (error) {
        console.error(error);
        res.status(error.response.status).json(error.response.data);
    }
});

app.listen(PORT, (err)=>{
    if(err){
        return console.log(err)
    }

    console.log('Server OK')
});

