const { Router } = require("express")
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello world'));

router.post('/signup', async (req,res) => {
    const { email, password } = req.body;
    const newUser = new User({email: email, password: password});
    await newUser.save();

    const token = jwt.sign({_id: newUser._id}, 'secretkey')
    res.status(200).json({token})


    res.send('Testing signup');
});

router.post('/signin', async (req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(401).send("El correo no existe");
    if(user.password !== password) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token});
});

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2021-05-25T19:03:55.176Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2021-05-25T19:03:55.176Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2021-05-25T19:03:55.176Z"
        }
    ])
})

module.exports = router;