const onWheelScroll = (canvasObject, wheelScroll) => {
    const wheelSroll = canvasObject.getOnWheelScroll();
    if (wheelSroll) {
        if (JSON.stringify(wheelScroll) !== JSON.stringify({ x: 0, y: 0 })) {
            wheelSroll(canvasObject, wheelScroll);
        }
    }
};
export default onWheelScroll;
//# sourceMappingURL=onWheelScroll.js.map