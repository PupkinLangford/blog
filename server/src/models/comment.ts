import {Document, model, Schema, Types} from 'mongoose';
import {DateTime} from 'luxon';

export interface IComment extends Document {
  username: string;
  content: string;
  post: Types.ObjectId;
  timestamp: Date;
}

const CommentSchema: Schema = new Schema({
  username: {type: String, default: 'Anonymous'},
  content: {type: String, required: true},
  post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
  timestamp: {type: Date, default: Date.now},
});

CommentSchema.virtual('format_date').get(function (this: IComment) {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

export default model<IComment>('Comment', CommentSchema);
