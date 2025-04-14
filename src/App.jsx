import { useEffect, useState } from 'react';
import Axios from 'axios';

export default function App() {
  const [Posts, SetPosts] = useState([]);

  const FetchPosts = () => {
    Axios.get('https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts')
      .then((Res) => SetPosts(Res.data));
  };

  useEffect(FetchPosts, []);

  const RenderPosts = () => {
    return Posts.map((post, i) => {

      const validKeys = ['id', 'title', 'body', 'public'];
      if (!isObjValid(post, validKeys)) return;

      console.log(post);

      const { author, title, body, public: isPublic } = post;

      return (
        <li key={formatKey(title, i)}>
          <h2>{title}</h2>
          <p>{body}</p>
          <div>{author}</div>
          <div>{isPublic ? 'Pubblico' : 'Privato'}</div>
        </li>
      );
    });
  };

  return (
    <>
      <header>
        <form>
          <label htmlFor="author">Autore</label>
          <input id="author" type="text" />

          <label htmlFor="title">Titolo</label>
          <input id="title" type="text" />

          <label htmlFor="body">Testo del messaggio</label>
          <input id="body" type="text" />

          <label htmlFor="public">Pubblico</label>
          <select id="public" name="public">
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </select>

          <button type="submit">Invia</button>
        </form>
      </header>

      <main>
        <ul>
          {RenderPosts()}
        </ul>
      </main>
    </>
  )
};




function formatKey(title, id) {
  if (typeof title !== 'string') return;
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${id}`;
};

function isObjValid(obj, validKeys) {
  return validKeys.every(key => obj[key]);
};