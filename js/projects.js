const spaceBattle = document.getElementById('space-battle')

spaceBattle.addEventListener('mouseover', () => {
    spaceBattle.src = "/img/spaceBattle.gif"
});

spaceBattle.addEventListener('mouseout', () => {
    spaceBattle.src = "img/spaceBattleStatic.png"
});