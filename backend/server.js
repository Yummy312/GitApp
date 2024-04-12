import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import axios from 'axios'

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json());


const CLIENT_ID = "Iv1.080a19091369fa5d"
const CLIENT_SECRET = "06bf539b67d64d75bd86b26c5b8d08395dbc8837"
const PORT = process.env.PORT || 5000;


app.get('/getAccessToken', async (req, res)=>{
    try{
        const code = req.query.code;


    const params = "?client_id="+ CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code="+code

    const { data } = await axios.post(
        'https://github.com/login/oauth/access_token' + params,
        null, // Тело запроса POST не требуется, поскольку параметры передаются в URL
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json' 
          }
        }
      );
      
    console.log(data)
    res.json(data)
    } catch(err){
        console.warn(err)
        res.status(500).json({
            message: 'Что-то пошло не так'
        })
    }
    
    
})
app.get('/getUserData', async (req, res) => {
    try {
        // Получаем заголовок Authorization из запроса
        const authorizationHeader = req.get("Authorization");
        
        // Выполняем запрос к GitHub API для получения данных пользователя
        const { data } = await axios.get("https://api.github.com/user", {
            headers: {
                'Authorization': authorizationHeader,
                'Content-Type': 'application/json'
            }
        });

        // Отправляем данные пользователя в ответ на запрос
        console.log(data)
        res.json(data);
    } catch (err) {
        // Обрабатываем ошибку
        console.warn('Ошибка при получении данных пользователя:', err.message);
        res.status(500).json({ error: 'Произошла ошибка при получении данных пользователя' });
    }
});
app.patch('/updateUserData', async (req, res) => {
    const accessToken = req.get('Authorization'); // Получаем маркер доступа из заголовка

    try {
        // Выполняем запрос к серверу GitHub с маркером доступа
        const { data } = await axios.patch("https://api.github.com/user", req.body, {
            headers: {
                'Authorization': accessToken, // Передаем маркер доступа в заголовке
                'Content-Type': 'application/json'
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
