import {DateTime} from 'luxon';
import {Document, model, Schema, Types} from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  published: boolean;
  timestamp: Date;
}

const PostSchema: Schema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  published: {type: Boolean, default: true},
  timestamp: {type: Date, default: Date.now},
});

PostSchema.virtual('format_date').get(function (this: IPost) {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

export default model<IPost>('Post', PostSchema);
