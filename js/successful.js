async function fetchSuccessfulData() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwiqJJPzn9RIH2-1QJChwQdTAcVgns0Vk9O4Kcos3EYmwDoY1p-qCOqqykfeCYb-z8A2Q/exec");
        const data = await response.json();

        console.log("API Response:", data); // เช็คข้อมูลที่ API ส่งมา

        if (Array.isArray(data)) { 
            displaySuccessful(data); // ใช้ data ตรงๆ
        } else {
            console.error("รูปแบบข้อมูลไม่ถูกต้อง", data);
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
}

// ฟังก์ชันแสดงข่าวสาร
function displaySuccessful(data) {
    const successfulListElement = document.querySelector(".successful-list");
    if (!successfulListElement) return;

    successfulListElement.innerHTML = "";data.forEach((successful) => {
        const listItem = document.createElement("li");
        listItem.className = "successful-item";

        listItem.innerHTML = `
            <div class="successful-image"  style=" cursor: pointer; " onclick="window.location.href='${successful.link}'">
                <img src="${successful.image}" alt="${successful.title}">
            </div>
            <div class="successful-details"  onclick="window.location.href='${successful.link}'">
                <h3 class="successful-title"  style=" cursor: pointer; ">${successful.title}</h3>
                <p class="successful-date" style=" cursor: pointer; ">วันที่ ${successful.date}</p> <!-- ใช้วันที่ตรงๆ -->
                <p class="successful-content"  style=" cursor: pointer; ">${successful.content} <a href="${successful.link}" class="successful-link">อ่านเพิ่มเติม...</a></p>
            </div>
        `;

        successfulListElement.appendChild(listItem);
    });
}

window.onload = () => {
    fetchSuccessfulData();
};
