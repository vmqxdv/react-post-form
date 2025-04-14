import { useEffect, useState } from 'react';
import Axios from 'axios';

export default function App() {
  const [Posts, SetPosts] = useState([]);
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    body: '',
    public: true,
  });

  const FetchPosts = () => {
    Axios.get('https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts')
      .then((Res) => SetPosts(Res.data));
  };

  useEffect(FetchPosts, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts', formData)
      .then((Res) => {
        console.log('Dati inviati con successo:', Res.data);
        SetPosts((prevPosts) => [...prevPosts, Res.data]);
        setFormData({ author: '', title: '', body: '', public: true });
      });
  };

  const RenderPosts = () => {
    return Posts.map((post, i) => {

      const validKeys = ['id', 'title', 'body', 'author', 'public'];
      if (!isObjValid(post, validKeys)) return;

      const { author, title, body, public: isPublic } = post;

      return (
        <li key={formatKey(title, i)}>
          <h2>{title}</h2>
          <p>{body}</p>
          <div>{author}</div>
          <div>{isPublic ? 'Pubblico' : 'Privato'}</div>
        </li>
      );
    }).reverse();
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <label htmlFor="author">Autore</label>
          <input id="author" name="author" type="text" value={formData.author} onChange={(event) => setFormData({ ...formData, author: event.target.value })} />

          <label htmlFor="title">Titolo</label>
          <input id="title" name="title" type="text" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />

          <label htmlFor="body">Testo del messaggio</label>
          <input id="body" name="body" type="text" value={formData.body} onChange={(event) => setFormData({ ...formData, body: event.target.value })} />

          <label htmlFor="public">Pubblico</label>
          <select id="public" name="public" value={formData.public} onChange={(event) => setFormData({ ...formData, public: event.target.value === 'true' })}>
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
  return validKeys.every(key => {
    if (key === 'id')
      return obj[key] && !isNaN(Number(obj[key]));

    if (typeof obj[key] === 'string')
      return obj[key].trim() !== '';

    return obj[key] !== undefined && obj[key] !== null;
  });
};