// INTRUDER ALERT, A RED SPY IS IN THE BASE!
// A RED SPY IS IN THE BASE?!
// PROTECT THE BRIEFCASE!
// WE NEED TO PROTECT THE BRIEFCASE!
// Yo a little help here?
// Alright, alright, i got it. Stand back son.
// 1, 1, 1, uhhh. 1!
// Lets go, lets go- INCOOOMIING
// AAAAAAAAAAAAAAAAAAAAAAAAAAAA- hey its still here!
// *cough* Gentlemen.
// I see the briefcase is safe? Safe and sound.
// Tell me, did anyone happen to kill a red spy on the way here? No?
// Then we still have a problem. And a knife!
// Ooooh, big problem. I killed plenty of spies, the dime-a-dozen backstabbing scumbags. Like you!
// Ow. No offense.
// If you managed to kill them i assure you they were not like me.
// And nothing, nothing like the man loose inside this building.
// And what are you, president of his fanclub?
// No... That would be your mother!
// What the- Whe- Any- A- Ei-
// Indeed. And now he's here to f*ck us! So listen up boy,
// or pornography starring your mother will be the second worst thing that happens to you today.
// Ooh! A- e- Gimme that!
// ...The spy has already breached our defenses.
// You see what he's done to our colleagues?
// And worst of all, it could be any one of us...
// He could be in this very room - it could be you! It could be me!
// It could even be- WOAH WOAH WOAH!
// What, it was obvious! He's the red spy!
// Watch, he'll turn red any second now!
// ...Any second now. See, red! no, wait, thats blood.
// So we still got problem. Big problem.
// Who's ready to go find the spy?
// ...
// Right behind you.

console.log('%cNo.', 'color: #ff0000; font-size: 25em; font-weight: bold')  //yo wassup

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

var currentTab = 0

var announcer = {
    coins: 0,
    level: 0,
    levelCost: 200,
    auto_amount: 0,
    auto_rate: 1,
    auto_level: 1
}
var marcus = {
    amount: 0,
    level: 0,
    day: 0,
    wealth: 0
}
var robert = {
    robertium: 0,
    computers: 0,
    servers: 0,
    racks: 0,
    farms: 0
}
var robux = {
    generated: 0,
    population: 0,
    dumbness: 0
}
var settings = {
    autosave: true,
    autosave_interval: 60,
    autosave_notify: true,
    enable_sounds: true
}
var achievements = {
    unlocked: []
}

var tabButtons = [ 
document.getElementById("announcerTabBtn"),
document.getElementById("marcusTabBtn"),
document.getElementById("robertTabBtn"),
document.getElementById("robuxTabBtn"),
document.getElementById("recnuonnaTabBtn"),
document.getElementById("achievementTabBtn"),
document.getElementById("settingsTabBtn")
]

var tabs = [
document.getElementById("announcerTab"),
document.getElementById("marcusTab"),
document.getElementById("robertTab"),
document.getElementById("robuxTab"),
document.getElementById("recnuonnaTab"),
document.getElementById("achievementTab"),
document.getElementById("settingsTab")
]
function update() {
    let cost = announcer.auto_amount*50+70
    let ucost = (announcer.auto_level-1)*125+150
    if (announcer.coins < announcer.levelCost) document.getElementById("levelUpBtn").classList = "btnLarge off"; else document.getElementById("levelUpBtn").classList = "btnLarge on";
    if (announcer.coins < cost) document.getElementById("autoBuyBtn").classList = "btnLarge off"; else document.getElementById("autoBuyBtn").classList = "btnLarge on";
  if (announcer.coins < ucost || announcer.auto_level >= 30) document.getElementById("autoUpgradeBtn").classList = "btnLarge off"; else document.getElementById("autoUpgradeBtn").classList = "btnLarge on";
    document.getElementById("coinCount").innerHTML = `Announcer coins: ${announcer.coins}`
    document.getElementById("levelCount").innerHTML = `Level: ${announcer.level}`
    document.getElementById("autoIncome").innerHTML = `Income: ${announcer.auto_amount/announcer.auto_rate}c/s`
    document.getElementById("levelUpBtn").innerHTML = `Level up<br>(${announcer.levelCost}c)`
    document.getElementById("autoBuyBtn").innerHTML = `Buy auto announcers<br>(${announcer.auto_amount}, ${cost}c)`
  if (announcer.auto_level < 30) document.getElementById("autoUpgradeBtn").innerHTML = `Upgrade auto announcer<br>(${announcer.auto_rate}s, ${ucost}c)`; else document.getElementById("autoUpgradeBtn").innerHTML = `Upgrade auto announcer<br>(${announcer.auto_rate}s)`;
    if (announcer.level >= 50 && currentTab != 1) {tabButtons[1].className = "btn default"; tabButtons[1].innerHTML = "Marcus Arena";}
    if (announcer.level >= 100 && currentTab != 2) {tabButtons[2].className = "btn default"; tabButtons[2].innerHTML = "Robertium";}
    if (announcer.level >= 150 && currentTab != 3) {tabButtons[3].className = "btn default"; tabButtons[3].innerHTML = "Robux";}
    if (announcer.level >= 200 && currentTab != 4) {tabButtons[4].className = "btn default"; tabButtons[4].innerHTML = "...";}
}

