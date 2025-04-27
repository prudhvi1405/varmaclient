import mysql from 'mysql2/promise';
import cors from 'cors';
import bcrypt from 'bcrypt';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

let dbPool;

// Initialize the database and connection pool
async function initializeDb() {
  dbPool = mysql.createPool({
    host: '130.211.226.175',
    user: 'arjunamysql',
    password: 'Karjuna@1099',
    database: 'mysqldb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  await dbPool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `);

  console.log('Users table initialized');
}

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const [result] = await dbPool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.json({ success: true, message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, message: 'Email already exists' });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await dbPool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0 || !bcrypt.compareSync(password, rows[0].password)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = rows[0];
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/gettables', async (req, res) => {
  console.log("hello bro");
  try {
    const [rows1] = await dbPool.execute('SELECT * FROM Households LIMIT 100');
    const [rows2] = await dbPool.execute('SELECT * FROM NewTransactions LIMIT 100');
    const [rows3] = await dbPool.execute('SELECT * FROM Products LIMIT 100');
    const [rows4] = await dbPool.execute('SELECT t.HSHD_NUM, t.BASKET_NUM, t.PRODUCT_NUM, p.DEPARTMENT, p.COMMODITY, t.SPEND, t.UNITS, t.STORE_R, t.WEEK_NUM, t.YEAR, h.L, h.AGE_RANGE, h.MARITAL, h.INCOME_RANGE, h.HOMEOWNER, h.HSHD_COMPOSITION, h.HH_SIZE, h.CHILDREN FROM NewTransactions t JOIN Households h ON t.HSHD_NUM = h.HSHD_NUM JOIN Products p ON t.PRODUCT_NUM = p.PRODUCT_NUM LIMIT 100');

    if (rows1.length === 0 || rows2.length === 0 || rows3.length === 0 || rows4.length === 0) {
      res.status(401).json({ message: 'Empty table/ Table might not exist' });
    } else {
      console.log(rows1[0]);
      console.log(rows2[0]);
      console.log(rows3[0]);
      console.log(rows4[0]);
      res.json({
        message: 'successfully saw',
        entries1: rows1,
        entries2: rows2,
        entries3: rows3,
        entries4: rows4,
      });
    }
  } catch (error) {
    console.error("Database query failed:", error);  // Log the actual error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/userquery', async (req, res) => {
  const query = req.body.data;
  // let tableName;
  console.log(typeof query);
  try {
    const [rows] = await dbPool.execute(query);
    // const match = query.match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
    // if (match) {
    //   tableName = match[1]; // The table name will be in the first capturing group
    //   console.log(tableName); // Output the table name
    // } else {
    //   console.log('No table name found.');
    // }    
    if (rows.length === 0) {
      res.status(401).json({ message: 'Empty table/ Table might not exist' });
    } else {
      console.log(rows[0]);
      // console.log("hi yoo");
      // console.log(tableName);
      res.json({
        message: 'successfully saw',
        // dataset: tableName,
        entries: rows,
      });
    }
  } catch (error) {
    console.error("Database query failed:", error);  // Log the actual error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})

app.post('/api/runmodel', async (req, res) => {

  try {
    // Run the ML model (replace this with your actual ML model code)
    const modelResults = await mlModel.run();  // Assuming your ML code returns the results

    // Send the results back to the frontend
    res.json({ success: true, data: modelResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Model execution failed.' });
  }
})

initializeDb().then(() => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});
