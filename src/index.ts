import express from 'express';
import path from 'path';

const app = express();

// Serve the HTML files we just created
app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, () => {
  console.log('Loyalty Dashboard running at http://localhost:3000/user-dashboard.html');
});
