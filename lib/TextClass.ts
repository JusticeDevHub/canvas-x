class textClass {
  text: string | null = null;
  font: string = "Arial";
  fontSize: number = 12;
  fontColor: string = "#000";
  textAlign: CanvasTextAlign = "center";
  textBaseline: CanvasTextBaseline = "middle";
  scaleRelativeToZoomLevel: boolean = true;

  setText = (text: string) => {
    this.text = text;
    return this;
  };

  setFontSize = (fontSize: number) => {
    this.fontSize = fontSize;
    return this;
  };

  setFontColor = (fontColor: string) => {
    this.fontColor = fontColor;
    return this;
  };

  setFont = (font: string) => {
    this.font = font;
    return this;
  };

  setTextAlign = (textAlign: CanvasTextAlign) => {
    this.textAlign = textAlign;
    return this;
  };

  setTextBaseline = (textBaseline: CanvasTextBaseline) => {
    this.textBaseline = textBaseline;
    return this;
  };

  setScaleRelativeToZoomLevel = (scale: boolean) => {
    this.scaleRelativeToZoomLevel = scale;
    return this;
  };

  getText = () => {
    return this.text;
  };

  getFontSize = () => {
    return this.fontSize;
  };

  getFontColor = () => {
    return this.fontColor;
  };

  getFont = () => {
    return this.font;
  };

  getTextAlign = () => {
    return this.textAlign;
  };

  getTextBaseline = () => {
    return this.textBaseline;
  };

  getScaleRelativeToZoomLevel = () => {
    return this.scaleRelativeToZoomLevel;
  };
}

export default textClass;
