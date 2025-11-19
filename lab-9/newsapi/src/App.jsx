import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=c92d5228cbe84501ae9f85b12210c9ca`
    )
      .then(res => res.json())
      .then(data => {
        const formatted = data.articles.map((a, i) => ({
          id: i + 1,
          title: a.title,
          description: a.description
        }));
        setArticles(formatted);
      });
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex === null) {
     
      setArticles([...articles, { ...form, id: Date.now() }]);
    } else {
      
      const updated = [...articles];
      updated[editIndex] = { ...updated[editIndex], ...form };
      setArticles(updated);
      setEditIndex(null);
    }

    setForm({ title: "", description: "" });
  };

  
  const deleteArticle = (index) => {
    setArticles(articles.filter((_, i) => i !== index));
  };


  const editArticle = (index) => {
    setEditIndex(index);
    setForm({
      title: articles[index].title,
      description: articles[index].description
    });
  };

  return (
    <div className="container">
      <h1>News-Api</h1>

      <form onSubmit={handleSubmit} className="input-box">
        <input
          type="text"
          placeholder="News Title"
          required
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          required
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <button type="submit">
          {editIndex === null ? "Add Article" : "Update Article"}
        </button>

        {editIndex !== null && (
          <button type="button" onClick={() => {
            setEditIndex(null);
            setForm({ title: "", description: "" });
          }}>
            Cancel
          </button>
        )}
      </form>

      <div>
        {articles.map((a, i) => (
          <div key={a.id} className="card">
            <h3>{a.title}</h3>
            <p>{a.description}</p>

            <button onClick={() => editArticle(i)}>Edit</button>
            <button onClick={() => deleteArticle(i)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
