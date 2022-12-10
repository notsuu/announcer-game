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
var spacePressed = false
var visible = true

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
    power: 0,
    get_cost: 20000,
    train_cost: 50000,
    wins: 0,
    losses: 0
}
var robert = {
    robertium: 0,
    market_value: 1500,
    computers: 0,
    servers: 0,
    racks: 0,
    cost_computer: 100000,
    cost_server: 5000000,
    cost_rack: 150000000,
    grid_capacity: 100,
    grid_cost: 1000000,
    power_left: 0,
    power_reset: 60,
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
    enable_sounds: true,
    abbreviate_numbers: true,
    title_stats: true,
    new_announcer: false,
}
var achievements = {
    unlocked: [],
}



function abbreviate(num, fixed, first) {
  if (!settings.abbreviate_numbers) return Math.floor(num);
  if (num === null) { return null; }
  if (num === 0) { return '0'; }
  fixed = (!fixed || fixed < 0) ? 0 : fixed;
  var b = (num).toPrecision(2).split("e"),
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 63) / 3),
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), 
      d = c < 0 ? c : Math.abs(c), 
      e = d + [first ? 'c' : '', 'K', 'M', 'B', 'T', "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", 'Dd', "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg"][k];
  return e;
}

function achUpdate() {
      achievements.unlocked.forEach(elem => {
        if (document.getElementById(elem) && typeof elem == "string") {document.getElementById(elem).classList = "ach on idk"
        switch (elem) {
          default: break;
            case "achievement_recnuonna":
            document.getElementById(elem).getElementsByTagName("b")[0].innerHTML = "recnuonnA"; break;
            case "achievement_finale":
            document.getElementById(elem).getElementsByTagName("b")[0].innerHTML = "Announcer Cascade"; break;
            case "achievement_cheater":
            document.getElementById(elem).getElementsByTagName("b")[0].innerHTML = "Cheater"; break;
            case "achievement_slider":
            document.getElementById(elem).getElementsByTagName("b")[0].innerHTML = "The Holy Slider"; break;
            case "achievement_cristal":
            document.getElementById(elem).getElementsByTagName("b")[0].innerHTML = "robert"; break;
        } }
      })
    }
function achGrant(ach) {
      if (!ach || typeof ach != "string") return console.warn("Achievement name must be a string, got "+typeof ach);
      if (!document.getElementById(ach) || !ach.startsWith("achievement_")) return console.warn(`No such achievement: ${ach}`);
      if (achievements.unlocked.find(elem => elem == ach)) return;
      achievements.unlocked.push(ach);
  achUpdate()
      alertify.notify(`<b class="among">Achievement unlocked!</b><br>${document.getElementById(ach).getElementsByTagName("b")[0].innerHTML}`, "warning",5)
      
    }
