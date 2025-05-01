// Display phones
const showPhones = (phonesData, isNewSearch) => {
    // Slice first 6 phones data
    const slicedPhones = phonesData.slice(0,6);

    const phoneContainer = document.getElementById('products-container');

    // Assign data which need to show
    let phones = isNewSearch ? slicedPhones : phonesData;

    // Show/Hide Show All Button
    if(phonesData.length <= 6 || phones.length > 6) {
        document.getElementById('show-all-btn').classList.add('hidden');
        // Skip first 6 phones as already displayed 
        if(!isNewSearch) phones = phones.slice(6, Math.min(phones.length,30));
    }
    else {
        document.getElementById('show-all-btn').classList.remove('hidden');
    }

    // Display Phones
    phones.forEach(phone => {
        phoneContainer.innerHTML += `
        <div class="card">
            <figure class="flex items-center justify-center">
                <img
                    src="${phone.image}"
                    alt="${phone.slug}"
                    class="rounded-xl h-[300px] w-[200px]" />
            </figure>
            <div class="flex flex-col items-center text-center">
                <h2
                    class="text-[25px] font-bold text-[#403F3F] mt-[25px] mb-3">
                    ${phone.phone_name}
                </h2>
                <p
                    class="text-base font-normal leading-[28px] text-[#706F6F] mb-2">
                    There are many variations of passages of
                    available, but the majority have suffered
                </p>
                <p
                    class="text-[25px] font-semibold text-[#403F3F] mb-4">
                    $999.00
                </p>
                <div>
                    <button onclick="showSpecificPhoneDetails('${phone.slug}')" class="outline-none hover:ring-2 hover:ring-offset-2 cursor-pointer text-[18px] font-medium text-white bg-[#0D6EFD] rounded-lg px-[25px] py-[6px]">
                        Show Details
                    </button>
                </div>
            </div>
        </div>
        `
    });
    document.getElementById('loading-snipper').classList.add('hidden');
    document.getElementById('loading-snipper-2').classList.add('hidden');
}

// Fetch data using API
const loadPhones = async (isNewSearch = 1, searchText = 'iphone') => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phones = data.data;
    showPhones(phones,isNewSearch)
}

// Handle search phones
document.getElementById('search-btn').addEventListener('click', function(){
    const searchText = document.getElementById('search-field').value;
    if(searchText !== '') {
        document.getElementById('loading-snipper').classList.remove('hidden');
        document.getElementById('products-container').innerText = '';
        loadPhones(1,searchText);
    }
});

// Handle show all phones
document.getElementById('show-all-btn').addEventListener('click', function(){
    document.getElementById('loading-snipper-2').classList.remove('hidden');
    const searchText = document.getElementById('search-field').value;
    if(searchText === '') loadPhones(0,'iphone');
    else loadPhones(0,searchText);
});

// Display Single Phone Details in Modal
const displayPhoneDetailsInModal =  (phone) => {
    document.getElementById('modal-card').innerHTML = `
    <div class="card-modal p-[20px] md:p-[40px]">
        <figure class="pt-[40px] pb-[20px] flex items-center justify-center bg-[rgba(13,110,253,0.05)] mb-[40px]">
            <img src="${phone.image}" alt="${phone.slug}" class="rounded-xl h-[380px] w-[268px]" />
        </figure>
        <div class="flex flex-col">
            <h2 class="text-[20px] md:text-[24px] lg:text-[30px] font-bold text-[#403F3F] mb-6">${phone.name}</h2>
            <p class="text-base font-normal leading-[26px] text-[#706F6F] mb-5">It is a long established fact that a reader will
                be distracted by the readable content of a page
                when looking at its layout.</p>
            <div class="modal-card-details text-base md:text-[18px] lg:text-[20px]">
                <p>Storage : <span class="font-normal">${phone?.mainFeatures?.storage || 'Data not found'}</span></p>
                <p>Display Size : <span class="font-normal">${phone?.mainFeatures?.displaySize || 'Data not found'}</span></p>
                <p>Chipset : <span class="font-normal">${phone?.mainFeatures?.chipSet || 'Data not found'}</span></p>
                <p>Memory : <span class="font-normal">${phone?.mainFeatures?.memory || 'Data not found'}</span></p>
                <p>Slug : <span class="font-normal">${phone.slug || 'Data not found'}</span></p>
                <p>Release data : <span class="font-normal">${phone.releaseDate || 'Data not found'}</span></p>
                <p>Brand : <span class="font-normal">${phone.brand || 'Data not found'}</span></p>
                <p class="mb-10">GPS : <span class="font-normal"    >${phone?.others?.GPS || 'Data not found'}</span></p>
            </div>
            <div class="text-right">
                <button onclick="closeModal()" class="outline-none hover:ring-2 hover:ring-offset-2 cursor-pointer text-[18px] font-medium text-white bg-[#DC3545] rounded-lg px-[25px] py-[6px]">Close
                </button>
            </div>
        </div>
    </div>
    `
    document.getElementById('modal-card').classList.replace('hidden','flex');
}

// Fetch Single Phone Data using API
const showSpecificPhoneDetails = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phone = data.data;
    displayPhoneDetailsInModal(phone);
}

// Handle preload phones before search
loadPhones();

const scrollToSection = () => {
    document.getElementById("search-section").scrollIntoView({ behavior: "smooth" });
}

// Close Modal by clicking close button
const closeModal = () => {
    document.getElementById('modal-card').innerText = '';
    document.getElementById('modal-card').classList.replace('flex','hidden');
}
// Click Outside of modal box to close it
document.getElementById('modal-card').addEventListener('click', function(event){
    if (event.target.id === 'modal-card') {
        closeModal();
    }
});
// Press 'ESC' to close modal
document.addEventListener('keyup', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});