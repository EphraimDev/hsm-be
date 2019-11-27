import { Session } from '../models/Session';
import { User } from '../models/User';
import moment from 'moment';
import jsonResponse from '../helper/responseHandler';

const RequestSession =  async (req, res) => {
    const { id } = req.user;
    let {doctor, day, time} = req.query;

    day = moment(day, "DD-MM-YYYY").format("L");
    time = moment(time, "HH:mm").format("LT");

    try {
        await User.findById(doctor);
        
        const session = new Session({
            user: id,
            doctor,
            day,
            time
          });

          await session.save();
        return jsonResponse.success(res, 'success', 200, session);
    } catch (error) {
        return jsonResponse.error(res, 'error', 400, 'Session request was not successful');
    } 
    
};

export default RequestSession;
