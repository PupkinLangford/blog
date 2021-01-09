import {Document, model, Schema} from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});

export default model<IUser>('User', UserSchema);
