const newEventHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#event-name').value.trim();
  const needed_volunteers = document.querySelector('#event-members').value.trim();
  const description = document.querySelector('#event-desc').value.trim();

  if (name && needed_volunteers && description) {
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_volunteers, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/events');
    } else {
      alert('Failed to create event');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/eventRoutes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete event');
    }
  }
};

document
  .querySelector('.new-event-form')
  .addEventListener('submit', newEventHandler);

document
  .querySelector('.event-list')
  .addEventListener('click', delButtonHandler);
