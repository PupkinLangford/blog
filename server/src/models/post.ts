import {DateTime} from 'luxon';
import {model, Schema} from 'mongoose';

const PostSchema: Schema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  published: {type: Boolean, default: true},
  timestamp: {type: Date, default: Date.now},
});

PostSchema.virtual('format_date').get(function (this: {timestamp: Date}) {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

export default model('Post', PostSchema);
