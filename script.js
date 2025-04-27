function generateCalendar() {
  const calendar = document.getElementById('calendar');
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();
  const date = today.getDate();

  calendar.innerHTML = `
      <div><strong>${month} ${year}</strong></div>
      <div style="margin-top: 10px; font-size: 24px;">${date}</div>
  `;
}

document.addEventListener('DOMContentLoaded', generateCalendar);


// -------------------------------firestore for data collection -----------------------------
const db = firebase.firestore();
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskAssignedTo = document.getElementById('taskAssignedTo');
const taskStatus = document.getElementById('taskStatus');


signupForm.addEventListener('submit', (e) => {
e.preventDefault();
const name = document.getElementById('signupName').value;
const email = document.getElementById('signupEmail').value;
const password = document.getElementById('signupPassword').value;

auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    // Save user info in Firestore
    return db.collection('users').doc(user.uid).set({
      name: name,
      email: email,
      role: 'user', // default role
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  })
  .then(() => {
    // After saving user info, redirect to dashboard
    window.location.href = "dashboard.html";
  })
  .catch((error) => {
    alert(error.message);
  });
});

// Fetch and display tasks
function loadTasks() {
  db.collection('tasks').get().then((querySnapshot) => {
    taskList.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      const taskElement = document.createElement('div');
      taskElement.classList.add('task-item');
      taskElement.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.description}</p>
        <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
        <p><strong>Status:</strong> ${task.status}</p>
        <button class="editBtn" data-id="${doc.id}">Edit</button>
        <button class="deleteBtn" data-id="${doc.id}">Delete</button>
      `;
      taskList.appendChild(taskElement);
    });
  });
}

// Create a new task
addTaskBtn.addEventListener('click', () => {
  const title = taskTitle.value;
  const description = taskDescription.value;
  const assignedTo = taskAssignedTo.value;
  const status = taskStatus.value;

  if (title && description && assignedTo) {
    db.collection('tasks').add({
      title,
      description,
      assignedTo,
      status,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      loadTasks(); // Reload tasks
      taskTitle.value = '';
      taskDescription.value = '';
      taskAssignedTo.value = '';
      taskStatus.value = 'To Do';
    }).catch((error) => {
      alert('Error adding task: ' + error.message);
    });
  } else {
    alert('Please fill in all fields!');
  }
});

// Edit a task
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('editBtn')) {
    const taskId = e.target.getAttribute('data-id');
    db.collection('tasks').doc(taskId).get().then((doc) => {
      const task = doc.data();
      taskTitle.value = task.title;
      taskDescription.value = task.description;
      taskAssignedTo.value = task.assignedTo;
      taskStatus.value = task.status;

      // Change the button functionality to update the task
      addTaskBtn.textContent = 'Update Task';
      addTaskBtn.onclick = () => {
        const updatedTitle = taskTitle.value;
        const updatedDescription = taskDescription.value;
        const updatedAssignedTo = taskAssignedTo.value;
        const updatedStatus = taskStatus.value;

        if (updatedTitle && updatedDescription && updatedAssignedTo) {
          db.collection('tasks').doc(taskId).update({
            title: updatedTitle,
            description: updatedDescription,
            assignedTo: updatedAssignedTo,
            status: updatedStatus,
          }).then(() => {
            loadTasks(); // Reload tasks
            addTaskBtn.textContent = 'Add Task'; // Reset button
            taskTitle.value = '';
            taskDescription.value = '';
            taskAssignedTo.value = '';
            taskStatus.value = 'To Do';
          }).catch((error) => {
            alert('Error updating task: ' + error.message);
          });
        } else {
          alert('Please fill in all fields!');
        }
      };
    });
  }

  // Delete a task
  if (e.target.classList.contains('deleteBtn')) {
    const taskId = e.target.getAttribute('data-id');
    if (confirm('Are you sure you want to delete this task?')) {
      db.collection('tasks').doc(taskId).delete().then(() => {
        loadTasks(); // Reload tasks
      }).catch((error) => {
        alert('Error deleting task: ' + error.message);
      });
    }
  }
});

// Initial load of tasks when the page is loaded
document.addEventListener('DOMContentLoaded', loadTasks);