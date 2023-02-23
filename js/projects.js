const spaceBattle = document.getElementById('space-battle')

spaceBattle.addEventListener('mouseover', () => {
    spaceBattle.src = "/img/spaceBattle.gif"
});

spaceBattle.addEventListener('mouseout', () => {
    spaceBattle.src = "img/spaceBattleStatic.png"
});

const openBtn = document.getElementById("disneySite");
const modal = document.getElementById("modal");
const close = document.getElementById("close");

const openModal = () => {
	modal.style.display = "block";
};

const closeModal = () => {
	modal.style.display = "none";
};

openBtn.addEventListener("click", openModal);
close.addEventListener("click", closeModal);
