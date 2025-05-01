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
                    <button class="cursor-pointer text-[18px] font-medium text-white bg-[#0D6EFD] rounded-lg px-[25px] py-[6px]">
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
    document.getElementById('loading-snipper').classList.remove('hidden');
    document.getElementById('products-container').innerText = '';
    const searchText = document.getElementById('search-field').value;
    loadPhones(1,searchText);
});

// Handle show all phones
document.getElementById('show-all-btn').addEventListener('click', function(){
    document.getElementById('loading-snipper-2').classList.remove('hidden');
    const searchText = document.getElementById('search-field').value;
    if(searchText == '') loadPhones(0,'iphone');
    else loadPhones(0,searchText);
});

// Handle preload phones before search
loadPhones();