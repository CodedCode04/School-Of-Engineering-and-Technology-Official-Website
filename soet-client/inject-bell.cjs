const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Dashboard.jsx') || f === 'StudentDocs.jsx');

files.forEach(f => {
  const file = path.join(dir, f);
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('NotificationBell')) {
    content = content.replace(/import \{ useAuth \} from '\.\.\/context\/AuthContext';/, "import { useAuth } from '../context/AuthContext';\nimport NotificationBell from '../components/NotificationBell';");
    content = content.replace(/<button onClick=\{logout\} className="logout-btn">Logout<\/button>/, "<div style={{ display: 'flex', alignItems: 'center' }}><NotificationBell /><button onClick={logout} className=\"logout-btn\">Logout</button></div>");
    fs.writeFileSync(file, content);
  }
});
