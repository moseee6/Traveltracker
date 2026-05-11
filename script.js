



function StadiumLog() {
    this.destinations = {};
    this.idCounter = 0;
}


StadiumLog.prototype.addDestination = function(stadiumObject) {
    this.idCounter += 1;
    stadiumObject.id = this.idCounter;
    this.destinations[stadiumObject.id] = stadiumObject;
    console.log("Successfully saved:", stadiumObject.location);
};


function Stadium(location, landmarks, season, notes, rawTasks) {
    this.location = location;
    this.landmarks = landmarks;
    this.season = season;
    this.notes = notes;
    this.timestamp = new Date().toLocaleDateString();

    this.parseTasks(rawTasks);
}
Stadium.prototype.parseTasks = function(rawString) {
    if (!rawString || rawString.trim() === "") {
        
        this.tasks = ["Soak up the atmosphere", "Take a stadium photo", "Watch the warm-ups"];
    } else {
        
        this.tasks = rawString.split(",")
            .map(task => task.trim())
            .filter(task => task !== "");
    }
};



const myTracker = new StadiumLog();

window.onload = function() {
    console.log("Dashboard Initialized...");

    
    const entryForm = document.getElementById("places-form");
    const profileForm = document.getElementById("user-info-form");

    /**
     
     */
    entryForm.onsubmit = function(event) {
        event.preventDefault(); 

        
        const locationVal = document.getElementById("loc").value;
        const landmarkVal = document.getElementById("land").value;
        const seasonVal = document.getElementById("time").value;
        const taskVal = document.getElementById("user-tasks").value;
        const notesVal = document.getElementById("notes").value;

        
        const newStadium = new Stadium(locationVal, landmarkVal, seasonVal, notesVal, taskVal);
        
        
        myTracker.addDestination(newStadium);

        
        renderList();
        
        
        entryForm.reset();
        alert("Destination Logged Successfully!");
    };

    /**
     
     */
    profileForm.onsubmit = function(event) {
        event.preventDefault();
        const newName = document.getElementById("user-name").value;
        const newPhone = document.getElementById("user-phone").value;
        
        const displayArea = document.getElementById("user-display");
        displayArea.innerText = `${newName} | ${newPhone}`;
        
        
        displayArea.style.color = "#22c55e";
        setTimeout(() => { displayArea.style.color = "#a855f7"; }, 2000);
        
        profileForm.reset();
    };
};

/**
 
 */
function renderList() {
    const listContainer = document.getElementById("output-list");
    const totalDisplay = document.getElementById("stat-count");
    
    
    listContainer.innerHTML = "";
    
    const allIds = Object.keys(myTracker.destinations);
    totalDisplay.innerText = allIds.length;

    allIds.forEach(id => {
        const stadium = myTracker.destinations[id];
        
        
        const li = document.createElement("li");
        li.className = "stadium-item-card";
        li.innerHTML = `
            <div class="item-content">
                <span class="item-pin">📍</span>
                <div class="item-text">
                    <span class="item-title">${stadium.location}</span>
                    <span class="item-date">Visited: ${stadium.timestamp}</span>
                </div>
            </div>
        `;

        
        li.onclick = function() {
            showDetails(stadium.id);
        };

        listContainer.appendChild(li);
    });
}

/**
 
 */
function showDetails(stadiumId) {
    const data = myTracker.destinations[stadiumId];
    const detailsContainer = document.getElementById("details");
    
    
    detailsContainer.classList.remove("hidden");

    
    let taskListHtml = "<ul class='todo-checklist'>";
    data.tasks.forEach(task => {
        taskListHtml += `<li><input type="checkbox"> <span>${task}</span></li>`;
    });
    taskListHtml += "</ul>";

    
    detailsContainer.innerHTML = `
        <div class="detail-header">
            <h3>${data.location}</h3>
            <span class="season-tag">${data.season}</span>
        </div>
        <p class="detail-landmarks"><strong>Landmarks:</strong> ${data.landmarks}</p>
        <p class="detail-notes">"${data.notes}"</p>
        
        <div class="todo-section">
            <h4>Matchday To-Do List:</h4>
            ${taskListHtml}
        </div>
        
        <button class="btn-close" onclick="this.parentElement.classList.add('hidden')">Close Details</button>
    `;
    
    
    detailsContainer.scrollIntoView({ behavior: 'smooth' });
}

