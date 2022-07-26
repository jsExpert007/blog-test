import { sign, verify, SignOptions, VerifyOptions, TokenPayload } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';


export const createJsonToken = async (userFound: any, ) => {
    const privateKey = fs.readFileSync(path.join(__dirname, './../../private.pem'));

    const signInOptions: SignOptions = {
        algorithm: 'RS256',
        //expiresIn: '24h'
    };

    return sign(JSON.stringify(userFound), privateKey, signInOptions);

};

export const getToken = async (str: string) => {
    let strArr = str.split(' ');
    if(strArr[0] === 'Bearer'){
        if(strArr[1]){
            return strArr[1];
        }
    }
    return '';
        
};


export const verifyJsonToken = async (token: string) => {
    return new Promise((resolve, reject) => {

        const privateKey = fs.readFileSync(path.join(__dirname, './../../private.pem'));

        //const publicKey = fs.readFileSync(path.join(__dirname, './../../public.pen'));

        const verifyOptions: VerifyOptions = {
            algorithms: ['RS256'],
        };

        verify(token, privateKey, verifyOptions, (error, decoded: TokenPayload) => {
            if (error){
                return reject(error);
            }else{
                resolve(decoded);
            }
        })
    });

};