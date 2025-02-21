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


window.onload = () => {
    // แสดง Loader ตอนแรก
    document.getElementById("loader").style.display = "block";
    document.getElementById("re-load").style.display = "none";

    // โหลดข้อมูล
    fetchSuccessfulData().then(() => {
        // ซ่อน Loader และแสดงเนื้อหา
        document.getElementById("loader").style.display = "none";
        document.getElementById("re-load").style.display = "block";
    });
};

// ตัวอย่างฟังก์ชันโหลดข้อมูล (สมมติใช้ fetch API)
function fetchSuccessfulData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Data loaded!");
            resolve();
        }, 2000); // จำลองโหลดข้อมูล 2 วินาที
    });
}
