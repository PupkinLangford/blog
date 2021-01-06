import {model, Schema} from 'mongoose';
import {DateTime} from 'luxon';

const CommentSchema: Schema = new Schema({
  username: {type: String, default: 'Anonymous'},
  content: {type: String, required: true},
  post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
  timestamp: {type: Date, default: Date.now},
});

CommentSchema.virtual('format_date').get(function (this: {timestamp: Date}) {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

export default model('Comment', CommentSchema);
