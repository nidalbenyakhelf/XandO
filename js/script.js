const parent = document.getElementById("parent");
const cell = document.querySelectorAll(".cell");
const restart = document.getElementById("restart");
let bn = true;
let index = 1;
let isGameActive = true; // متغير لتجميد اللعبة بعد الفوز أو التعادل

const winCase = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const pastelColors = [
    { name: "Pastel Pink", hex: "#FFB7B2" },    
    { name: "Pastel Peach", hex: "#FFDAC1" },    
    { name: "Pastel Yellow", hex: "#E2F0CB" },   
    { name: "Pastel Green", hex: "#B5EAD7" },    
    { name: "Pastel Blue", hex: "#C7CEEA" },    
    { name: "Pastel Lavender", hex: "#E8AEFF" }, 
    { name: "Pastel Mint", hex: "#95E1D3" },    
    { name: "Pastel Rose", hex: "#F38181" }      
];

// زر إعادة التشغيل
restart.addEventListener("click", () => {
    cell.forEach((c) => {
        c.innerText = '';
        c.style.backgroundColor = '#f0f8ff'; // اللون الافتراضي للخلايا
    });
    restart.style.backgroundColor = "#00ff3374";
    isGameActive = true;
    bn = true;
    index = 1;
});

// الحدث الرئيسي للعبة عند الضغط على الخلايا
parent.addEventListener('click', (e) => {
    // إذا انتهت اللعبة (فوز أو تعادل)، نمنع الضغط مجدداً
    if (!isGameActive) return; 

    if (e.target === parent) {
        return; 
    }

    if (e.target.innerText === "X" || e.target.innerText === "O") {
        return; 
    }

    // وضع الحرف (X أو O) وتحديد اللون
    if (bn) {
        e.target.innerText = "X";
        bn = false;
        e.target.style.backgroundColor = pastelColors[index].hex;
        index++;
    } else {
        e.target.innerText = "O"; 
        bn = true;
        e.target.style.backgroundColor = pastelColors[index].hex;
        index++;
    }

    if (index > pastelColors.length - 1) {
        index = 0;
    }

    // فحص حالات الفوز
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        const targetCell1 = document.querySelector(`[data-num="${winCase[i][0]}"]`);
        const targetCell2 = document.querySelector(`[data-num="${winCase[i][1]}"]`);
        const targetCell3 = document.querySelector(`[data-num="${winCase[i][2]}"]`);
        
        if (targetCell1.innerText !== '' && 
            targetCell1.innerText === targetCell2.innerText && 
            targetCell2.innerText === targetCell3.innerText) {
            roundWon = true;
            break; 
        }
    }

    if (roundWon) {
        isGameActive = false;
        restart.style.backgroundColor = "#00ff33"; // تغيير لون الزر للإشارة للفوز
        return;
    }

    // فحص حالة التعادل (Draw) إذا امتلأت جميع الخلايا ولم يفز أحد
    let isDraw = Array.from(cell).every((c) => c.innerText !== '');
    if (isDraw) {
        isGameActive = false;
        restart.style.backgroundColor = "#ffaa00"; // لون مختلف للتعادل مثلاً
        return;
    }
});