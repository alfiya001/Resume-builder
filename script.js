
const colIcon1 = document.getElementById('collapseIcon1');
const menu = document.getElementById('menu');
const sidebar = document.querySelector('.sidebar')
const mainContainer = document.getElementById('mainContainer')
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav__link')

const form = document.querySelector("#edu_form");
const expForm = document.querySelector("#exp_form");

const submitBtn = document.querySelector('.continue-btn')

// experience constants 
expForm.addEventListener("submit", handleExperienceSubmit);
const expCard = document.querySelector('.experience-container')
const deleteExperience = document.querySelector('.delete-experience')
let education = [];
let experience = [];

const skillsContainer = document.querySelector('.seleced-options')

var headers = new Headers();
headers.append("X-CSCAPI-KEY", "API_KEY");

var requestOptions = {
 method: 'GET',
 headers: headers,
 redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries/IN/cities", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));

// submit button click

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('continue-btn')) {
        console.log(e.target.dataset.tab)
        let sbtBtn = e.target.dataset.tab;
        navLinks.forEach(t => t.classList.remove('active'));
        document.querySelector('.nav__link-' + (Number(sbtBtn) + 1)).classList.add('active');

        addNonActiveTabs()
        document.querySelector('.section-' + sbtBtn).classList.remove('non-active')
    }
}, false);

function toggleOptions() {
    var optionsContainer = document.getElementById('options-container');
    optionsContainer.style.display = (optionsContainer.style.display === 'block') ? 'none' : 'block';
  }

  const selectedOptionarray = [];
  function selectOption(option) {
    skillsContainer.innerHTML = '';
    console.log("selected option ", option.textContent)
    var selectedOptions = document.getElementById('selected-options');
    // var selectedValues = selectedOptions.textContent.split(', ');

    // if(selectedValues[0] === 'Select Options') {
    //     selectedValues = []
    // }

    var optionText = option.textContent;

    if(selectedOptionarray.includes(optionText)) {
        selectedOptionarray = selectedOptionarray.filter(value => value !== optionText)
        // selectedValues = selectedValues.filter(value => value !==optionText)
    } else {
        selectedOptionarray.push(optionText)
        // selectedValues.push(optionText)
    }
    // selectedOptions.textContent = selectedOptionarray.length > 0 ? selectedOptionarray.join(', ') : 'Select Options';


    selectedOptionarray.forEach(option => {
        skillsContainer.innerHTML += `<div class="skill">${option}</div>`
    })
    console.log(selectedOptionarray)
    toggleOptions();
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.custom-select')) {
      var optionsContainer = document.getElementById('options-container');
      if (optionsContainer.style.display === 'block') {
        optionsContainer.style.display = 'none';
      }
    }
  }
// submitBtn.addEventListener('click', navigateInPage)


colIcon1.addEventListener('click', () => {
    sidebar.classList.toggle('collapse');
    mainContainer.classList.toggle('collapse');
    if (colIcon1.classList.contains('fa-caret-left')) {
        colIcon1.classList.remove('fa-caret-left')
        colIcon1.classList.add('fa-caret-right')
    } else {
        colIcon1.classList.add('fa-caret-left')
        colIcon1.classList.remove('fa-caret-right')
    }
});

menu.addEventListener('click', (e) => {
    e.preventDefault();
    // const clicked = e.target.closest('.nav__link');
    // console.log(clicked)
    navLinks.forEach(t => t.classList.remove('active'));
    // clicked.classList.add('active')

    // const id = clicked.childNode.getAttribute('href');
    e.target.closest('.nav__link').classList.add('active');

    console.log(e.target.closest('.fas'))
    const id = e.target.closest('.fas').parentElement.getAttribute('href');
    const ele = document.querySelector(id)
    addNonActiveTabs()
    ele.classList.remove('non-active');
})

function addNonActiveTabs() {
    sections.forEach(section => {
        section.classList.add('non-active')
    });
}

// Education block

form.addEventListener("submit", handleSubmit);
const eduCard = document.querySelector('.education-container')
const deleteEducation = document.querySelector('.delete-education')

deleteEducation.addEventListener('click', (e) => { console.log(e) })
// console.log(eduCard)
function handleSubmit(event) {
    event.preventDefault();

    let data = new FormData(event.target);

    // Do a bit of work to convert the entries to a plain JS object
    let value = Object.fromEntries(data.entries());

    education.push(value)
    console.log("testing ", JSON.stringify(value))
    // education.push({"uniname":"test","unicity":"yrtuy","degree":"dtyfguhkj","stream":"","unistartDate":"","uniendDate":""})


    showEducationData();
    getEducationData()
}

