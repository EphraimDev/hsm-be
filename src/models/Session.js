import mongoose from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';
const { Schema } = mongoose;

const SessionSchema = new Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
  doctor: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  day: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  }
},
{
    timestamps:true
});


SessionSchema.plugin(UniqueValidator);

const Session = mongoose.model('Session', SessionSchema);

exports.Session = Session;
