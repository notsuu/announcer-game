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
var lastPlayed = 0;
var darkMode = false;
var doSave = false;
var sPurchase = 0;
const localStorage = window.localStorage;
let vic = false
if (localStorage.getItem("victory") === "true") { vic = true }

var coinCount = document.getElementById("coinCount")
var levelCount = document.getElementById("levelCount")
var autoCount = document.getElementById("autoCount")
var coinGet = document.getElementById('announce')
var leveler = document.getElementById('levelup')
var autoGet = document.getElementById('aabuy')

function resetData() {
  let choice = confirm("Are you sure you wanna do that? (There is a very low chance that your pizza permissions will be revoked. I cannot tell you the chance of such thing happening, but just be aware that it might happen.)")
  if (choice) {
    //localStorage.clear() - swapped because this clears v2 data (BAD!!!!!!!!!!)
    localStorage.removeItem("coins")
    localStorage.removeItem("level")
    localStorage.removeItem("miners")
    localStorage.removeItem("announcers")
    localStorage.removeItem("darkMode")
    localStorage.removeItem("sPurchase")
    localStorage.removeItem("victory")
    location.reload()
  }
}

function saveGame() {
  localStorage.setItem('coins', coins)
  localStorage.setItem('level', level)
  localStorage.setItem('miners', miners)
  localStorage.setItem('announcers', announcers)
  localStorage.setItem('darkMode', darkMode)
  localStorage.setItem('sPurchase', sPurchase)
}


function loadGame(notif) {
  if (!localStorage.getItem('coins')) { 
    if (notif) { return alert('You have not saved yet!') }
    else { return; }
  }
  coins = Number(localStorage.getItem('coins'))
  level = Number(localStorage.getItem('level'))
  miners = Number(localStorage.getItem('miners'))
  announcers = Number(localStorage.getItem('announcers'))
  sPurchase = Number(localStorage.getItem('sPurchase'))
  darkMode = localStorage.getItem('darkMode')
  coinCount.innerHTML = `Announcer coins: ${coins}`
  levelCount.innerHTML = `Level: ${level}`
  autoCount.innerHTML = `Auto announcers: ${miners}`
  coinGet.innerHTML = `Announce something (+${1+(level*2)} coins)`
  leveler.innerHTML = `Level up (${Math.floor(200+(200*level))} coins)`
  special()
  getMedal(false)
  var theme = document.getElementsByTagName('link')[0];
  if (darkMode === "true") {darkMode = true} else {darkMode = false}
  if (sPurchase > 1) {
    theme.setAttribute('href', 'dark.css');
    document.getElementById('darkmode').innerHTML = "You can't do it anymore."
    return;
  }
  if (darkMode === true) {
                theme.setAttribute('href', 'dark.css');
                document.getElementById('darkmode').innerHTML = "disable dark mode"
            } else {
                theme.setAttribute('href', 'light.css');
                document.getElementById('darkmode').innerHTML = "enable dark mode"
            }
  
}

function getMedal(notify) {
  if (level < 100) {
      announcers = 0
      document.getElementById("medal").src = ""
  }
  if (level > 99 && level < 200) {
    announcers = 1
      document.getElementById("medal").src = "/assets/bronze.png"
      if (notify && level === 100) {alert('You have recieved a bronze medal!')}
  }
  if (level > 199 && level < 300) {
      announcers = 2
        document.getElementById("medal").src = "/assets/silver.png"
        if (notify && level === 200) {alert('You have recieved a silver medal!')}
    }
  if (level > 299) {
    announcers = 3
      document.getElementById("medal").src = "/assets/gold.png"
      if (notify && level === 300) {alert('You have recieved a gold medal!')}
  }
  if (vic) {
    document.getElementById("medal").src = "/assets/trophy.png"
    document.body.style.backgroundImage = "url('/assets/gold.png')";
  }
}

function special() {
  if (level < 100 || (sPurchase === 1 && level > 99) || (sPurchase === 2 && level > 199) || sPurchase === 3) {
    document.getElementById("spbuy1").style.display = "none";
    document.getElementById("spbuy2").style.display = "none";
    document.getElementById("spbuy3").style.display = "none";
  } if (sPurchase === 0 && level > 99) {
    document.getElementById("spbuy1").style.display = "block";
    document.getElementById("spbuy2").style.display = "none";
    document.getElementById("spbuy3").style.display = "none";
  } if (sPurchase === 1 && level > 199) {
    document.getElementById("spbuy1").style.display = "none";
    document.getElementById("spbuy2").style.display = "block";
    document.getElementById("spbuy3").style.display = "none";
  } if (sPurchase === 2 && level > 299 && !vic) {
    document.getElementById("spbuy1").style.display = "none";
    document.getElementById("spbuy2").style.display = "none";
    document.getElementById("spbuy3").style.display = "block";
  }

  if (sPurchase > 0) {
    document.getElementById("title").classList.add("rainbow")
    if (sPurchase > 1) {
      document.body.style.backgroundImage = "url('/assets/announcer.png')";
      theme.setAttribute('href', 'dark.css');
    document.getElementById('darkmode').innerHTML = "You can't do it anymore."
    
      if (sPurchase > 2 && !vic) {
        document.getElementById("nullify").style = "display: block"
      }
    }
  }
}

function announce() {
  coins += 1+(level*2)
  coinCount.innerHTML = `Announcer coins: ${coins}`
  document.getElementById('quote').innerHTML = quotes[getRandom(0, quotes.length - 1)]
}