function updateSettings() {
    if (settings.autosave) {}
}

function switchTab(tab) {
    update()
    switch (tab) {
        case 0:
            tabButtons.forEach((element) => element.className="btn default")
            tabs.forEach((elementt) => elementt.style = "display: none")
            tabButtons[tab].className = "btn on"
            tabs[tab].style = "display: contents"; 
            currentTab = 0; break;
        case 1:
            if (announcer.level >= 50) {
                tabButtons.forEach((element) => element.className="btn default")
                tabs.forEach((elementt) => elementt.style = "display: none")
                tabButtons[tab].className = "btn on"
                tabs[tab].style = "display: contents"
                currentTab = 1
            } else alertify.notify("Reach level 50 to unlock this!","error",4); break;
        case 2:
            if (announcer.level >= 100) {
                tabButtons.forEach((element) => element.className="btn default")
                tabs.forEach((elementt) => elementt.style = "display: none")
                tabButtons[tab].className = "btn on"
                tabs[tab].style = "display: contents"
                currentTab = 2
            } else alertify.notify("Reach level 100 to unlock this!","error",4); break;
        case 3:
            if (announcer.level >= 150) {
                tabButtons.forEach((element) => element.className="btn default")
                tabs.forEach((elementt) => elementt.style = "display: none")
                tabButtons[tab].className = "btn on"
                tabs[tab].style = "display: contents"
                currentTab = 3
            } else alertify.notify("Reach level 150 to unlock this!","error",4); break;
        case 4:
            if (announcer.level >= 200) {
                tabButtons.forEach((element) => element.className="btn default")
                tabs.forEach((elementt) => elementt.style = "display: none")
                tabButtons[tab].className = "btn on"
                tabs[tab].style = "display: contents"
                currentTab = 4
            } else alertify.notify("Reach level 200 to unlock this!","error",4); break;
        case 5:
            tabButtons.forEach((element) => element.className="btn default")
            tabs.forEach((elementt) => elementt.style = "display: none")
            tabButtons[tab].className = "btn on"
            tabs[tab].style = "display: contents";
            currentTab = 5; break;
        case 6:
            tabButtons.forEach((element) => element.className="btn default")
            tabs.forEach((elementt) => elementt.style = "display: none")
            tabButtons[tab].className = "btn on"
            tabs[tab].style = "display: contents";
            currentTab = 6; break;
    }
    if (announcer.level < 50) tabButtons[1].className = "btn off"; else tabButtons[1].innerHTML = "Marcus Arena";
    if (announcer.level < 100) tabButtons[2].className = "btn off"; else tabButtons[2].innerHTML = "Robertium";
    if (announcer.level < 150) tabButtons[3].className = "btn off"; else tabButtons[3].innerHTML = "Robux";
    if (announcer.level < 200) tabButtons[4].className = "btn off"; else tabButtons[4].innerHTML = "...";
}

function save(notify) {
    update()
    try {
    for (element in announcer) {
        localStorage.setItem(`announcer.${element}`, announcer[element])
    }
    for (element in marcus) {
        localStorage.setItem(`marcus.${element}`, marcus[element])
    }
    for (element in robert) {
        localStorage.setItem(`robert.${element}`, robert[element])
    }
    for (element in robux) {
        localStorage.setItem(`robux.${element}`, robux[element])
    }
    for (element in settings) {
        localStorage.setItem(`settings.${element}`, settings[element])
    }
    } catch (err) {
        console.warn(err)
        return alertify.notify("Save failed, please try again.","error",5);
    }
    if (notify) alertify.notify("Data saved!","success",3);
}

