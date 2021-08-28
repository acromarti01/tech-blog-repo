const logoutHandler = async (event) => {
  event.preventDefault();

  const response = await fetch('/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) { document.location.replace('/login'); } 
  else { alert(response.statusText); }
};

document.querySelector('#logout').addEventListener('click', logoutHandler);
