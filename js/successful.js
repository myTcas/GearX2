window.onload = async () => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("re-load");

    // แสดง Loader ตอนแรก
    loader.style.opacity = "1";
    content.style.display = "none";

    try {
        await fetchSuccessfulData(); // โหลดข้อมูลจาก API

        // เริ่มทำให้ Loader จางหาย
        loader.classList.add("hidden");

        // รอให้ effect จางหายเสร็จ (0.5s) แล้วซ่อน
        setTimeout(() => {
            loader.style.display = "none";
            content.style.display = "block"; // แสดงเนื้อหา
        }, 500);
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
        throw error;
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
