async function fetchNewsData() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwcyXIoRfS7KZATV5LAHZ58lvWrCRfem02k9MjEPyajVsDinHp4ekHqn5l3ZrKi8_0X/exec");
        
        if (!response.ok) {
            throw new Error(`เกิดข้อผิดพลาด: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data)) { 
            displayNews(data);
        } else {
            console.error("รูปแบบข้อมูลไม่ถูกต้อง", data);
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
}

function displayNews(data) {
    const newsListElement = document.querySelector(".news-list");
    if (!newsListElement) return;

    newsListElement.innerHTML = "";
    data.forEach((news) => {
        const listItem = document.createElement("li");
        listItem.className = "news-item";
        listItem.innerHTML = `
            <div class="news-details" onclick="window.location.href='${encodeURI(news.link)}'">
                <h3 class="news-title">${news.title}</h3>
                <p class="news-content">${news.content} <a href="${encodeURI(news.link)}" class="news-link">อ่านเพิ่มเติม...</a></p>
                <p class="news-date">${news.date}</p>
            </div>
        `;
        newsListElement.appendChild(listItem);
    });
}

// เรียกใช้งานฟังก์ชันเมื่อโหลดหน้าเว็บ
fetchNewsData();
