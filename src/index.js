let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const createToyForm = document.querySelector(".add-toy-form")
  console.log(createToyForm)

  // EVENT LISTENERS: one on the Add Toy btn and one on the Create Toy form.
  createToyForm.addEventListener('submit', handleCreateEvent)


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Function that handles the form submission event listener
  function handleCreateEvent(e) {
    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    console.log(toyObj)
    renderOneToy(toyObj)
    addNewToy(toyObj)
  }


  // Use fetch Get request to pull information from a server, in this case, a json server. In the future - could see this being a storage of user inputs/metadata around inputs, etc.
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
      initializeToy(data)
    })


  // Function that does a POST request when a new toy is created.
  function addNewToy(toyObj) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
      .then(res => res.json())
      .then(toy => console.log(toy))

  }


  //Create and render new cards
  // Create cards for new toys on the DOM (this could be new cities in my project?). Get data and render our toys to the DOM.
  function initializeToy(toyData) {
    console.log(toyData)
    toyData.forEach(toy => renderOneToy(toy))
  }


  // DOM Render Functions
  function renderOneToy(toy) {
    // Build Toy Card
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
    <div>
    <h2> ${toy.name}</h2>
    </div>
    <img src="${toy.image}" alt="${toy.name} picture" class="toy-avatar">
    <div>
    <p> ${toy.likes} likes</p>
    </div>
    <button class="button">like</button>
    `
    document.querySelector('#toy-collection').appendChild(card)

    // Add Event Listener onto the Like button
    card.querySelector('.button').addEventListener('click', () => {
      toy.likes += 1;
      card.querySelector('p').textContent = `${toy.likes} likes`;
      updateLikes(toy);
    })

  }

  function updateLikes(toyObj) {
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
      .then(res => res.json())
      .then(toy => console.log(toy))

  }
});