function achCheck() {
      //oh god.
      if (announcer.coins >= 1) achGrant("achievement_announce");
      if (announcer.coins >= 69) achGrant("achievement_nice");
      if (announcer.auto_amount >= 1) achGrant("achievement_auto");
      if (announcer.level >= 50) achGrant("achievement_lvl50");
      if (marcus.wins >= 1) achGrant('achievement_marcuswin');
      if (marcus.losses >= 1) achGrant('achievement_marcuslose');
      if (announcer.level >= 100) achGrant("achievement_lvl100");
      if (announcer.coins >= 1000000) achGrant("achievement_rich");
      if (robert.computers >= 1 || robert.servers >= 1 || robert.racks >= 1) achGrant("achievement_miner");
      if (announcer.level >= 150) achGrant("achievement_lvl150");
      if (robux.generated >= 1) achGrant("achievement_robux");
      if (announcer.level >= 200) achGrant("achievement_lvl200");
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
  if (settings.new_announcer) {
    document.getElementById('announcer').src = '/assets/announcer2.png'
  } else {
    document.getElementById('announcer').src = '/assets/announcer.png'
  }
  if (visible) { document.title = 'Announcer Game' } else {
    document.title = `${abbreviate(announcer.coins,1)} coins ${announcer.level >= 100 ? `| ${abbreviate(robert.robertium,1)} RBT` : ''}`
  }
    if (announcer.coins < announcer.levelCost) document.getElementById("levelUpBtn").classList = "btnLarge off"; else document.getElementById("levelUpBtn").classList = "btnLarge on";
    if (announcer.coins < cost) document.getElementById("autoBuyBtn").classList = "btnLarge off"; else document.getElementById("autoBuyBtn").classList = "btnLarge on";
  if (announcer.coins < ucost || announcer.auto_level >= 50) document.getElementById("autoUpgradeBtn").classList = "btnLarge off"; else document.getElementById("autoUpgradeBtn").classList = "btnLarge on";
    document.getElementById("coinCount").innerHTML = `${abbreviate(announcer.coins,1)} coins (+${abbreviate(announcer.auto_amount/announcer.auto_rate,1)}/s)`
    document.getElementById("levelCount").innerHTML = `Level: ${announcer.level}`
  document.getElementById("robertiumCount").innerHTML = `${abbreviate(robert.robertium,1)} RBT`
    document.getElementById("levelUpBtn").innerHTML = `Level up<br>(${abbreviate(announcer.levelCost,1, true)})`
    document.getElementById("autoBuyBtn").innerHTML = `Buy auto announcers<br>(${announcer.auto_amount}, ${abbreviate(cost,1, true)})`
  if (announcer.auto_level < 50) document.getElementById("autoUpgradeBtn").innerHTML = `Upgrade auto announcer<br>(${announcer.auto_rate}s, ${abbreviate(ucost,1,true)})`; else document.getElementById("autoUpgradeBtn").innerHTML = `Upgrade auto announcer<br>(${announcer.auto_rate}s)`;
  document.getElementById("sellRobertBtn").innerHTML = `Sell robertium<br>(${robert.market_value}c/RBT)`
  if (robert.robertium > 0) document.getElementById("sellRobertBtn").classList = "btnLarge on"; else document.getElementById("sellRobertBtn").classList = "btnLarge off";
  document.getElementById("buyComputerBtn").innerHTML = `Buy computer<br>(${robert.computers}, ${abbreviate(robert.cost_computer,1)})`
  if (announcer.coins >= robert.cost_computer) document.getElementById("buyComputerBtn").classList = "btnLarge on"; else document.getElementById("buyComputerBtn").classList = "btnLarge off";
  document.getElementById("buyServerBtn").innerHTML = `Buy server<br>(${robert.servers}, ${abbreviate(robert.cost_server,1)})`
  if (announcer.coins >= robert.cost_server) document.getElementById("buyServerBtn").classList = "btnLarge on"; else document.getElementById("buyServerBtn").classList = "btnLarge off";
  document.getElementById("buyRackBtn").innerHTML = `Buy rack<br>(${robert.racks}, ${abbreviate(robert.cost_rack,1)})`
  if (announcer.coins >= robert.cost_rack) document.getElementById("buyRackBtn").classList = "btnLarge on"; else document.getElementById("buyRackBtn").classList = "btnLarge off";
  document.getElementById("gridUpgradeBtn").innerHTML = `Upgrade power grid<br>(${abbreviate(robert.grid_capacity,1)}W, ${abbreviate(robert.grid_cost,1)})`
  if (announcer.coins >= robert.grid_cost) document.getElementById("gridUpgradeBtn").classList = "btnLarge on"; else document.getElementById("gridUpgradeBtn").classList = "btnLarge off";
  document.getElementById("powerInfo").innerHTML = `${abbreviate(robert.power_left,1)}W (resets in ${robert.power_reset} second(s))`
  document.getElementById("powerusage").max = robert.grid_capacity
  document.getElementById("powerusage").value = robert.power_left
  document.getElementById("powerusage").low = Math.floor(robert.grid_capacity * 0.2)
  document.getElementById("powerusage").high = Math.floor(robert.grid_capacity * 0.5)
  document.getElementById("powerusage").optimum = robert.grid_capacity
  document.getElementById('marcusPower').innerHTML = `Power level: ${marcus.power}`
  document.getElementById('marcusWinCount').innerHTML = `Wins: ${marcus.wins}`
  document.getElementById('marcusLoseCount').innerHTML = `Losses: ${marcus.losses}`
  document.getElementById('marcusGetBtn').innerHTML = `Aqquire marcus<br>(${marcus.amount}, ${abbreviate(marcus.get_cost,1)})`
  if (announcer.coins >= marcus.get_cost) document.getElementById('marcusGetBtn').classList = "btnLarge on"; else document.getElementById('marcusGetBtn').classList = "btnLarge off"
  if (marcus.power >= 10) {
    document.getElementById('marcusTrainBtn').innerHTML = `Train marcus`
    document.getElementById('marcusTrainBtn').classList = 'btnLarge off'
  } else {
    document.getElementById('marcusTrainBtn').innerHTML = `Train marcus<br>(${abbreviate(marcus.train_cost,1)})`
    if (announcer.coins >= marcus.train_cost) document.getElementById('marcusTrainBtn').classList = "btnLarge on"; else document.getElementById('marcusTrainBtn').classList = "btnLarge off"
  }
  
  if (marcus.amount >= 0) document.getElementById('marcusFightBtn').classList = "btnLarge on"; else document.getElementById('marcusFightBtn').classList = "btnLarge off"
  
    if (announcer.level >= 50 && currentTab != 1) {tabButtons[1].className = "btn default"; tabButtons[1].innerHTML = "Marcus Arena";}
    if (announcer.level >= 100 && currentTab != 2) {tabButtons[2].className = "btn default"; tabButtons[2].innerHTML = "Robertium"; document.getElementById("robertiumCount").style = ""}
    if (announcer.level >= 150 && currentTab != 3) {tabButtons[3].className = "btn default"; tabButtons[3].innerHTML = "Robux";}
    if (announcer.level >= 200 && currentTab != 4) {tabButtons[4].className = "btn default"; tabButtons[4].innerHTML = "...";}
  achCheck()
  achUpdate()
  //settings stuff, i know this is bad code but idc
  if (settings.autosave) { 
      document.getElementById("autosaveSettingsBtn").classList = "btn on"
      document.getElementById("autosaveSettingsBtn").innerHTML = '<b>Autosave</b><br>Enabled'
  } else {
      document.getElementById("autosaveSettingsBtn").classList = "btn off"
      document.getElementById("autosaveSettingsBtn").innerHTML = '<b>Autosave</b><br>Disabled'
  }
  if (settings.autosave_notify) { 
      document.getElementById("autosaveNotifySettingsBtn").classList = "btn on"
      document.getElementById("autosaveNotifySettingsBtn").innerHTML = '<b>Autosave notification</b><br>Enabled'
  } else {
      document.getElementById("autosaveNotifySettingsBtn").classList = "btn off"
      document.getElementById("autosaveNotifySettingsBtn").innerHTML = '<b>Autosave notification</b><br>Disabled'
  }
  if (settings.enable_sounds) { 
      document.getElementById("soundSettingsBtn").classList = "btn on"
      document.getElementById("soundSettingsBtn").innerHTML = '<b>Sounds</b><br>Enabled'
  } else {
      document.getElementById("soundSettingsBtn").classList = "btn off"
      document.getElementById("soundSettingsBtn").innerHTML = '<b>Sounds</b><br>Disabled'
  }
   if (settings.abbreviate_numbers) { 
      document.getElementById("numAbbrSettingsBtn").classList = "btn on"
      document.getElementById("numAbbrSettingsBtn").innerHTML = '<b>Number abbreviation</b><br>Enabled'
  } else {
      document.getElementById("numAbbrSettingsBtn").classList = "btn off"
      document.getElementById("numAbbrSettingsBtn").innerHTML = '<b>Number abbreviation</b><br>Disabled'
  }
   if (settings.title_stats) { 
      document.getElementById("titleStatsSettingsBtn").classList = "btn on"
      document.getElementById("titleStatsSettingsBtn").innerHTML = '<b>Title stats</b><br>Enabled'
  } else {
      document.getElementById("titleStatsSettingsBtn").classList = "btn off"
      document.getElementById("titleStatsSettingsBtn").innerHTML = '<b>Title stats</b><br>Disabled'
  }
  if (settings.new_announcer) { 
      document.getElementById("announcerSettingsBtn").innerHTML = '<b>Announcer</b><br>New'
  } else {
      document.getElementById("announcerSettingsBtn").innerHTML = '<b>Announcer</b><br>Old'
  }
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
        localStorage.setItem(`robert.${element}`, robert[element]);
    }
    for (element in robux) {
        localStorage.setItem(`robux.${element}`, robux[element])
    }
    for (element in settings) {
        localStorage.setItem(`settings.${element}`, settings[element])
    }
    localStorage.setItem('lastVersion',document.getElementById('version').innerHTML)
    localStorage.setItem("achievements", JSON.stringify(achievements.unlocked))
    } catch (err) {
        console.warn(err)
        return alertify.notify("Save failed, please try again.","error",5);
    }
    if (notify) alertify.notify("Data saved!","success",3);
}

