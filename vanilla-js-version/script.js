// Application state
let characters = [];
let isModalOpen = false;
let selectedAvatar = '';
let selectedSkills = [];

const ASTRONAUT_AVATAR = 'https://m.media-amazon.com/images/I/41zouu-wH7L._UF894,1000_QL80_.jpg'
const KNIGHT_AVATAR = 'https://m.media-amazon.com/images/I/61LZCIZPtXL._UF894,1000_QL80_.jpg';
const WIZARD_AVATAR = 'https://m.media-amazon.com/images/I/71xW65+MeNL.jpg';


const AVATAR_OPTIONS = [
  { src: ASTRONAUT_AVATAR, hint: 'lego astronaut', label: 'Astronaut' },
  { src: KNIGHT_AVATAR, hint: 'lego knight', label: 'Knight' },
  { src: WIZARD_AVATAR, hint: 'lego wizard', label: 'Wizard' },
];

const SKILLS = ["Building", "Flying", "Magic", "Strength", "Technology", "Stealth"];

const SEED_CHARACTERS = [
    {
        id: 'seed-1',
        name: 'CosmoRon',
        skills: ['Technology', 'Flying', 'Stealth'],
        avatar: AVATAR_OPTIONS[0].src,
    },
    {
        id: 'seed-2',
        name: 'Sir Bricks-a-lot',
        skills: ['Building', 'Strength'],
        avatar: AVATAR_OPTIONS[1].src,
    },
    {
        id: 'seed-3',
        name: 'Wizbit',
        skills: ['Magic', 'Building'],
        avatar: AVATAR_OPTIONS[2].src,
    },
];

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainApp = document.getElementById('main-app');
const emptyState = document.getElementById('empty-state');
const characterGrid = document.getElementById('character-grid');
const modalOverlay = document.getElementById('modal-overlay');
const addCharacterBtn = document.getElementById('add-character-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelBtn = document.getElementById('cancel-btn');
const characterForm = document.getElementById('character-form');
const characterNameInput = document.getElementById('character-name');
const nameError = document.getElementById('name-error');
const avatarError = document.getElementById('avatar-error');
const skillsError = document.getElementById('skills-error');
const avatarOptions = document.getElementById('avatar-options');
const skillsOptions = document.getElementById('skills-options');

// Initialize the application
function init() {
    // Simulate loading time
    setTimeout(() => {
        loadApp();
    }, 1000);
}

function loadApp() {
    // Hide loading screen and show main app
    loadingScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    mainApp.classList.add('flex');

    // Load characters from localStorage or use seed data
    loadCharacters();
    
    // Set up event listeners
    setupEventListeners();
    
    // Generate avatar and skill options
    generateAvatarOptions();
    generateSkillOptions();
    
    // Render characters
    renderCharacters();
}

function loadCharacters() {
    try {
        const storedCharacters = localStorage.getItem('lego-characters');
        if (storedCharacters) {
            characters = JSON.parse(storedCharacters);
        } else {
            characters = [...SEED_CHARACTERS];
        }
    } catch (error) {
        console.error('Failed to parse characters from localStorage', error);
        characters = [...SEED_CHARACTERS];
    }
}

function saveCharacters() {
    localStorage.setItem('lego-characters', JSON.stringify(characters));
}

function setupEventListeners() {
    // Modal controls
    addCharacterBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Form submission
    characterForm.addEventListener('submit', handleFormSubmit);
}

function generateAvatarOptions() {
    avatarOptions.innerHTML = '';
    
    AVATAR_OPTIONS.forEach((avatar, index) => {
        const option = document.createElement('label');
        option.className = 'flex flex-col items-center justify-center rounded-md border-2 border-gray-300 p-2 cursor-pointer hover:bg-gray-50 avatar-option';
        option.innerHTML = `
            <input type="radio" name="avatar" value="${avatar.src}" class="sr-only" />
            <img src="${avatar.src}" width="80" height="80" alt="${avatar.label}" data-ai-hint="${avatar.hint}" class="mb-2 rounded-lg" />
            <span class="text-sm font-medium">${avatar.label}</span>
        `;
        
        const radioInput = option.querySelector('input[type="radio"]');
        radioInput.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedAvatar = e.target.value;
                updateAvatarSelection();
            }
        });
        
        avatarOptions.appendChild(option);
    });
}

