export interface IPost {
    title: string;
    content: string;
    author: 
        {username: string,
        _id: string},
    published: boolean;
    format_date: Date;
    snippet: string;
    _id: string;
  }

export interface IComment {
    username: string,
    content: string,
    format_date: Date,
    _id: string
}