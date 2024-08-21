import { useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState('');
  const [news, setNews] = useState([]);

  function handleSubmit(event: any) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const title = event.target.elements.title.value;
    fetch(`${import.meta.env.VITE_CANISTER_URL}/greet-me?name=${name}&title=${title}`)
      .then(response => response.json()).then((json) => {
        setGreeting(json.greeting)
      });
  }

  function handleGetNews(event: any) {
    event.preventDefault();
    
    fetch(`${import.meta.env.VITE_CANISTER_URL}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((json) => {
      console.log(json);
      setNews(json.articles);
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <label htmlFor="title">Enter your title: &nbsp;</label>
        <input id="title" alt="Title" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <form action="#" onSubmit={handleGetNews}>
        <button type="submit">Get News</button>
      </form>
      <section id="greeting">{greeting}</section>
      <section id="news">{news}</section>
    </main >
  );
}

export default App;
