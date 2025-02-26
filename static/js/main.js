document.addEventListener('DOMContentLoaded', function() {
    // Update current time
    function updateTime() {
        const now = new Date();
        document.getElementById('current-time').textContent = 
            now.toLocaleTimeString('en-GB');
    }

    // Format departure time
    function formatTime(time) {
        return new Date(time).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Render departures
    function renderDepartures(departures) {
        const container = document.getElementById('departures');
        container.innerHTML = '';

        departures.forEach(departure => {
            const row = document.createElement('div');
            row.className = 'departure-row';
            row.innerHTML = `
                <div class="time">${formatTime(departure.time)}</div>
                <div class="destination">${departure.destination}</div>
                <div class="platform">${departure.platform}</div>
                <div class="status">${departure.status}</div>
            `;
            container.appendChild(row);
        });
    }

    // Fetch departures from API
    async function fetchDepartures() {
        try {
            const response = await fetch('/api/departures');
            if (!response.ok) {
                throw new Error('Failed to fetch departures');
            }
            const data = await response.json();
            renderDepartures(data);
            document.getElementById('status-message').textContent = '';
        } catch (error) {
            document.getElementById('status-message').textContent = 
                'Unable to load departure information. Please try again later.';
            console.error('Error:', error);
        }
    }

    // Initialize
    updateTime();
    fetchDepartures();

    // Update time every second
    setInterval(updateTime, 1000);

    // Refresh departures every 30 seconds
    setInterval(fetchDepartures, 30000);
});
