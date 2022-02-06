const express= require('express');
const { all } = require('express/lib/application');
const mongoose= require ('mongoose');

const app=express();

app.use(express.json());

const port=3000;

const url='/api'

mongoose.connect('mongodb+srv://admin:admin@cluster0.2f6tj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

var Schema = mongoose.Schema;

var messageSchema = new Schema ({
    content: String,
    name: String
});

var Message = mongoose.model('Message', messageSchema);

app.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','http://localhost:4200');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.sendStatus(200);

    next();
});

app.get('/get', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    var data= Message.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
});

app.post('/post', (req, res) => {
    var item= {
        name: req.body.name,
        content: req.body.content
    };
    
    var data= new Message(item);
    
    data.save();
    
    res.set('Access-Control-Allow-Origin', '*');

    res.sendStatus(201);

})

app.get('/', (req, res) => {
    res.send('API!!');
})

app.listen(port, () => {
    console.log('listening on port 3000');
})