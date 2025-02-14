const {app} = require('./app');


const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});