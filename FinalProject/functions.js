function displayScore() {
  stroke(0);
  textSize(36);
  textFont(myFont);
  fill("white");
  text(`Round: ${track.round}`, width - 243, 50);
  text(`Money: ${track.money}`, width - 243, 85);
  text(`Lives: ${track.lives}`, width - 243, 120);
}

function purchaseDartMonkey() {
  if (!currentlyPurchasing && track.money >= 100) {
    currentlyPurchasing = true;
    track.money -= 100; //defense cost
    let newDefense = new DartMonkey(mouseX, mouseY);
    let newDefensePreview = new DefensePreview(newDefense);
    defensePreviews.push(newDefensePreview);

    //           purchaseDefensePreview(newDefense);
  }
}

function purchaseFasterShooting() {
  if (
    showRange[0] &&
    (showRange[1] instanceof DartMonkey ||
      showRange[1] instanceof GlueGunner ||
      showRange[1] instanceof SniperMonkey) && track.money >= 100
  ) {
    showRange[1].fasterAttackSpeed();
  }
}

function purchaseLongerRange() {
  if (
    showRange[0] &&
    (showRange[1] instanceof DartMonkey ||
      showRange[1] instanceof GlueGunner ||
      showRange[1] instanceof SuperMonkey) && track.money >= 100
  ) {
    // console.log(showRange[1] instanceof DartMonkey);
    showRange[1].longerRange();
  }
}

function purchasePiercingDarts() {
  if (showRange[0] && showRange[1] instanceof DartMonkey && track.money >= 100) {
    showRange[1].piercingDarts();
  }
}

function purchaseGlueGunner() {
  if (!currentlyPurchasing && track.money >= 75) {
    currentlyPurchasing = true;
    track.money -= 75; //defense cost
    let newDefense = new GlueGunner(mouseX, mouseY);
    let newDefensePreview = new DefensePreview(newDefense);
    defensePreviews.push(newDefensePreview);

    //           purchaseDefensePreview(newDefense);
  }
}

function purchaseStrongerGlue() {
  if (showRange[0] && showRange[1] instanceof GlueGunner && track.money >= 100) {
    showRange[1].strongerGlue();
  }
}
function purchaseSniperMonkey() {
  if (!currentlyPurchasing && track.money >= 250) {
    currentlyPurchasing = true;
    track.money -= 250; //defense cost
    let newDefense = new SniperMonkey(mouseX, mouseY);
    let newDefensePreview = new DefensePreview(newDefense);
    defensePreviews.push(newDefensePreview);

    //           purchaseDefensePreview(newDefense);
  }
}

function purchaseSuperMonkey() {
  if (!currentlyPurchasing && track.money >= 1000) {
    currentlyPurchasing = true;
    track.money -= 1000; //defense cost
    let newDefense = new SuperMonkey(mouseX, mouseY);
    let newDefensePreview = new DefensePreview(newDefense);
    defensePreviews.push(newDefensePreview);

    //           purchaseDefensePreview(newDefense);
  }
}

function mainMenu() {
  noLoop();
  stroke(0);
  text("MAIN MENU", 40, 40);
}

function checkPreviews() {
  if (defensePreviews.length != 0) {
    stroke("white");
    defensePreviews[0].display();
    let hit = false;
    for (let seg of track.segments) {
      hit = collideRectCircle(
        seg.centerX - 30,
        seg.centerY - 30,
        60,
        60,
        mouseX,
        mouseY,
        defensePreviews[0].defense.size
      );
      if (hit) {
        break;
      }
    }

    let overlap = false;
    for (let def of track.defenses) {
      overlap = collideCircleCircle(
        def.x,
        def.y,
        def.size,
        mouseX,
        mouseY,
        defensePreviews[0].defense.size
      );
      if (overlap) {
        break;
      }
    }

    if (!hit && mouseIsPressed && mouseX < 740 && !overlap) {
      defensePreviews[0].defense.x = mouseX;
      defensePreviews[0].defense.y = mouseY;
      track.defenses.push(defensePreviews[0].defense);
      defensePreviews.splice(0, 1);
      currentlyPurchasing = false;
    }
  }
}



function checkMousePosition() {
  for (let def of track.defenses) {
    if (
      collidePointCircle(mouseX, mouseY, def.x, def.y, def.size) &&
      mouseIsPressed
    ) {
      //show range circle
      showRange = [true, def];

      break;
    } else if (
      !collidePointCircle(mouseX, mouseY, def.x, def.y, def.size) &&
      mouseIsPressed
    ) {
      showRange = [false];
    }
  }
}

function hideShowButtons() {
  if (showRange[1] instanceof DartMonkey) {
    if (!showRange[1].longRange) {
      buttons["Longer Range"].show();
    } else {
      buttons["Longer Range"].hide();
    }
    if (!showRange[1].fastAttackSpeed) {
      buttons["Faster Shooting"].show();
    } else {
    }
    if (!showRange[1].pierce) {
      buttons["Purchase Piercing Darts"].show();
    }

    buttons["Stronger Glue"].hide();
    buttons["Longer Range (Glue)"].hide();
    buttons["Faster Shooting (Sniper)"].hide();
    buttons["Longer Range (Super)"].hide();
  } else if (showRange[1] instanceof GlueGunner) {
    buttons["Stronger Glue"].show();
    if (!showRange[1].stickierGlue) {
      buttons["Stronger Glue"].show();
    } else {
      buttons["Stronger Glue"].hide();
    }
    if (!showRange[1].fastAttackSpeed) {
      buttons["Faster Shooting (Glue)"].show();
    } else {
      buttons["Faster Shooting (Glue)"].hide();
    }
    if (!showRange[1].longRange) {
      buttons["Longer Range (Glue)"].show();
    } else {
      buttons["Longer Range (Glue)"].hide();
    }
    buttons["Faster Shooting"].hide();
    buttons["Longer Range"].hide();
    buttons["Purchase Piercing Darts"].hide();
    buttons["Faster Shooting (Sniper)"].hide();
    buttons["Longer Range (Super)"].hide();
  } else if (showRange[1] instanceof SniperMonkey) {
    if(!showRange[1].fastAttackSpeed){
          buttons["Faster Shooting (Sniper)"].show();

    }else{
          buttons["Faster Shooting (Sniper)"].hide();

    }
    buttons["Faster Shooting"].hide();
    buttons["Longer Range"].hide();
    buttons["Purchase Piercing Darts"].hide();
    buttons["Stronger Glue"].hide();
    buttons["Longer Range (Glue)"].hide();
    buttons["Faster Shooting (Glue)"].hide();
    buttons["Longer Range (Super)"].hide();
  } else if (showRange[1] instanceof SuperMonkey) {
    if(!showRange[1].longRange){
          buttons["Longer Range (Super)"].show();

    }else{
          buttons["Longer Range (Super)"].hide();

    }
    buttons["Faster Shooting"].hide();
    buttons["Longer Range"].hide();
    buttons["Purchase Piercing Darts"].hide();
    buttons["Stronger Glue"].hide();
    buttons["Longer Range (Glue)"].hide();
    buttons["Faster Shooting (Glue)"].hide();
    buttons["Faster Shooting (Sniper)"].hide();
  } else {
    buttons["Faster Shooting"].hide();
    buttons["Longer Range"].hide();
    buttons["Purchase Piercing Darts"].hide();
    buttons["Stronger Glue"].hide();
    buttons["Longer Range (Glue)"].hide();
    buttons["Faster Shooting (Glue)"].hide();
    buttons["Faster Shooting (Sniper)"].hide();
    buttons["Longer Range (Super)"].hide();
  }
}
