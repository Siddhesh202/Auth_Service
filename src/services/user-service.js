const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService{
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;

        } catch (error) {
            console.log("Something went wrong on the service layer");
            throw {error};
        }
    }

    async destroy(userId){
        try {
            const response = await this.userRepository.destroy(userId);
            return response;

        } catch (error) {
            console.log("Something went wrong on the service layer");
            throw {error};
        }
    }

    async signIn(email, plainPassword){
        try {
            // step 1 -> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);

            // step 2 -> compare the incoming plain password with the stored encrypted software
            const passwordMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error: 'Incorrect Password'};
            }

            // step 3 -> if password match create a new token
            const newJWT = this.createToken({email: user.email, id: user.id});

            return newJWT;

        } catch (error) {
            console.log("Something went wrong on the service layer");
            throw {error};
        }
    }

    async isAuthenticated(token){
        try {
            const isTokenVerified = this.verifyToken(token);
            if(!isTokenVerified){
                throw {error: 'Invalid Token'};
            }

            const user = await this.userRepository.getById(isTokenVerified.id);
            if(!user){
                throw {error: 'No user with the corressponding token exists'};
            }
            return user.id;

        } catch (error) {
            console.log("Something went wrong in the auth process on the service layer");
            throw {error};
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {
                expiresIn: '1d'
            });
            return result;

        } catch (error) {
            console.log("Something went wrong in token creation");
            throw {error};
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;

        } catch (error) {
            console.log("Something went wrong in token verification", error);
            throw {error};
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw {error};
        }
    }
}

module.exports = UserService;