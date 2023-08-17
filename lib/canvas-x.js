"use-strict";

class CanvasObject {
  loopId;

  constructor(onCreate, onUpdate) {
    onCreate();

    function updateLoop() {
      onUpdate();
      this.loopId = requestAnimationFrame(updateLoop);
    }
    this.loopId = requestAnimationFrame(updateLoop);
  }

  delete = function () {
    cancelAnimationFrame(this.loopId);
  };
}

class CanvasXClass {
  width = 0;
  height = 0;
  canvasObjects = [];

  constructor() {}

  setCanvasWidth = function (width) {
    this.width = width;
  };

  setCanvasHeight = function (height) {
    this.height = height;
  };

  setCanvasSize = function (width, height) {
    this.setCanvasWidth(width);
    this.setCanvasHeight(height);
  };

  createObject = function () {
    const newObj = new CanvasObject(() => {
      console.log("Object Created");
    });
    this.canvasObjects.push(newObj);
    return newObj;
  };
}

module.exports = new CanvasXClass();
