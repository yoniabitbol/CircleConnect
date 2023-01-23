const url = 'http://localhost:4100/api/users';

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
