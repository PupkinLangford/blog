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