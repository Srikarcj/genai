const apiKey = 'd81e614416d84621a76635db2d46e697'; // Replace with your NewsAPI key
const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

let articlesData = [];

// Event Listeners for the Menu
document.getElementById('home-link').addEventListener('click', loadHome);
document.getElementById('login-link').addEventListener('click', loadLogin);
document.getElementById('register-link').addEventListener('click', loadRegister);

// Initial Setup: Add Generate News Listener on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const generateNewsButton = document.getElementById('generate-news');
    if (generateNewsButton) {
        generateNewsButton.addEventListener('click', generateNews);
    }
});

// Load Home Page
function loadHome() {
    document.querySelector('.content-container').innerHTML = `
        <h1>Welcome to AI News Generator</h1>
        <button id="generate-news" class="generate-btn">Generate AI News</button>
        <div id="news-container" class="news-container"></div>
    `;
    document.getElementById('generate-news').addEventListener('click', generateNews);
    hideForms(); // Hide login and register forms when on home page
}

// Load Login Form
function loadLogin() {
    document.querySelector('.content-container').innerHTML = document.getElementById('login-form').outerHTML;
    showForm('login-form');
}

// Load Register Form
function loadRegister() {
    document.querySelector('.content-container').innerHTML = document.getElementById('register-form').outerHTML;
    showForm('register-form');
}

// Show the login or register form when clicked
function showForm(formId) {
    hideForms();
    document.getElementById(formId).style.display = 'block';
}

// Hide all forms
function hideForms() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
}

// Generate Random News Articles
async function generateNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Clear previous news

    try {
        const response = await fetch(newsApiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "ok" && data.articles && data.articles.length > 0) {
            articlesData = data.articles; // Store articles for later use
            displayRandomNews(articlesData);
        } else {
            throw new Error("No articles available or unexpected response format.");
        }
    } catch (error) {
        newsContainer.innerHTML = `<p>There was an error fetching the news: ${error.message}. Please try again later.</p>`;
        console.error('Error fetching news:', error);  // Log the error to console for debugging
    }
}

// Display Random News Articles in Grid Layout
function displayRandomNews(articles) {
    const newsContainer = document.getElementById("news-container");
    let rowsHtml = '';
    const shuffledArticles = shuffleArray(articles); // Shuffle the articles to get random ones

    shuffledArticles.slice(0, 30).forEach((article, index) => {
        if (index % 3 === 0) {
            rowsHtml += '<div class="news-row">';
        }

        const imageUrl = article.urlToImage ? article.urlToImage : getRandomImage(); // Choose image or fallback

        rowsHtml += `
            <div class="news-card">
                <img src="${imageUrl}" 
                     alt="${article.title}" 
                     onerror="this.onerror=null; this.src='https://picsum.photos/200/150?random=999';" />
                <h3>${article.title}</h3>
                <p>${article.description || 'No description available'}</p>
            </div>
        `;

        if (index % 3 === 2) {
            rowsHtml += '</div>';
        }
    });

    newsContainer.innerHTML = rowsHtml;
}

// Helper function to shuffle an array (randomize order)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Helper function to get a random image URL if no image is found in the article
function getRandomImage() {
    const randomImages = [
        'https://picsum.photos/200/150?random=1', // Random image 1
        'https://picsum.photos/200/150?random=2', // Random image 2
        'https://picsum.photos/200/150?random=3', // Random image 3
        'https://picsum.photos/200/150?random=4', // Random image 4
        'https://picsum.photos/200/150?random=5', // Random image 5
        'https://picsum.photos/200/150?random=6', // Random image 6
        'https://picsum.photos/200/150?random=7', // Random image 7
        'https://picsum.photos/200/150?random=8', // Random image 8
        'https://picsum.photos/200/150?random=9', // Random image 9
        'https://picsum.photos/200/150?random=10' // Random image 10
    ];
    return randomImages[Math.floor(Math.random() * randomImages.length)];
}
