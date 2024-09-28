import * as jwt from 'jsonwebtoken';
import { constants } from '../../common/constants';

class JwtUtils {
    public jwtSign(data: any, callback: Function) {

        jwt.sign({ userId: 1 }, constants.jwtKey.secretKey, { algorithm: 'HS512' }, function (err, token) {
            callback(err, token)
        });

    }

    public jwtVerify(token: string, callback: Function): any {
        jwt.verify(token, constants.jwtKey.secretKey, function (err, decoded: any) {
            callback(err, decoded)
        });
    }

}


const jwtUtils = new JwtUtils();
export default jwtUtils;