function levelUp() {
  let cost = Math.floor(200+(200*level))
  if (coins >= cost) {
    level += 1
    coins -= cost
    coinCount.innerHTML = `Announcer coins: ${coins}`
    levelCount.innerHTML = `Level: ${level}`
    coinGet.innerHTML = `Announce something (+${1+(level*2)} coins)`
    leveler.innerHTML = `Level up (${Math.floor(200+(200*level))} coins)`
    getMedal(true)
  } else {
    alert("You don't have enough coins!")
  }
}

function autoBuy() {
  level = level;
  if (coins >= 75) {
    miners += 1
    coins -= 75
    coinCount.innerHTML = `Announcer coins: ${coins}`
    autoCount.innerHTML = `Auto announcers: ${miners}`
  } else {
    alert("You don't have enough coins!")
  }
}

function autoBuy1() {
  level = level;
  if (coins >= 750) {
    miners += 10
    coins -= 750
    coinCount.innerHTML = `Announcer coins: ${coins}`
    autoCount.innerHTML = `Auto announcers: ${miners}`
  } else {
    alert("You don't have enough coins!")
  }
}

function autoBuy2() {
  level = level;
  if (coins >= 7500) {
    miners += 100
    coins -= 7500
    coinCount.innerHTML = `Announcer coins: ${coins}`
    autoCount.innerHTML = `Auto announcers: ${miners}`
  } else {
    alert("You don't have enough coins!")
  }
}
function autoBuy3() {
  level = level;
  let rawInput = prompt("Enter the amount of auto announcers you want to buy:")
  if (!rawInput || rawInput === "") {return;}
  let bulkInput = Number(rawInput)
  if (isNaN(bulkInput)) { return; }
  if (confirm(`This will cost you ${bulkInput*75} coins`)) {
    if (coins >= bulkInput*75) {
    miners += bulkInput
    coins -= bulkInput*75
    coinCount.innerHTML = `Announcer coins: ${coins}`
    autoCount.innerHTML = `Auto announcers: ${miners}`
  } else {
    alert("You don't have enough coins!")
  }
}
  }
  

function dataExport() {
  let dat = JSON.stringify({ coins: coins, level: level, miners: miners, lastPlayed: lastPlayed, darkMode: darkMode  })
  let exp = utf8_to_b64(dat)
  console.log(exp)
  navigator.clipboard.writeText(exp)
  alert("Exported to clipboard!")
}

function dataImport() {
  let input = prompt("Paste your save data here:")
  let imp;
  if (!input) { return; }
  try {
  imp = JSON.parse(b64_to_utf8(input))
} catch (error) {
  return alert("Data parse failed. Are you sure you've entered it correctly?")
} finally {
  coins = imp.coins
  level = imp.level
  miners = imp.miners
  darkMode = imp.darkMode
  var theme = document.getElementsByTagName('link')[0];
  if (darkMode === true) {
                theme.setAttribute('href', 'dark.css');
                document.getElementById('darkmode').innerHTML = "disable dark mode"
            } else {
                theme.setAttribute('href', 'light.css');
                document.getElementById('darkmode').innerHTML = "enable dark mode"
            }
  coinCount.innerHTML = `Announcer coins: ${coins}`
  levelCount.innerHTML = `Level: ${level}`
  autoCount.innerHTML = `Auto announcers: ${miners}`
  coinGet.innerHTML = `Announce something (+${1+(level*2)} coins)`
  leveler.innerHTML = `Level up (${Math.floor(200+(200*level))} coins)`
  getMedal(false)
  alert("Exported successfully!")
} }

function spBuy1() {
  level = level;
  if (coins >= 25e6) {
    sPurchase = 1
    coins -= 25e6
    coinCount.innerHTML = `Announcer coins: ${coins}`
    special()
  } else {
    alert("You don't have enough coins!")
  }
}

function spBuy2() {
  level = level;
  if (coins >= 5e10) {
    sPurchase = 2
    coins -= 5e10
    coinCount.innerHTML = `Announcer coins: ${coins}`
    special()
  } else {
    alert("You don't have enough coins!")
  }
}

function spBuy3() {
  level = level;
  if (coins >= 1e12) {
    sPurchase = 3
    coins -= 1e12
    coinCount.innerHTML = `Announcer coins: ${coins}`
    special()
  } else {
    alert("You don't have enough coins!")
  }
}

function showCredits() {
  alert("le funny game credits\n\nnotsu - Making the game\nnikothegamer - original game idea\nugnius991 - suggestions\nmarcus guy (cristal24) - suggestions\nWaviestBalloon - idfk but she made the announcer bot\nyou - being you")
}


window.addEventListener('beforeunload', function (e) {
  if (doSave) { saveGame() }
  localStorage.setItem('lastPlayed', Date.now())
  delete e['returnValue'];
});

window.addEventListener('load', function () {
  loadGame(false)
  let lp = localStorage.getItem('lastPlayed');
  lp = Math.floor(lp/1000)
let dt = Math.floor(Date.now()/1000)
  if (dt-lp > 4 && miners > 0) {
    coins += miners * (dt - lp)
    alert(`While you were away, you earned ${miners * (dt - lp)} announcer coins!`)
  }
});

function autoget() {
  coins += miners
  coinCount.innerHTML = `Announcer coins: ${coins}`
  if (miners > 0) { document.getElementById('quote').innerHTML = quotes[getRandom(0, quotes.length - 1)] }
  setTimeout(autoget,1000);
}

autoget()