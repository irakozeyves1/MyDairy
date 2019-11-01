import app from './app';

const port = process.env.PORT || 5000;
const server = app.listen(port, () => process.stdout.write(`Server is running on port: ${port}`));
export default server;
