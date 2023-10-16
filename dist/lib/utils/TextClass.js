class textClass {
    constructor() {
        this.text = null;
        this.font = "Arial";
        this.fontSize = 12;
        this.fontColor = "#000";
        this.textAlign = "center";
        this.textBaseline = "middle";
        this.scaleRelativeToZoomLevel = true;
        this.setText = (text) => {
            this.text = text;
            return this;
        };
        this.setFontSize = (fontSize) => {
            this.fontSize = fontSize;
            return this;
        };
        this.setFontColor = (fontColor) => {
            this.fontColor = fontColor;
            return this;
        };
        this.setFont = (font) => {
            this.font = font;
            return this;
        };
        this.setTextAlign = (textAlign) => {
            this.textAlign = textAlign;
            return this;
        };
        this.setTextBaseline = (textBaseline) => {
            this.textBaseline = textBaseline;
            return this;
        };
        this.setScaleRelativeToZoomLevel = (scale) => {
            this.scaleRelativeToZoomLevel = scale;
            return this;
        };
        this.getText = () => {
            return this.text;
        };
        this.getFontSize = () => {
            return this.fontSize;
        };
        this.getFontColor = () => {
            return this.fontColor;
        };
        this.getFont = () => {
            return this.font;
        };
        this.getTextAlign = () => {
            return this.textAlign;
        };
        this.getTextBaseline = () => {
            return this.textBaseline;
        };
        this.getScaleRelativeToZoomLevel = () => {
            return this.scaleRelativeToZoomLevel;
        };
    }
}
export default textClass;
//# sourceMappingURL=TextClass.js.map