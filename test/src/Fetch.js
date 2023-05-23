const fetchFun = (methods, url = 0, body) => {
  let api = '/api/';
  const params = { method: methods };

  if (methods === 'GET') {
    api = `${api}users?first_result=${url}`;

    let str = '';

    if (body !== undefined) {
      Object.keys(body).forEach((el) => {
        const field = `${el}=${body[el]}`;
        if (body[el] !== '' && body[el] !== undefined) {
          str += `&${field}`;
        }
      });
    }

    api += str;
  }

  if (methods === 'POST' || methods === 'PUT') {
    api = `${api}user`;

    if (methods === 'PUT') {
      api = `${api}/${url}`;
    }

    params.headers = new Headers({
      'Content-Type': 'application/json',
    });

    params.body = JSON.stringify(body);
  }

  if (methods === 'DELETE') {
    api = `${api}user/${url}`;

    params.headers = new Headers({
      'Content-Type': 'application/json',
    });
  }

  return fetch(api, params)
    .then((res) => res.json())
    .catch();
};

export default fetchFun;
