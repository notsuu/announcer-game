console.log("would you mind NOT cheating? thanks")
//OH LOOK, you decided to inspect the script! congratulations, you have earned the cheater award

var quotes = [
  "Explosion imminent. Evacuate the facility immidiately.",
  "Reactor Explosion Timer destroyed.",
  "All reactor core safeguards are now non-functional. Please prepare for reactor core meltdown.",
  "Warning! Reactor core is at critical temperature.",
  "Today is pizza day, so head on down to the cafeteria to grab yourself a hot slice!",
  "Please prepare for emergency evacuation.",
  "Reactor Explosion Uncertainty Emergency Preemption Protocol initiated: This facility will self destruct in two minutes.",
  "Danger! Reactor meltdown, evacuate at once."
]

function getRandom(min, max) {
  min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

var coins = 0;
var level = 0;
var miners = 0;
var announcers = 0;
var playerHealth = 100;
var bossHealth = 5000;
var shield = 8;
var doSave = false;
var sPurchase = 0;
const localStorage = window.localStorage;

var coinCount = document.getElementById("coinCount")
var challengeBtn = document.getElementById('challenge')
var attack = document.getElementById('attack')
var leveler = document.getElementById('levelup')
var autoGet = document.getElementById('aabuy')

function hurt(boss, amount) {
  if (boss) { bossHealth -= amount;
  document.getElementById("bosshp").innerHTML = `Boss health: <meter min="0" max="5000" low="1000" high="3000" optimum="5000" value="${bossHealth}"></meter> (${bossHealth} HP)`
  if (bossHealth < 1) { bossHealth = 0; if (bossHealth === 0) win() }
  } else {
    playerHealth -= amount;
  document.getElementById("playerhp").innerHTML = `Your health: <meter min="0" max="100" low="20" high="50" optimum="100" value="${playerHealth}"></meter> (${playerHealth} HP)`
  if (playerHealth < 1) { playerHealth = 0; lose() }
  }
  
}

function saveGame() {
  localStorage.setItem('coins', coins)
  localStorage.setItem('miners', miners)
  localStorage.setItem('announcers', announcers)
}

function loadGame(notif) {
  if (!localStorage.getItem('coins')) { 
    if (notif) { return alert('You have not saved yet!') }
    else { return; }
  }
  coins = Number(localStorage.getItem('coins'))
  miners = Number(localStorage.getItem('miners'))
  announcers = Number(localStorage.getItem('announcers'))
  sPurchase = Number(localStorage.getItem('sPurchase'))
  coinCount.innerHTML = `Announcer coins: ${coins}`
  
}

function ohNo() {
  alert("You scream into the void: 1v1 or youre noob lmaoooo") 
  alert("The ground starts to rumble...")
  alert("Could it be.. the ɹǝɔunouu∀?")
  alert("...")
  alert("Sure enough, a few moments later, you see him manifest.")
  document.getElementById("boss").src = "/assets/recnuonna.png"
  document.getElementById("bosshp").style = "display: block"
  document.getElementById("challenge").style = "display: none"
  document.getElementById("attack").style = "display: block"
  document.getElementById("heal").style = "display: block"
  document.getElementById("heald").style = "display: block"
  document.getElementById("healp").style = "display: block"
  document.getElementById("kill").style = "display: block"
  document.getElementById("magic").style = "display: block"
  document.getElementById("shield").style = "display: block"
}

function go() {
  let hurtm1 = getRandom(5,27)
  let hurtm2 = getRandom(50,80)
    document.getElementById("quote").innerHTML = `You hit ɹǝɔunouu∀ and he loses ${hurtm2} HP. You lost ${hurtm1} HP.`; hurt(false, hurtm1)
   ; hurt(true, hurtm2)
}

function magic() {
  alert("Sorry i was too lazy to implement this so just dont use it for now")
}

function suicide() {
  alert("No")
}

function shieldf() {
  if (shield < 1) return;
  shield -= 1
  document.getElementById("shield").innerHTML = `Use shield (${shield}x)`
  let blocker = getRandom(1,100)
  if (blocker > 74) {
    let hurtm = getRandom(8,13)
    document.getElementById("quote").innerHTML = `You try to use the shield, but it doesn't work... You lost ${hurtm} HP.`
    hurt(false, hurtm)
  } else {
    let hurtm = getRandom(160,290)
    document.getElementById("quote").innerHTML = `You use the shield and it strikes back to the ɹǝɔunouu∀!`; hurt(true, hurtm)
  }
}

function heal() {
  level = level;
  if (coins >= 1e12) {
    if (playerHealth > 99) return;
    playerHealth += 15; if (playerHealth > 99) playerHealth = 100
    coins -= 1e12
    coinCount.innerHTML = `Announcer coins: ${coins}`
    document.getElementById("playerhp").innerHTML = `Your health: <meter min="0" max="100" low="20" high="50" optimum="100" value="${playerHealth}"></meter> (${playerHealth} HP)`
  } else {
    alert("You don't have enough coins!")
  }
}

function heal1() {
  level = level;
  if (coins >= 10e12) {
    if (playerHealth > 99) return;
    playerHealth += 35; if (playerHealth > 99) playerHealth = 100
    coins -= 1e12
    coinCount.innerHTML = `Announcer coins: ${coins}`
    document.getElementById("playerhp").innerHTML = `Your health: <meter min="0" max="100" low="20" high="50" optimum="100" value="${playerHealth}"></meter> (${playerHealth} HP)`
  } else {
    alert("You don't have enough coins!")
  }
}

function heal2() {
  level = level;
  if (coins >= 100e12) {
    if (playerHealth > 99) return;
    playerHealth += 60; if (playerHealth > 99) playerHealth = 100
    coins -= 1e12
    coinCount.innerHTML = `Announcer coins: ${coins}`
    document.getElementById("playerhp").innerHTML = `Your health: <meter min="0" max="100" low="20" high="50" optimum="100" value="${playerHealth}"></meter> (${playerHealth} HP)`
  } else {
    alert("You don't have enough coins!")
  }
}

function win() {
   document.getElementById("bosshp").style = "display: none"
   document.getElementById("boss").src = ""
   alert("The ɹǝɔunouu∀ collapses...")
   alert("Is it... finally over?")
   alert("Seems so..")
   alert("You can finally rest.")
   saveGame()
   localStorage.setItem("victory", true)
   window.location.href = "credits.html"
}

function lose() {
   document.getElementById("playerhp").style = "display: none"
   alert("You collapse on the ground.")
   alert("It seems that its too much to handle for you...")
   alert("That is unfortunate.")
   saveGame()
   window.location.href = "index.html"
}

window.addEventListener('beforeunload', function (e) {
  if (doSave) { saveGame() }
  localStorage.setItem('lastPlayed', Date.now())
  delete e['returnValue'];
});

window.addEventListener('load', function () {
  loadGame(false)
});

