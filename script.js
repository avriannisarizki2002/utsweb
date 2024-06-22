// Fungsi untuk membuat tombol edit
function createEditButton() {
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    return editButton;
}

// Fungsi untuk membuat tombol delete
function createDeleteButton() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    return deleteButton;
}

// Fungsi untuk menangani pengeditan data
function editData(event) {
    var row = event.target.parentElement.parentElement; // Mendapatkan baris tabel yang sesuai
    var cells = row.querySelectorAll('td'); //Mendapatkan semua sel dalam baris

    // Mengisi field form dengan data yang ada saat ini
    document.getElementById('full-name').value = cells[0].textContent;
    document.getElementById('email').value = cells[1].textContent;
    document.getElementById('phone').value = cells[2].textContent;
    document.getElementById('birthdate').value = cells[3].textContent;
    var gender = cells[4].textContent;
    document.querySelector('input[name="gender"][value="' + gender + '"]').checked = true;
    var address = cells[5].textContent.split(', ');
    document.getElementById('street-address').value = address[0];
    document.getElementById('apt-suite').value = address[1] || '';
    document.getElementById('city').value = address[2];
    document.getElementById('state').value = address[3];
    document.getElementById('zip-code').value = address[4];

    // Menghapus baris dari tabel
    row.remove();
}

// Fungsi untuk menangani penghapusan data
function deleteData(event) {
    var row = event.target.parentElement.parentElement; // Mendapatkan baris tabel yang sesuai
    row.remove(); //Menghapus baris dari tabel
}

// Menambahkan event listener untuk menangani submit form
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dikirim secara default

    // Mendapatkan nilai-nilai dari form
    var fullName = document.getElementById('full-name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var birthDate = document.getElementById('birthdate').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var streetAddress = document.getElementById('street-address').value;
    var aptSuite = document.getElementById('apt-suite').value;
    var country = document.getElementById('country').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var zipCode = document.getElementById('zip-code').value;

    // Membuat baris baru untuk tabel
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${fullName}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${birthDate}</td>
        <td>${gender}</td>
        <td>${streetAddress}, ${aptSuite}, ${city}, ${state}, ${zipCode}</td>
        <td></td>
    `;

    // Membuat tombol edit dan delete
    var editButton = createEditButton();
    var deleteButton = createDeleteButton();

    // Menambahkan tombol ke dalam baris
    newRow.lastElementChild.appendChild(editButton);
    newRow.lastElementChild.appendChild(deleteButton);

    // Menambahkan baris ke dalam badan tabel
    var tableBody = document.getElementById('data-body');
    tableBody.appendChild(newRow);

    // Menampilkan data yang dikirim
    document.getElementById('submitted-data').style.display = 'block';

    // Mengosongkan field form
    document.getElementById('registration-form').reset();
});

// Delegasi event untuk menangani klik tombol edit dan delete
document.getElementById('submitted-data').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        editData(event); // Panggil fungsi editData jika tombol edit diklik
    } else if (event.target.classList.contains('delete-button')) {
        deleteData(event); // Panggil fungsi deleteData jika tombol delete diklik
    }
});