function showEducationData() {
    form.classList.add('hide-block')
    eduCard.classList.remove('hide-block')
}

function showEducationform() {
    console.log("showEducationData")
    form.classList.remove('hide-block')
    eduCard.classList.add('hide-block')
}

function removeEducation(e) {
    console.log("event ", e)
    const requiredIndex = education.findIndex(el => {
        return el.id === String(id);
    });
    if (requiredIndex === -1) {
        return false;
    };
    return !!arr.splice(requiredIndex, 1);
};

function getEducationData() {
    eduCard.innerHTML = ''
    // const education = {uniname: 'wertyu', unicity: 'ertyujk', degree: 'fvbnm,', stream: 'gvbhjnkm', unistartDate: '', uniendDate: ''}
    console.log(education)
    if (education) {
        education.forEach(e => {
            let edJson = JSON.stringify(e)
            console.log("json ", edJson)
            edu = JSON.parse(edJson)
            eduCard.innerHTML += `
    <div class="card education-card ">
        <div class="card-header">
            <h1>${edu.uniname}</h1>
            <div class="card-icons">
                <i class="fas fa-pen"></i>
                <i class="fas fa-trash delete-education" onclick="removeEducation()"></i>
            </div>
        </div>
        <div class="card-content">
            <p class="content">${edu.degree}</p>
            <p class="content">${edu.stream}</p>
            <p class="content year">${edu.unistartDate} - ${edu.uniendDate}</p>
        </div>
    </div>
    `;
        })
        eduCard.innerHTML += `
    
        <div class="add-new" onclick="showEducationform()">
            <i class="fas fa-plus"></i>
            <p>Add new degree</p>
        </div>
        <div class="continue-btn" data-tab="2">Continue</div>`
    } else {
        eduCard.innerHTML = `
    <div class="card education-card ">
        <div class="card-header">
            <h3>Add Education details</h3>
        </div>
    </div>
    <div class="add-new" onclick="showEducationform()">
        <i class="fas fa-plus"></i>
        <p>Add new degree</p>
    </div>
    `;
    }
}

// Experience block


deleteExperience.addEventListener('click', (e) => { console.log(e) })

function handleExperienceSubmit(event) {
    event.preventDefault();
    alert("handleExperienceSubmit",event)

    let data = new FormData(event.target);

    // Do a bit of work to convert the entries to a plain JS object
    let value = Object.fromEntries(data.entries());

    experience.push(value)
    console.log("testing ", experience)

    showExperienceData();
    getExperienceData()
}

function showExperienceData() {
    expForm.classList.add('hide-block')
    expCard.classList.remove('hide-block')
}

function showExperienceform() {
    console.log("showExperienceData")
    expForm.classList.remove('hide-block')
    expCard.classList.add('hide-block')
}

function removeExperience(e) {
    console.log("event ", e)
    const requiredIndex = experience.findIndex(el => {
        return el.id === String(id);
    });
    if (requiredIndex === -1) {
        return false;
    };
    return !!arr.splice(requiredIndex, 1);
};

function getExperienceData() {
    expCard.innerHTML = ''
    // const education = {uniname: 'wertyu', unicity: 'ertyujk', degree: 'fvbnm,', stream: 'gvbhjnkm', unistartDate: '', uniendDate: ''}
    console.log(experience)
    if (experience) {
        experience.forEach(e => {
            let edJson = JSON.stringify(e)
            console.log("json ", edJson)
            exp = JSON.parse(edJson)
            expCard.innerHTML += `
    <div class="card experience-card ">
        <div class="card-header">
            <h1>${exp.jobtitle}</h1>
            <div class="card-icons">
                <i class="fas fa-pen"></i>
                <i class="fas fa-trash delete-experience" onclick="removeExperience()"></i>
            </div>
        </div>
        <div class="card-content">
            <h3>${exp.employer}</h3>
            <p class="content">${exp.city}</p>
            <p class="content">${exp.country}</p>
            <p class="content year">${exp.eduStartDate} - ${exp.eduEndDate}</p>
        </div>
    </div>
    `;
        })
        expCard.innerHTML += `
    
        <div class="add-new" onclick="showExperienceform()">
            <i class="fas fa-plus"></i>
            <p>Add new degree</p>
        </div>
        <div class="continue-btn" data-tab="2">Continue</div>`
    } else {
        expCard.innerHTML = `
    <div class="card experience-card ">
        <div class="card-header">
            <h3>Add Experience details</h3>
        </div>
    </div>
    <div class="add-new" onclick="showExperienceform()">
        <i class="fas fa-plus"></i>
        <p>Add new degree</p>
    </div>
    `;
    }
}

// Skills JS

