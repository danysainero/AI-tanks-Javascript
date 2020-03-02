"use strict";

async function main(tank) {

  // variables
  const ARENA_WIDTH = 1340;
  const ARENA_HEIGHT = 1000;
  const BREAK_DISTANCE = 100;

  const SAFETY_AREA = {
    left: BREAK_DISTANCE,
    rigth: (ARENA_WIDTH - BREAK_DISTANCE),
    bottom: BREAK_DISTANCE,
    top: (ARENA_HEIGHT - BREAK_DISTANCE),
  };

  // auxiliary functions

  async function moveController(tank) {

    let x = await tank.getX();
    let y = await tank.getY();

    if (x >= (ARENA_WIDTH / 2)) {
      await tank.drive(0, 49);
    } else {
      await tank.drive(180, 49);
    }

    if (await tank.getX() > SAFETY_AREA.rigth) {
      await tank.drive(90, 49);
      while (await tank.getY() < SAFETY_AREA.top) {
        await tank.drive(90, 49);
      }
    }

     if (await tank.getY() > SAFETY_AREA.top) {
      await tank.drive(180, 49);
      while (await tank.getX() > SAFETY_AREA.left) {
        await tank.drive(180, 49);
      }
    }

     if (await tank.getX() < SAFETY_AREA.left) {
      await tank.drive(270, 49);
      while (await tank.getY() > SAFETY_AREA.bottom) {
        await tank.drive(270, 49);
      }
    }

    if (await tank.getX() < SAFETY_AREA.bottom) {
      console.log('bottom');
      
      await tank.drive(0, 49);
      while (await tank.getX() < SAFETY_AREA.rigth) {
        await tank.drive(0, 49);
      }
    }
  }

  
  // main loop
  while (true) {
    await moveController(tank);
  }
}