function saveReload() {
  save(); location.reload()
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
                if (elem == "false" || elem == "true") settings[element] = elem == "true" ? true : false;
                else settings[element] = Number(elem)
            }
            
        }
      achievements.unlocked = JSON.parse(localStorage.getItem("achievements"))
      if (!achievements.unlocked) achievements.unlocked = [];
        } catch (err) {
            console.warn(err)
            return alertify.notify("Load failed. Check console for details.","error",5);
        }
        
        alertify.notify("Data loaded!","success",3)
      achUpdate()
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
  let ach = utf8_to_b64(JSON.stringify(achievements.unlocked))
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
    achievements.unlocked = ach_i
    update()
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
  if (announcer.auto_level >= 50) {
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

function buyComputer() {
  if (announcer.coins < robert.cost_computer) {
    alertify.notify("You don't have enough coins for this!", "error", 4); return
  } else {
    announcer.coins -= robert.cost_computer
    robert.cost_computer = Math.floor(robert.cost_computer*1.2)
    robert.computers++
    update()
  }
}

function buyServer() {
  if (announcer.coins < robert.cost_server) {
    alertify.notify("You don't have enough coins for this!", "error", 4); return
  } else {
    announcer.coins -= robert.cost_server
    robert.cost_server = Math.floor(robert.cost_server*1.2)
    robert.servers++
    update()
  }
}

function buyRack() {
  if (announcer.coins < robert.cost_rack) {
    alertify.notify("You don't have enough coins for this!", "error", 4); return
  } else {
    announcer.coins -= robert.cost_rack
    robert.cost_rack = Math.floor(robert.cost_rack*1.2)
    robert.racks++
    update()
  }
}

function upgradeGrid() {
    if (announcer.coins < robert.grid_cost) {
    alertify.notify("You don't have enough coins for this!", "error", 4); return
    } else {
      announcer.coins -= robert.grid_cost
      robert.grid_cost = Math.floor(robert.grid_cost*1.5)
      robert.grid_capacity = Math.floor(robert.grid_capacity*1.5)
      robert.power_left = robert.grid_capacity
      robert.power_reset = 60
      update()
    }
}

function sellRobert() {
  if (robert.robertium <= 0) {
    alertify.notify("You don't have any robertium to sell!", "error", 4); return
  } else {
    announcer.coins += robert.robertium * robert.market_value
    alertify.notify(`Sold ${robert.robertium} RBT for ${abbreviate(robert.robertium * robert.market_value,1)} coins!`, "success", 4)
    robert.robertium = 0
    update()
  }
}

function battle() {
  if (marcus.amount <= 0) {
    alertify.notify("You don't have any marcuses!","error",4); return
  } else {
    let res = getRandom(1,100)
    if (res <= 20+5*marcus.power) {
      let surv = getRandom(1,marcus.amount)
      let gain = getRandom(2500,5000)
      let tgain = Math.floor(gain+(gain/marcus.amount*surv))
      alertify.notify(`<b>Victory!</b><br>Marcuses survived: ${surv}<br>Gained ${abbreviate(tgain,1)} coins`,'success',10)
      announcer.coins += tgain
      marcus.wins++
      update()
    } else {
      let surv = getRandom(1,marcus.amount)
      let loss = getRandom(250,500)
      let tloss = (marcus.amount-surv)*loss
      alertify.notify(`<b>Defeat...</b><br>Death toll: ${marcus.amount-surv}<br>Lost ${abbreviate(tloss,1)} coins`,'error',10)
      announcer.coins -= tloss
      marcus.losses++
      update()
    }
  }
}

function getMarcus() {
  if (announcer.coins < marcus.get_cost) {
    alertify.notify("You don't have enough coins for this!", "error", 4); return
    } else {
      announcer.coins -= marcus.get_cost
      marcus.amount++;
      marcus.get_cost = Math.floor(marcus.get_cost*1.075)
      update()
    }
}

function trainMarcus() {
  if (marcus.power >= 10) {
    alertify.notify("Max level reached!", "error", 4); return
  }
  if (announcer.coins < marcus.train_cost) {
    alertify.notify("You don't have enough coins for this!", "error", 4); return
    } else {
      announcer.coins -= marcus.train_cost
      marcus.power++
      marcus.train_cost = Math.floor(marcus.train_cost*1.1)
      update()
    }
}

function autoCycle() {
    announcer.coins += announcer.auto_amount
    update()
    setTimeout(autoCycle,1000*announcer.auto_rate)
}

function autoSave() {
  if (settings.autosave) save(settings.autosave_notify);
  setTimeout(autoSave,30000)
}

function robertCycle() {
  if (robert.power_left > 0) {
    robert.robertium += getRandom(6,72)*robert.computers + getRandom(240,2160)*robert.servers + getRandom(4200,12000)*robert.racks
    robert.power_left -= 2*robert.computers
    robert.power_left -= 12*robert.servers
    robert.power_left -= 80*robert.racks
    if (robert.power_left <= 0) robert.power_left = 0;
  }
  setTimeout(robertCycle,1000)
}

function robertFluctuate() {
  robert.market_value += getRandom(-75,75)
  if (robert.market_value <= 700) robert.market_value = 700;
  if (robert.market_value >= 5000) robert.market_value = 5000;
  update()
  setTimeout(robertFluctuate,5000)
}

function robertGridReset() {
  robert.power_reset -= 1
  if (robert.power_reset <= 0) { robert.power_reset = 60; robert.power_left = robert.grid_capacity };
  update()
  setTimeout(robertGridReset,1000)
}

window.addEventListener("load", (event) => {
    load(false)
    update()
    autoCycle()
    setTimeout(autoSave,30000)
    robertFluctuate()
    robertGridReset()
    robertCycle()
    if (localStorage['lastVersion'] != document.getElementById('version').innerHTML && localStorage.getItem('announcer.coins')) {
      document.getElementById('changelog').className = "changelog"
      localStorage.setItem('lastVersion',document.getElementById('version').innerHTML)
    }
})

window.addEventListener('keydown', (event) => {
  if (event.key == " ") {
    if (!spacePressed) announce();
    spacePressed = true
  }
})

window.addEventListener('keyup', (event) => {
  if (event.key == " ") {
    spacePressed = false
  }
})

let hidden;
let visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
function handleVisibilityChange() {
  if (document[hidden] && settings.title_stats) {
    visible = false
    update()
  } else {
    visible = true
    update()
  }
}
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  alertify.notify('Browser does not support Page Visibility API. User stats will not be shown in the tab title.','error',5)
} else {
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}

if('serviceWorker' in navigator) {
  console.log("service worker supported")
  let registration;
  const registerServiceWorker = async () => {
    console.log("registering service worker")
    registration = await navigator.serviceWorker.register('./service_worker.js');
  };
  registerServiceWorker();
}