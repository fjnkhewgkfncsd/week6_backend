import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { getArticles, removeArticle,getJourAllArticles } from "../services/api";

//
// ArticleList component
//
export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  console.log(articles);
  useEffect(() => {
    fetchArticles(); // Fetch all articles when component mounts
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      await fetchArticles(); // refresh the list
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOnName = async (journalistId) => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getJourAllArticles(journalistId);
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleView = (id) => navigate(`/articles/${id}`);

  const handleEdit = (id) => navigate(`/articles/${id}/edit`);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.art_id}
            article={article}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteArticle}
            handleClickOnName={handleClickOnName}
          />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete, handleClickOnName }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">By <Link onClick={() => handleClickOnName(article.journalist_id)} to={`/journalists/${article.journalist_id}/articles`}>{article.name}</Link></div>

      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.art_id)}>
          Edit
        </button>
        <button
          className="button-tertiary"
          onClick={() => onDelete(article.art_id)}
        >
          Delete
        </button>
        <button className="button-secondary" onClick={() => onView(article.art_id)}>
          View
        </button>
      </div>
    </div>
  );
}
