async function getContacts() {
  try {
    const response = await fetch("http://localhost:5100/Home/Ofera");
    if (!response.ok) {
      throw new Error("Eroare la preluarea datelor!");
    }
    const data = await response.json();
    displayContacts(data);
  } catch (error) {
    console.error("Eroare:", error);
  }
}

function displayContacts(contacts) {
  let container = document.getElementById("contactsContainer");
  container.innerHTML = "";

  contacts.forEach((contact) => {
    let contactCard = document.createElement("div");
    contactCard.classList.add("contact-card");
    contactCard.innerHTML = `
        <h3>${contact.name}</h3>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Mesaj:</strong> ${contact.description}</p>
      `;
    container.appendChild(contactCard);
  });
}

document.addEventListener("DOMContentLoaded", getContacts);

document
  .getElementById("uploadImage")
  .addEventListener("change", async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    let formData = new FormData();
    formData.append("file", file);

    try {
      let response = await fetch("http://localhost:5000/home/GETIMG", {
        method: "POST",
        body: formData,
      });

      let data = await response.json();
      console.log("Imagine încărcată, ID:", data.id);
    } catch (error) {
      console.error("Eroare la încărcare:", error);
    }
  });

async function fetchImages() {
  let response = await fetch("http://localhost:5000/api/get-all");
  let images = await response.json();

  let gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  images.forEach((image) => {
    let imgElement = document.createElement("img");
    imgElement.src = `data:image/png;base64,${image.ImageBase64}`;
    imgElement.style.width = "200px";
    gallery.appendChild(imgElement);
  });
}

document.addEventListener("DOMContentLoaded", fetchImages);
