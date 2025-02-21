

window.onload = async () => {
    // แสดง Loader ตอนแรก
    document.getElementById("loader").style.display = "block";
    document.getElementById("re-load").style.display = "none";

    try {
        await fetchSuccessfulData(); // รอให้ข้อมูลโหลดเสร็จ

        // ซ่อน Loader และแสดงเนื้อหา
        document.getElementById("loader").style.display = "none";
        document.getElementById("re-load").style.display = "block";
    } catch (error) {
        console.error("โหลดข้อมูลล้มเหลว:", error);
    }
};

async function fetchSuccessfulData() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbyHOaFAOeK1Rd2K-ba4FA4xm7ZedGLzLDKa_Xa213fxJS0KbFPC9WOCLO9kPBPyR9L2/exec");
        const data = await response.json();

        console.log("API Response:", data);

        if (Array.isArray(data)) { 
            displaySuccessful(data);
        } else {
            console.error("รูปแบบข้อมูลไม่ถูกต้อง", data);
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        throw error; // แจ้งว่าโหลดข้อมูลไม่สำเร็จ
    }
}

function displaySuccessful(data) {
    const successfulListElement = document.querySelector(".successful-list");
    if (!successfulListElement) return;

    successfulListElement.innerHTML = "";
    data.forEach((successful) => {
        const listItem = document.createElement("li");
        listItem.className = "successful-item";
        listItem.innerHTML = `
            <div class="successful-details">
                <h3 class="successful-title" style="cursor: pointer;">${successful.title}</h3>
                <p class="successful-date" style="cursor: pointer;">วันที่ ${successful.date}</p>
            </div>
        `;
        successfulListElement.appendChild(listItem);
    });
}
