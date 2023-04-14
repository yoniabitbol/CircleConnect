const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const host = process.env.REACT_APP_HOST || 'localhost';
const url = `http://${host}:${port}/api/users`;

async function saveUserToDB(token: string, email: string, name: string, user_id: string) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id,
      name,
      email,
    }),
  });
  return res.json();
}

export default saveUserToDB;
