import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJourAllArticles, removeArticle } from "../services/api";
import { useParams } from "react-router-dom";
//
// ArticleList component
//
export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
    const { id } = useParams(); // Get journalist ID from URL params
  const navigate = useNavigate();
  useEffect(() => {
    fetchArticles(); // Fetch all articles when component mounts
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getJourAllArticles(id);
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
          />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">By{article.name}</div>

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
