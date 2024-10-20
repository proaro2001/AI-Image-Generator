import './style.css'

const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
  // prevent auto refresh on submit
  e.preventDefault();

  // show the spinner
  showSpinner();

  // get the prompt from the form
  const data = new FormData(form);

  // make a POST request to the server
  const response = await fetch('http://localhost:8080/dream', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: data.get('prompt') }),
  });

  if (response.ok) {
    // get the image url from the response
    const { image_url } = await response.json();
    
    // insert the image into the page
    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image_url}" width="512" />`;
    
  } else {
    const err = await response.text();
    alert(err);
    console.error(err);
  }
  
  // hide the spinner
  hideSpinner();
});

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}