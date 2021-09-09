// SELECTORS
const diaryInput = document.querySelector('.diary-input');
const diaryButton = document.querySelector('.diary-button');
const diaryList = document.querySelector('.diary-list');
const filterOption = document.querySelector('.filter-itinerary')


// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getItinerary)
diaryButton.addEventListener('click', addDiary);
diaryList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterItinerary)


// FUNCTIONS
function addDiary(event) {
    // prevents form from submitting
    event.preventDefault();

    // diary DIV
    const diaryDiv = document.createElement('div');
    diaryDiv.classList.add('diary');

    // create LI
    const newEntry = document.createElement('li');
    newEntry.innerText = diaryInput.value;
    newEntry.classList.add('diary-item');
    diaryDiv.appendChild(newEntry);

    // add itinerary to localStorage
    saveLocalDiary(diaryInput.value);

    // completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    diaryDiv.appendChild(completedButton);

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    diaryDiv.appendChild(deleteButton);

    // append to list
    diaryList.appendChild(diaryDiv);

    // clear diary input value
    diaryInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // delete diary
    if(item.classList[0] === 'delete-btn') {
        const diary = item.parentElement;
        // animation
        diary.classList.add('fall');
        removeLocalItinerary(diary);
        diary.addEventListener('transitionend', function() {
            diary.remove();
        } )
    }

    // check mark
    if(item.classList[0] === 'completed-btn') {
        const diary = item.parentElement;
        diary.classList.toggle('completed');
    }
}

function filterItinerary(e) {
    const itinerary = diaryList.childNodes;
    itinerary.forEach(function(diary) {
      switch (e.target.value) {
        case "all":
          diary.style.display = "flex";
          break;
        case "completed":
          if (diary.classList.contains("completed")) {
            diary.style.display = "flex";
          } else {
            diary.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!diary.classList.contains("completed")) {
            diary.style.display = "flex";
          } else {
            diary.style.display = "none";
          }
          break;
      }
    });
  }

  function saveLocalDiary(itinerary) {
      //CHECK to see if it exists already
      let itineraryEntry;
      if (localStorage.getItem("itineraryEntry") === null) {
        itineraryEntry = [];
      } else {
        itineraryEntry = JSON.parse(localStorage.getItem("itineraryEntry"));
      }
      itineraryEntry.push(itinerary);
      localStorage.setItem("itineraryEntry", JSON.stringify(itineraryEntry));
  }

  function removeLocalItinerary(itinerary) {
    let itineraryEntry;
    if (localStorage.getItem("itineraryEntry") === null) {
        itineraryEntry = [];
    } else {
        itineraryEntry = JSON.parse(localStorage.getItem("itineraryEntry"));
    }
    const itineraryIndex = itinerary.children[0].innerText;
    itineraryEntry.splice(itineraryEntry.indexOf(itineraryIndex), 1);
    localStorage.setItem("itineraryEntry", JSON.stringify(itineraryEntry));
  }

  function getItinerary() {
      let itineraryEntry;
      if (localStorage.getItem("itineraryEntry") === null) {
        itineraryEntry = [];
      } else {
        itineraryEntry = JSON.parse(localStorage.getItem("itineraryEntry"));
      }
      itineraryEntry.forEach(function(itinerary) {
        // diary DIV
        const diaryDiv = document.createElement('div');
        diaryDiv.classList.add('diary');
        // create list
        const newEntry = document.createElement('li');
        newEntry.innerText = itinerary;
        newEntry.classList.add('diary-item');
        diaryDiv.appendChild(newEntry);
        diaryInput.value = "";

        // completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("completed-btn");
        diaryDiv.appendChild(completedButton);

        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        diaryDiv.appendChild(deleteButton);
        // append to list
        diaryList.appendChild(diaryDiv);
      });
  }