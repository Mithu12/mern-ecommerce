import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@g.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true
    },
    {
        name: 'User1',
        email: 'user1@g.com',
        password: bcrypt.hashSync('123456'),
    },
    {
        name: 'User2',
        email: 'user2@g.com',
        password: bcrypt.hashSync('123456'),
    },
]

export default users