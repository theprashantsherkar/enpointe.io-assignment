import { app } from "./index.js";
import db from "./database/db.js";

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`.bgCyan.black.bold);
});


