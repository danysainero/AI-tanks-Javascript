"use strict";

async function main(tank) {

  // variables
  const ARENA_WIDTH = 1340;
  const ARENA_HEIGHT = 1000;
  const BREAK_DISTANCE = 160;
  const MAX_SCAN_ANGLE = 10;
  const MAX_SAFETY_SPEED = 69;
  const BREAK_SPEED = 0;

  const SAFETY_AREA = {
    left: (BREAK_DISTANCE + 50),
    rigth: (ARENA_WIDTH - (BREAK_DISTANCE + 50)),
    bottom: BREAK_DISTANCE,
    top: (ARENA_HEIGHT - BREAK_DISTANCE),
  };

  const ANGLE_DIRECTION = {
    left: 180,
    right: 0,
    top: 90,
    bottom: 270
  }

  // auxiliary functions

  async function moveController(tank) {

    //Start drive
    let x = await tank.getX();
    if (x >= (ARENA_WIDTH / 2)) {
      await tank.drive(ANGLE_DIRECTION.right, MAX_SAFETY_SPEED);
    } else {
      await tank.drive(ANGLE_DIRECTION.left, MAX_SAFETY_SPEED);
    }

    //Drive top
    if (await tank.getX() > SAFETY_AREA.rigth) {
      console.log('drive top');
      await tank.drive(ANGLE_DIRECTION.right, BREAK_SPEED);
      while (await tank.getY() < SAFETY_AREA.top) {
        await tank.drive(ANGLE_DIRECTION.top, MAX_SAFETY_SPEED);
        await scanController(ANGLE_DIRECTION.left, tank);
      }
    }

    //Drive left
    if (await tank.getY() > SAFETY_AREA.top) {
      console.log('drive left');
      await tank.drive(ANGLE_DIRECTION.left, BREAK_SPEED);
      while (await tank.getX() > SAFETY_AREA.left) {
        await tank.drive(ANGLE_DIRECTION.left, MAX_SAFETY_SPEED);
        await scanController(ANGLE_DIRECTION.bottom, tank);
      }
    }

    //Drive down
    if (await tank.getX() < SAFETY_AREA.left) {
      await tank.drive(ANGLE_DIRECTION.bottom, BREAK_SPEED);
      while (await tank.getY() > SAFETY_AREA.bottom) {
        await tank.drive(ANGLE_DIRECTION.bottom, MAX_SAFETY_SPEED);
        await scanController(ANGLE_DIRECTION.right, tank);
      }
    }

    //Drive right
    if (await tank.getX() < SAFETY_AREA.bottom) {
      await tank.drive(ANGLE_DIRECTION.right, BREAK_SPEED);
      while (await tank.getX() < SAFETY_AREA.rigth) {
        await tank.drive(ANGLE_DIRECTION.right, MAX_SAFETY_SPEED);
        await scanController(ANGLE_DIRECTION.top, tank);
      }
    }
  }

  async function scanController(angle, tank) {
    let scanResult = await tank.scan((angle), MAX_SCAN_ANGLE);
  }

  // main loop
  while (true) {
    await moveController(tank);
  }
}