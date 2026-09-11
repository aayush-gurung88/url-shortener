const express = require("express");
const fs = require("fs"); 
const path = require("path");

const app = express();

// app.use() means "Hey Express, run this function for every single incoming request before doing anything else."
app.use(express.json());

// Serve static HTML/CSS files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Environment Variables for Cloud Deployment
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;


// reading and writing to local storage
const FILE_PATH = path.join(__dirname, "urls.json");

function loadDatabase() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify({})); 
    }   
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data || "{}");
}

function saveDatabase(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

function generateShortId() {
    return Math.random().toString(36).substring(2, 8);
}

// Route to shorten URL 
app.post("/shorten", (req, res) => {
    // 1. Browser le pathaeko JSON body bata "originalUrl" extraction
    const { originalUrl } = req.body;

    // 2. Validation: Yadi URL exist gardaina bhane 400 Bad Request error send garne
    if (!originalUrl) {
        return res.status(400).json({ error: "originalUrl is required!" });
    }

    // 3. Database load garne ani unique shortId (e.g., "q91g7b") generate garne
    const urlDatabase = loadDatabase();
    const shortId = generateShortId();

    // 4. Object key-value map garne: urlDatabase["q91g7b"] = "https://google.com"
    urlDatabase[shortId] = originalUrl;
    
    // 5. Updated mapping lai urls.json ma overwrite/save garne
    saveDatabase(urlDatabase);

    // 6. Response: Browser lai single short URL matra nabhai extra details pni return garne
    res.json({
        shortUrl: `${BASE_URL}/${shortId}`,
        shortId: shortId,
        originalUrl: originalUrl
    });
});

// Route to redirect short URLs
app.get("/:shortId", (req, res) => {
    const { shortId } = req.params;
    const urlDatabase = loadDatabase();
    const originalUrl = urlDatabase[shortId];

    if (originalUrl) {
        return res.redirect(originalUrl);
    } else {
        return res.status(404).send("URL not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});