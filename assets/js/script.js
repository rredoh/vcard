'use strict';

// Populate dynamic data from data.js
function populateProfileData() {
  // Sidebar
  const nameEl = document.querySelector(".name");
  if (nameEl) {
    nameEl.textContent = profileData.shortName;
    nameEl.setAttribute("title", profileData.name);
  }
  
  const titleEl = document.querySelector(".title");
  if (titleEl) titleEl.textContent = profileData.title;

  const avatarEl = document.querySelector(".avatar-box img");
  if (avatarEl) {
    avatarEl.src = profileData.avatar;
    avatarEl.alt = profileData.name;
  }

  const emailEl = document.querySelector(".contact-link[href^='mailto:']");
  if (emailEl) {
    emailEl.href = `mailto:${profileData.contacts.email}`;
    emailEl.textContent = profileData.contacts.email;
  }

  const birthdayEl = document.querySelector("[data-birthday]");
  if (birthdayEl) {
    birthdayEl.setAttribute("datetime", profileData.contacts.birthday);
    birthdayEl.textContent = profileData.contacts.birthdayFormatted;
  }

  const locationEl = document.querySelector("address");
  if (locationEl) locationEl.textContent = profileData.contacts.location;

  const linkedinEl = document.querySelector(".social-link");
  if (linkedinEl) linkedinEl.href = profileData.contacts.linkedin;

  // About paragraphs
  const aboutSec = document.querySelector(".about-text");
  if (aboutSec) {
    aboutSec.innerHTML = profileData.about.map(para => `<p>${para}</p>`).join('\n');
  }

  // Services
  const servicesList = document.getElementById("services-list");
  if (servicesList) {
    servicesList.innerHTML = profileData.services.map(service => `
      <li class="service-item">
        <div class="service-icon-box">
          <img src="${service.icon}" alt="${service.alt}" width="40">
        </div>
        <div class="service-content-box">
          <h4 class="h4 service-item-title">${service.title}</h4>
          <p class="service-item-text">${service.description}</p>
        </div>
      </li>
    `).join('\n');
  }

  // Education
  const educationList = document.getElementById("education-list");
  if (educationList) {
    educationList.innerHTML = profileData.education.map(edu => `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${edu.title}</h4>
        <span>${edu.date}</span>
        <p class="timeline-text">${edu.description}</p>
      </li>
    `).join('\n');
  }

  // Experience
  const experienceList = document.getElementById("experience-list");
  if (experienceList) {
    experienceList.innerHTML = profileData.experience.map(exp => `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${exp.title}</h4>
        <span>${exp.date}</span>
        <p class="timeline-text">${exp.description}</p>
      </li>
    `).join('\n');
  }

  // Skills
  const skillsList = document.getElementById("skills-list");
  if (skillsList) {
    skillsList.innerHTML = profileData.skills.map(skill => `
      <li class="skills-item">
        <h5 class="h5">${skill.name}</h5>
      </li>
    `).join('\n');
  }

  // Testimonials
  const testimonialsList = document.getElementById("testimonials-list");
  if (testimonialsList) {
    testimonialsList.innerHTML = profileData.testimonials.map(t => `
      <li class="testimonials-item">
        <div class="content-card" data-testimonials-item>
          <figure class="testimonials-avatar-box">
            <img src="${t.avatar}" alt="${t.name}" width="60" data-testimonials-avatar>
          </figure>
          <h4 class="h4 testimonials-item-title" data-testimonials-title>${t.name}</h4>
          <div class="testimonials-text" data-testimonials-text>
            <p>${t.text}</p>
          </div>
        </div>
      </li>
    `).join('\n');
  }

  // Projects (Portfolio)
  const projectList = document.getElementById("project-list");
  if (projectList) {
    projectList.innerHTML = profileData.projects.map(project => `
      <li class="project-item active" data-filter-item data-category="${project.category.toLowerCase()}">
        <a href="#">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${project.image}" alt="${project.title.toLowerCase()}" loading="lazy">
          </figure>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
        </a>
      </li>
    `).join('\n');
  }

  // Blogs
  const blogList = document.getElementById("blog-posts-list");
  if (blogList) {
    blogList.innerHTML = profileData.blogs.map(blog => `
      <li class="blog-post-item">
        <a href="#">
          <figure class="blog-banner-box">
            <img src="${blog.image}" alt="${blog.title}" loading="lazy">
          </figure>
          <div class="blog-content">
            <div class="blog-meta">
              <p class="blog-category">${blog.category}</p>
              <span class="dot"></span>
              <time datetime="${blog.date}">${blog.dateFormatted}</time>
            </div>
            <h3 class="h3 blog-item-title">${blog.title}</h3>
            <p class="blog-text">${blog.text}</p>
          </div>
        </a>
      </li>
    `).join('\n');
  }
}

// Initialize dynamic data
populateProfileData();



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}