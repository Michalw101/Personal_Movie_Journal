// const model = require('../model/signupModel');
// const crypto = require('crypto');


// async function postSignup(body) {
//     try {
//         console.log("controller body", body);

//         const { password } = body;
//         const salt = crypto.randomBytes(16).toString('hex');

//         const saltedPassword = password + salt;
//         const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');
//         console.log(hashedPassword);

//         return await model.postSignup({ ...body, password: hashedPassword, salt: salt });

//     }
//     catch (err) {
//         throw err;
//     }
// };


// async function putSignup(body) {
//     try {
//         return model.putSignup(body);
//     }
//     catch (err) {
//         throw err;
//     }
// };

// module.exports = { postSignup, putSignup }


const User = require('../models/user');
const Password = require('../models/password');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

async function postSignup(body) {
    const { username, email, password, external_id } = body;
    try {
        // בדיקה אם המשתמש קיים לפי מייל או שם משתמש
        const existing = await User.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            throw new Error('User already exists');
        }

        // יצירת המשתמש
        const newUser = new User({
            username,
            email,
            external_id,
            role: 'user'
        });
        const savedUser = await newUser.save();

        // שמירת הסיסמה המוצפנת

        const salt = crypto.randomBytes(16).toString('hex');

        const saltedPassword = password + salt;
        const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');
        console.log(hashedPassword);
        const newPassword = new Password({
            user_id: savedUser._id,
            password_hash: password,
            salt
        });
        await newPassword.save();

        //create session
        const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
        console.log('JWT_SECRET:', JWT_SECRET);


        const accessToken = jwt.sign({ user_email: user_email, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

        console.log('Generated Access Token:', accessToken);



        return {
            success: true,
            message: 'User created successfully',
            user: {
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        };

    } catch (err) {
        console.error('Signup model error:', err);
        throw err;
    }
}

module.exports = { postSignup };