function load(notify) {
    update()
    if (localStorage.getItem("announcer.coins")) {
    try {
        for (element in announcer) {
            if (localStorage.getItem(`announcer.${element}`))
            announcer[element] = Number(localStorage.getItem(`announcer.${element}`))
        }
        for (element in marcus) {
            if (localStorage.getItem(`marcus.${element}`))
            marcus[element] = Number(localStorage.getItem(`marcus.${element}`))
        }
        for (element in robert) {
            if (localStorage.getItem(`robert.${element}`))
            robert[element] = Number(localStorage.getItem(`robert.${element}`))
        }
        for (element in robux) {
            if (localStorage.getItem(`robux.${element}`))
            robux[element] = Number(localStorage.getItem(`robux.${element}`))
        }
        for (element in settings) {
            let elem = localStorage.getItem(`settings.${element}`)
            if (elem) {
                if (typeof elem == "boolean") settings[element] = Boolean(elem);
                else settings[element] = Number(elem)
            }
            
        }

        } catch (err) {
            console.warn(err)
            return alertify.notify("Load failed. Check console for details.","error",5);
        }
        
        alertify.notify("Data loaded!","success",3)
    } else {
        if (notify == true) alertify.notify("You haven't saved yet!","error",3);
    }
}

function exportData() {
  save(false)
  try {
  let exp = "";
  let ann = utf8_to_b64(JSON.stringify(announcer))
  let marc = utf8_to_b64(JSON.stringify(marcus))
  let rbt = utf8_to_b64(JSON.stringify(robert))
  let set = utf8_to_b64(JSON.stringify(settings))
  let ach = utf8_to_b64(JSON.stringify(achievements))
  exp = ann+";"+marc+";"+rbt+";"+set+";"+ach
  navigator.clipboard.writeText(exp)
  } catch (err) {
    console.log(err)
    alertify.notify("Something went wrong! Please check the console.","error",5); return
  }
  alertify.notify("Exported to clipboard!","success",3.5)
}

function importData() {
  let imp = prompt("Enter your save data:")
  let b64 = imp.split(';')
  if (b64.length != 5) {
    alertify.notify("Unable to parse data","error",4)
  } else { try {
    let ann_i = b64_to_utf8(b64[0])
    let marc_i = b64_to_utf8(b64[1])
    let rbt_i = b64_to_utf8(b64[2])
    let set_i = b64_to_utf8(b64[3])
    let ach_i = b64_to_utf8(b64[4])
    ann_i = JSON.parse(ann_i)
    marc_i = JSON.parse(marc_i)
    rbt_i = JSON.parse(rbt_i)
    set_i = JSON.parse(set_i)
    ach_i = JSON.parse(ach_i)
    for (element in ann_i) { announcer[element] = ann_i[element] }
    for (element in marc_i) { marcus[element] = marc_i[element] }
    for (element in rbt_i) { robert[element] = rbt_i[element] }
    for (element in set_i) { settings[element] = set_i[element] }
    for (element in ach_i) { achievements[element] = ach_i[element] }
  } catch (err) { alertify.notify("Unable to parse data","error",4); console.log(err); return } alertify.notify("Imported successfully!","success","3") }
}

function eraseData() {
    if (prompt("This will erase all of your progress and you will start over as if you had opened this page for the first time. If you are absolutely sure you want to reset, please type 'announcer':") == "announcer") {
        localStorage.clear()
        window.location.reload()
    }
}

function setSaveInterval() {
  let inp = prompt("Enter the autosave interval in seconds:")
  if (isNaN(Number(inp))) {
    alertify.notify("Failed to parse number!","error",3)
  } else {
    setiings.autosave_interval = Math.floor(Number(inp))
  }
}

function announce() {
    announcer.coins += 1 + announcer.level
    update()
}

function levelUp() {
    update()
    if (announcer.coins < announcer.levelCost) {
        alertify.notify("You don't have enough coins for this!", "error", 4)
    } else {
        announcer.level++
        announcer.coins -= announcer.levelCost;
        announcer.levelCost = Math.floor(announcer.levelCost * 1.1)
        update()
    }
}

function autoBuy() {
    update()
    let cost = announcer.auto_amount*50+70
    if (announcer.coins < cost) {
        alertify.notify("You don't have enough coins for this!", "error", 4)
    } else {
        announcer.coins -= cost
        announcer.auto_amount++
        update()
    }
}

function autoUpgrade() {
  let cost = (announcer.auto_level-1)*125+150
  if (announcer.auto_level >= 30) {
    alertify.notify("Max level reached!", "error", 4); return
  }
  if (announcer.coins < cost) {
        alertify.notify("You don't have enough coins for this!", "error", 4)
    } else {
        announcer.coins -= cost
        announcer.auto_rate = Math.floor(1000*(announcer.auto_rate*0.975))/1000
        announcer.auto_level++;
        update()
    }
}

function autoCycle() {
    announcer.coins += announcer.auto_amount
    update()
    setTimeout(autoCycle,1000*announcer.auto_rate)
}

window.addEventListener("load", (event) => {
    load(false)
    update()
    autoCycle()
})

