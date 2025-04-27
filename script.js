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
