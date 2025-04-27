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
