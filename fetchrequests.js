//log in
fetch('/api/session', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `khMXYfMG-vNSPikyKla2Vt4eckfGtNopPQ8w`
    },
    body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
  }).then(res => res.json()).then(data => console.log(data));
