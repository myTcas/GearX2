        window.onload = async () => {
            const loader = document.getElementById("loader");
            const content = document.getElementById("re-load");

            // แสดง Loader ตอนแรก
            loader.style.opacity = "1";
            content.style.display = "none";

            try {
                await Promise.all([fetchSuccessfulData(), fetchNewsData()]); // โหลดข้อมูลจาก API ทั้ง 2 อัน

                // เริ่มทำให้ Loader จางหาย
                loader.style.opacity = "0";

                // รอให้ effect จางหายเสร็จ (0.5s) แล้วซ่อน
                setTimeout(() => {
                    loader.style.opacity = "0";
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
                        <h3 class="successful-title">${successful.title}</h3>
                        <p class="successful-date">วันที่ ${successful.date}</p>
                    </div>
                `;
                successfulListElement.appendChild(listItem);
            });
        }

        async function fetchNewsData() {
            try {
                const response = await fetch("https://script.google.com/macros/s/AKfycbwcyXIoRfS7KZATV5LAHZ58lvWrCRfem02k9MjEPyajVsDinHp4ekHqn5l3ZrKi8_0X/exec");
                const data = await response.json();

                console.log("API Response:", data);

                if (Array.isArray(data)) { 
                    displayNews(data);
                } else {
                    console.error("รูปแบบข้อมูลไม่ถูกต้อง", data);
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
                throw error;
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
                    <div class="news-details" onclick="window.open('${news.link}', '_blank')" style=" cursor: pointer; ">
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-date">วันที่ ${news.date}</p>
                    </div>
                `;
                newsListElement.appendChild(listItem);
            });
        }
