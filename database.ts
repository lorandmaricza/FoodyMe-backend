import { createConnection } from 'mysql';

const connectionUri = 'mysql://root:root@127.0.0.1:8889/project_db';

const db = createConnection(connectionUri);

db.connect(function(err) {
    if (err) throw err;
});

export default db;