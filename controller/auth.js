const jwt = require('jsonwebtoken')

const secretKey = "545546468354uhsoua@fda";

const users = [
     { id: 1, username: 'user1', password: 'password', role: 'user' },
     { id: 2, username: 'admin', password: 'password', role: 'admin' }
];


const login = (req, res) => {

     const { username, password } = req.body

     const user = users.find(u=> u.username === username && u.password === password);

     if(!user){
          return res.status(401).json({ error : 'invalid credencials' })
     }

     const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, {expiresIn: '1h'});
     console.log(token)
     res.json({ token });

}

module.exports = { login,  secretKey}
