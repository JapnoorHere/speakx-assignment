# speakx-assignment

Hosted website - https://speakx-assignment-eta.vercel.app/

Installation
<h4>Backend Setup</h4>
<ul>
<li>git clone https://github.com/JapnoorHere/speakx-assignment.git</li>
<li>cd speakx-assignment</li>
<li> cd backend </li>
<li>npm install</li>
<li>Make env file in this format</li>
MONGO_URI=your_mongodb_connection_string

PORT=5000
<li>node server.js</li>
</ul>

<h4>Frontend Setup</h4>
<ul>
<li>git clone https://github.com/JapnoorHere/speakx-assignment.git</li>
<li>cd frontend </li>
<li>npm install</li>
<li>Make env file in this format</li>
VITE_API_URL=either add localhost:5000 or this backend url -> https://speakx-assignment-j4p7.onrender.com
<li>npm run dev</li>
</ul>

<h4>Mongodb Setup</h4>
Make a database named "<b>speakx</b>" and add all json in that database with collection name "<b>questions</b>"
