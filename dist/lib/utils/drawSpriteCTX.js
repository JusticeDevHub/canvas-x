const drawSpriteCTX = (ctx, sprite, x, y, width, height) => {
    ctx.save();
    const scale = { width: 1, height: 1 };
    const translate = { x: 0, y: 0 };
    if (width < 0) {
        scale.width = -1;
        translate.x = x * 2;
    }
    if (height < 0) {
        scale.height = -1;
        translate.y = y * 2;
    }
    ctx.translate(translate.x, translate.y);
    ctx.scale(scale.width, scale.height);
    ctx.drawImage(sprite, x, y, Math.abs(width), Math.abs(height));
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();
};
export default drawSpriteCTX;
//# sourceMappingURL=drawSpriteCTX.js.map