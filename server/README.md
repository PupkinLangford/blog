# Blog API

## Endpoints

|Function| Endpoint | Request Type| Body | Protected? |
|--------|------------|-----------| ------| ------ |
|Create new user|`/api/users`|`POST`| username, password, key | No |
|Log in | `/api/users/login`|`POST`| username, password | No |
|Get user by id | `/api/users/:id`|`GET`| | No |
|Get published posts | `/api/posts` | `GET`| | No |
|Get all posts | `/api/posts/all` | `GET`| | Yes |
|Create new post | `/api/posts` | `POST`| title, content | Yes |
| Get post by id | `/api/posts/:id` | `GET` | | No |
| Update post | `/api/posts/:id` | `PUT`| title, content | Yes |
| Publish post | `/api/posts/:id` | `POST`| | Yes |
|Delete post | `/api/posts/:id` | `DELETE`| | Yes |
| Get comments for post | `/api/posts/:id/comments` | `GET`| | No |
| Post comment | `/api/posts/:id/comments` | `POST`| content, username | No |
| Get comment by id | `/api/posts/:id/comments/:comment_id` | `GET`| | No |
| Delete comment | `/api/posts/:id/comments/:comment_id` | `DELETE`| | Yes |