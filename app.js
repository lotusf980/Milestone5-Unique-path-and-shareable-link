var _a, _b;
// Form Elements
var nameInputField = document.getElementById("name");
var emailInputField = document.getElementById("email");
var educationInputField = document.getElementById("education");
var skillsInputField = document.getElementById("skills");
var photoInputField = document.getElementById("photo");
// Preview Elements
var previewName = document.getElementById("preview-name");
var previewEmail = document.getElementById("preview-email");
var previewEducation = document.getElementById("preview-education");
var previewSkills = document.getElementById("preview-skills");
var previewPhoto = document.getElementById("preview-photo");
var shareableLinkInput = document.getElementById("shareable-link");
var copyLinkButton = document.getElementById("copy-link");
// Function to update the resume preview
function updatePreview() {
    if (nameInputField && previewName) {
        previewName.textContent = nameInputField.value;
    }
    if (emailInputField && previewEmail) {
        previewEmail.textContent = emailInputField.value;
    }
    if (educationInputField && previewEducation) {
        previewEducation.textContent = educationInputField.value;
    }
    if (skillsInputField && previewSkills) {
        var skills = skillsInputField.value
            .split(",")
            .map(function (skill) { return skill.trim(); })
            .join(", ");
        previewSkills.textContent = skills;
    }
}
// Function to update the photo in the resume preview
function updatePhoto(event) {
    var _a;
    var target = event.target;
    var file = (_a = target === null || target === void 0 ? void 0 : target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file && previewPhoto) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) {
                previewPhoto.src = e.target.result;
                previewPhoto.style.display = "block";
            }
        };
        reader.readAsDataURL(file);
    }
    else if (previewPhoto) {
        previewPhoto.style.display = "none";
    }
}
// Attach event listeners
(_a = document.getElementById("generate-resume")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", updatePreview);
photoInputField === null || photoInputField === void 0 ? void 0 : photoInputField.addEventListener("change", updatePhoto);
// Make preview elements editable
[previewName, previewEmail, previewEducation, previewSkills].forEach(function (element) {
    if (element) {
        element.contentEditable = "true";
    }
});
// Helper to generate a unique ID
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9); // Example: 'ab12cd34e'
}
// Save resume data
function saveResumeData(id) {
    var resumeData = {
        name: (nameInputField === null || nameInputField === void 0 ? void 0 : nameInputField.value) || "",
        email: (emailInputField === null || emailInputField === void 0 ? void 0 : emailInputField.value) || "",
        education: (educationInputField === null || educationInputField === void 0 ? void 0 : educationInputField.value) || "",
        skills: (skillsInputField === null || skillsInputField === void 0 ? void 0 : skillsInputField.value) || "",
        photo: (previewPhoto === null || previewPhoto === void 0 ? void 0 : previewPhoto.src) || "",
    };
    localStorage.setItem(id, JSON.stringify(resumeData));
}
// Load resume data
function loadResumeData(id) {
    var savedData = localStorage.getItem(id);
    if (savedData) {
        var data = JSON.parse(savedData);
        if (previewName)
            previewName.textContent = data.name;
        if (previewEmail)
            previewEmail.textContent = data.email;
        if (previewEducation)
            previewEducation.textContent = data.education;
        if (previewSkills)
            previewSkills.textContent = data.skills;
        if (previewPhoto && data.photo) {
            previewPhoto.src = data.photo;
            previewPhoto.style.display = "block";
        }
    }
}
// Generate resume and shareable link
(_b = document.getElementById("generate-resume")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var uniqueId = generateUniqueId();
    saveResumeData(uniqueId);
    var shareableLink = "".concat(window.location.origin).concat(window.location.pathname, "?id=").concat(uniqueId);
    if (shareableLinkInput) {
        shareableLinkInput.value = shareableLink;
    }
});
// Copy link to clipboard
copyLinkButton === null || copyLinkButton === void 0 ? void 0 : copyLinkButton.addEventListener("click", function () {
    if (shareableLinkInput) {
        shareableLinkInput.select();
        document.execCommand("copy");
        alert("Link copied to clipboard!");
    }
});
// Load resume if ID exists in URL
var urlParams = new URLSearchParams(window.location.search);
var resumeId = urlParams.get("id");
if (resumeId) {
    loadResumeData(resumeId);
}
