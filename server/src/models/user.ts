import {model, Schema} from 'mongoose';

const UserSchema: Schema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});

export default model('User', UserSchema);
