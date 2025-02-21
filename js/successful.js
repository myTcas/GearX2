async function fetchSuccessfulData() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbyHOaFAOeK1Rd2K-ba4FA4xm7ZedGLzLDKa_Xa213fxJS0KbFPC9WOCLO9kPBPyR9L2/exec");
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
            <div class="successful-details">
                <h3 class="successful-title"  style=" cursor: pointer; ">${successful.title}</h3>
                <p class="successful-date" style=" cursor: pointer; ">วันที่ ${successful.date}</p> <!-- ใช้วันที่ตรงๆ -->
            </div>
        `;

        successfulListElement.appendChild(listItem);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    fetchSuccessfulData();
});
