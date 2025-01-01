// Form Elements
const nameInputField = document.getElementById("name") as HTMLInputElement | null;
const emailInputField = document.getElementById("email") as HTMLInputElement | null;
const educationInputField = document.getElementById("education") as HTMLTextAreaElement | null;
const skillsInputField = document.getElementById("skills") as HTMLInputElement | null;
const photoInputField = document.getElementById("photo") as HTMLInputElement | null;

// Preview Elements
const previewName = document.getElementById("preview-name") as HTMLElement | null;
const previewEmail = document.getElementById("preview-email") as HTMLElement | null;
const previewEducation = document.getElementById("preview-education") as HTMLElement | null;
const previewSkills = document.getElementById("preview-skills") as HTMLElement | null;
const previewPhoto = document.getElementById("preview-photo") as HTMLImageElement | null;

const shareableLinkInput = document.getElementById("shareable-link") as HTMLInputElement | null;
const copyLinkButton = document.getElementById("copy-link") as HTMLButtonElement | null;


// Function to update the resume preview
function updatePreview(): void {
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
        const skills = skillsInputField.value
            .split(",")
            .map((skill) => skill.trim())
            .join(", ");
        previewSkills.textContent = skills;
    }
}

// Function to update the photo in the resume preview
function updatePhoto(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0];
    if (file && previewPhoto) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                previewPhoto.src = e.target.result as string;
                previewPhoto.style.display = "block";
            }
        };
        reader.readAsDataURL(file);
    } else if (previewPhoto) {
        previewPhoto.style.display = "none";
    }
}

// Attach event listeners
document.getElementById("generate-resume")?.addEventListener("click", updatePreview);
photoInputField?.addEventListener("change", updatePhoto);


// Make preview elements editable
[previewName, previewEmail, previewEducation, previewSkills].forEach((element) => {
    if (element) {
        element.contentEditable = "true";
    }
});

// Helper to generate a unique ID
function generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9); // Example: 'ab12cd34e'
}

// Save resume data
function saveResumeData(id: string): void {
    const resumeData = {
        name: nameInputField?.value || "",
        email: emailInputField?.value || "",
        education: educationInputField?.value || "",
        skills: skillsInputField?.value || "",
        photo: previewPhoto?.src || "",
    };
    localStorage.setItem(id, JSON.stringify(resumeData));
}

// Load resume data
function loadResumeData(id: string): void {
    const savedData = localStorage.getItem(id);
    if (savedData) {
        const data = JSON.parse(savedData);
        if (previewName) previewName.textContent = data.name;
        if (previewEmail) previewEmail.textContent = data.email;
        if (previewEducation) previewEducation.textContent = data.education;
        if (previewSkills) previewSkills.textContent = data.skills;
        if (previewPhoto && data.photo) {
            previewPhoto.src = data.photo;
            previewPhoto.style.display = "block";
        }
    }
}

// Generate resume and shareable link
document.getElementById("generate-resume")?.addEventListener("click", () => {
    const uniqueId = generateUniqueId();
    saveResumeData(uniqueId);

    const shareableLink = `${window.location.origin}${window.location.pathname}?id=${uniqueId}`;
    if (shareableLinkInput) {
        shareableLinkInput.value = shareableLink;
    }
});

// Copy link to clipboard
copyLinkButton?.addEventListener("click", () => {
    if (shareableLinkInput) {
        shareableLinkInput.select();
        document.execCommand("copy");
        alert("Link copied to clipboard!");
    }
});

// Load resume if ID exists in URL
const urlParams = new URLSearchParams(window.location.search);
const resumeId = urlParams.get("id");
if (resumeId) {
    loadResumeData(resumeId);
}
