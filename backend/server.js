import express from 'express'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors())

app.get('/test', async (req, res)=>{

    res.json({
        message: "success"
    })

})


app.use(express.json());
app.listen(PORT, (err)=>{
    if(err){
        return console.log(err)
    }

    console.log('Server OK')
});
