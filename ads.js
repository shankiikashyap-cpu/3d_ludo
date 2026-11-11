// ==========================================
// 3D LUDO ARENA - MONETAG DIRECT ADS (ads.js)
// ==========================================
const MONETAG_DIRECT_URL = "https://uplcm.com/4/12233746";

let adTimerInterval = null;
let adSecondsLeft = 5;
let currentRewardCallback = null;

// Direct ad open karne aur reward dene ka function
function triggerRewardedAd(onRewardSuccess) {
    currentRewardCallback = onRewardSuccess;

    try {
        // Player ko ad page par bhejega
        window.open(MONETAG_DIRECT_URL, "_blank");
    } catch (e) {
        console.warn("Direct link open error:", e);
    }

    // Saath me game screen par countdown chalega
    runFallbackAdModal();
}

function runFallbackAdModal() {
    adSecondsLeft = 5;
    const modal = document.getElementById('ad-modal');
    const timerText = document.getElementById('ad-countdown');
    const actionBtn = document.getElementById('ad-action-btn');
    const cornerX = document.getElementById('corner-x-btn');

    if (!modal) return;

    timerText.innerText = "5";
    actionBtn.innerText = "Please Wait (5s)...";
    actionBtn.style.background = "#334155";
    actionBtn.style.color = "#94a3b8";
    actionBtn.style.cursor = "not-allowed";

    if (cornerX) cornerX.classList.remove('active');
    modal.style.display = 'flex';

    if (adTimerInterval) clearInterval(adTimerInterval);

    adTimerInterval = setInterval(() => {
        adSecondsLeft--;
        if (adSecondsLeft > 0) {
            timerText.innerText = adSecondsLeft;
            actionBtn.innerText = "Please Wait (" + adSecondsLeft + "s)...";
        } else {
            clearInterval(adTimerInterval);
            timerText.innerText = "✅ REWARD UNLOCKED!";
            actionBtn.innerText = "CLAIM +100 COINS";
            actionBtn.style.background = "#10b981";
            actionBtn.style.color = "#ffffff";
            actionBtn.style.cursor = "pointer";

            if (cornerX) cornerX.classList.add('active');
        }
    }, 1000);
}

function handleAdModalClose() {
    if (adSecondsLeft <= 0) {
        if (adTimerInterval) clearInterval(adTimerInterval);
        const modal = document.getElementById('ad-modal');
        if (modal) modal.style.display = 'none';

        if (typeof currentRewardCallback === 'function') {
            currentRewardCallback();
            currentRewardCallback = null;
        }
    } else {
        alert("Pehle 5 seconds complete hone dein reward ke liye!");
    }
}

function handleAdModalAction() {
    if (adSecondsLeft <= 0) {
        if (adTimerInterval) clearInterval(adTimerInterval);
        const modal = document.getElementById('ad-modal');
        if (modal) modal.style.display = 'none';

        if (typeof currentRewardCallback === 'function') {
            currentRewardCallback();
            currentRewardCallback = null;
        }
    }
}