import jsonResponse from '../helper/responseHandler';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';


const verify = async (req, res, next) => {
  
  try {
    const header = req.headers['authorization'];

    const bearer = header.split(' ');
    const token = bearer[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    
      const user = await User.findById(decoded.userId);
      
      req.user = user;
      
      next();
  } catch (error) {
    jsonResponse.error(res, 'error', 401 , 'unauthorized')
  }
}

export default verify;
