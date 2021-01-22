export interface IPost {
    title: string;
    content: string;
    author: {username: string},
    published: boolean;
    format_date: Date;
    snippet: string;
  }