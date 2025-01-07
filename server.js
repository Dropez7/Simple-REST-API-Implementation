import App from './app';

const port = 3001;
App.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Access http://localhost:${port}`);
});