function generateSkillOptions() {
    skillsOptions.innerHTML = '';
    
    SKILLS.forEach(skill => {
        const option = document.createElement('label');
        option.className = 'flex items-center space-x-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer skill-option';
        option.innerHTML = `
            <input type="checkbox" value="${skill}" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <span class="text-sm font-medium text-gray-700">${skill}</span>
        `;
        
        const checkbox = option.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedSkills.push(e.target.value);
            } else {
                selectedSkills = selectedSkills.filter(s => s !== e.target.value);
            }
        });
        
        skillsOptions.appendChild(option);
    });
}

function updateAvatarSelection() {
    document.querySelectorAll('.avatar-option').forEach(option => {
        const isSelected = option.querySelector('input').value === selectedAvatar;
        if (isSelected) {
            option.classList.remove('border-gray-300');
            option.classList.add('border-blue-500', 'bg-blue-50');
        } else {
            option.classList.remove('border-blue-500', 'bg-blue-50');
            option.classList.add('border-gray-300');
        }
    });
}

function openModal() {
    isModalOpen = true;
    modalOverlay.classList.remove('hidden');
    resetForm();
}

function closeModal() {
    isModalOpen = false;
    modalOverlay.classList.add('hidden');
    resetForm();
}

function resetForm() {
    characterNameInput.value = '';
    selectedAvatar = '';
    selectedSkills = [];
    
    // Reset radio buttons
    document.querySelectorAll('input[name="avatar"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset visual selections
    updateAvatarSelection();
    
    // Hide error messages
    hideErrors();
}

function hideErrors() {
    nameError.classList.add('hidden');
    avatarError.classList.add('hidden');
    skillsError.classList.add('hidden');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = characterNameInput.value.trim();
    const errors = {};
    
    // Validation
    if (name.length < 2) {
        errors.name = 'Name must be at least 2 characters.';
    }
    
    if (!selectedAvatar) {
        errors.avatar = 'You need to select an avatar.';
    }
    
    if (selectedSkills.length === 0) {
        errors.skills = 'You must select at least one skill.';
    }
    
    // Show errors
    hideErrors();
    if (errors.name) {
        nameError.textContent = errors.name;
        nameError.classList.remove('hidden');
    }
    if (errors.avatar) {
        avatarError.textContent = errors.avatar;
        avatarError.classList.remove('hidden');
    }
    if (errors.skills) {
        skillsError.textContent = errors.skills;
        skillsError.classList.remove('hidden');
    }
    
    // If no errors, create character
    if (Object.keys(errors).length === 0) {
        const newCharacter = {
            id: `char_${new Date().getTime()}`,
            name: name,
            skills: [...selectedSkills],
            avatar: selectedAvatar
        };
        
        characters.unshift(newCharacter);
        saveCharacters();
        renderCharacters();
        closeModal();
    }
}

function deleteCharacter(characterId) {
    characters = characters.filter(char => char.id !== characterId);
    saveCharacters();
    renderCharacters();
}

function renderCharacters() {
    if (characters.length === 0) {
        emptyState.classList.remove('hidden');
        characterGrid.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        characterGrid.classList.remove('hidden');
        
        characterGrid.innerHTML = '';
        
        characters.forEach(character => {
            const card = createCharacterCard(character);
            characterGrid.appendChild(card);
        });
    }
}

function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-lg overflow-hidden character-card relative';
    
    card.innerHTML = `
        <button 
            class="absolute top-3 right-3 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg delete-btn z-10" 
            title="Delete character"
            onclick="deleteCharacter('${character.id}')"
        >
            ✕
        </button>
        
        <div class="aspect-square w-full overflow-hidden">
            <img
                src="${character.avatar}"
                alt="Avatar of ${character.name}"
                width="300"
                height="300"
                class="h-full w-full object-cover"
                data-ai-hint="lego character"
            />
        </div>
        <div class="p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-2">
                ${character.name}
            </h3>
            <div class="flex flex-wrap gap-2">
                ${character.skills.map(skill => 
                    `<span class="px-2 py-1 text-xs font-medium bg-yellow-200 text-gray-800 rounded-full">${skill}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Make deleteCharacter available globally for onclick handlers
window.deleteCharacter = deleteCharacter;

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);
