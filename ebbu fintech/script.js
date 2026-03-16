// Initialize some sample data if the directory is empty
const defaultBusinesses = [
    {
        name: "Philisaint Poultry Farm",
        category: "Poultry Farm",
        location: "Abakaliki, Ebonyi",
        products: "Eggs, Broilers, Layers",
        phone: "+2348030001111"
    },
    {
        name: "Aba Fashion Hub",
        category: "Fashion & Design",
        location: "Ariaria, Aba",
        products: "Men's Suits, Traditional Wear, Repairs",
        phone: "+2348123456789"
    },
    {
        name: "Ebonyi Rice Millers",
        category: "Agro-Processing",
        location: "Industrial Layout, Abakaliki",
        products: "Stone-free Rice, Parboiled Rice, Bran",
        phone: "+2349012345678"
    }
];

// Function to get businesses from localStorage
function getBusinesses() {
    const businesses = localStorage.getItem('local_businesses');
    if (!businesses) {
        // If nothing is stored, save the defaults and return them
        localStorage.setItem('local_businesses', JSON.stringify(defaultBusinesses));
        return defaultBusinesses;
    }
    return JSON.parse(businesses);
}

// Function to save a new business
function saveBusiness(business) {
    const businesses = getBusinesses();
    businesses.unshift(business); // Add new business to the top
    localStorage.setItem('local_businesses', JSON.stringify(businesses));
}

// Registration Form Logic
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newBusiness = {
            name: document.getElementById('businessName').value,
            category: document.getElementById('category').value,
            location: document.getElementById('location').value,
            products: document.getElementById('products').value,
            phone: document.getElementById('phone').value
        };

        saveBusiness(newBusiness);
        
        // Show success message and clear form
        registerForm.reset();
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            window.location.href = 'listings.html';
        }, 1500);
    });
}

// Listing Page Logic
function renderBusinesses(filter = "") {
    const listingsContainer = document.getElementById('businessListings');
    if (!listingsContainer) return;

    const businesses = getBusinesses();
    const searchTerm = filter.toLowerCase();

    const filtered = businesses.filter(biz => 
        biz.name.toLowerCase().includes(searchTerm) ||
        biz.category.toLowerCase().includes(searchTerm) ||
        biz.location.toLowerCase().includes(searchTerm) ||
        biz.products.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
        listingsContainer.innerHTML = `<p style="text-align: center; color: #6b7280; grid-column: 1/-1;">No businesses found matching "${filter}"</p>`;
        return;
    }

    listingsContainer.innerHTML = filtered.map(biz => `
        <div class="card business-card">
            <h3>${biz.name}</h3>
            <p><strong>📍 Location:</strong> ${biz.location}</p>
            <p><strong>📦 Category:</strong> ${biz.category}</p>
            <p><strong>🏷️ Products:</strong> ${biz.products}</p>
            <div class="contact-links">
                <a href="tel:${biz.phone}" class="btn btn-secondary">📞 Call</a>
                <a href="https://wa.me/${biz.phone.replace(/\D/g,'')}" target="_blank" class="btn" style="background-color: #25d366;">💬 WhatsApp</a>
            </div>
        </div>
    `).join('');
}

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

if (searchInput) {
    searchBtn.addEventListener('click', () => {
        renderBusinesses(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            renderBusinesses(searchInput.value);
        }
    });
}

// Initial render if on listings page
if (document.getElementById('businessListings')) {
    renderBusinesses();
}
