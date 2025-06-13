import {pool} from '../utils/database.js'
//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

// Get all articles
export async function getArticles() {
    // TODO
    try {
        const [rows] = await pool.query('select * from articles join journalists on articles.journalist_id = journalists.id');
        console.log('Articles fetched successfully:', rows);
        return rows;
    } catch (error){
        console.error('error fetching articles :', error)
    }
}


export async function getAllArticlesByJournalistName(journalistId){
    try {
        console.log(journalistId,'here');
        const [rows] = await pool.query('select * from articles join journalists on articles.journalist_id = journalists.id where journalist_id = ?',[journalistId])
        console.log('Articles fetched successfully by journalist name:', rows);
        return rows;
    } catch (error) {
        console.error('error fetching articles by journalist name:', error);
        throw error;
    }
}
// Get one article by ID
export async function getArticleById(id) {
    // TODO
    try {
        const [rows] = await pool.query('select * from articles join journalists on articles.journalist_id = journalists.id where art_id = ?',[id])
        if (rows.length === 0) {
            console.error('here')
            throw new Error('Article not found');
            
        }
        console.log('Article fetched successfully:', rows[0]);
         // Return the first article found
         // Assuming ID is unique, we can return the first row
        return rows[0];
    } catch (error) {
        console.error('error fetching article by id:', error);
        
    }
}

// Create a new article
export async function createArticle(article) {
    // TODO
    try {
        console.log(article)
        const [result] = await pool.query('insert into articles (title,content,journalist_id,category) values (?,?,?,?)',[article.title,article.content,article.journalist,article.category])
        console.log('Article created successfully');
    } catch (error) {
        console.error('error creating article:', error);
        throw error;
    }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    try {
        const {title,content,journalist,category} = updatedData;
        await pool.query('update articles set title = ?, content = ?, journalist_id = ?, category = ? where art_id = ?', [title, content, journalist, category, id]);
        console.log('Article updated successfully');
    } catch (error) {
        console.error('error updating article:', error);
        
    }
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    try {
        await pool.query('delete from articles where art_id = ?',[id])
        console.log('Article deleted successfully');
        return true;
    } catch (error) {
        console.error('error deleting article:', error);
        
    }
}
