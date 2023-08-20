export default class VariableClass {
  #variables: { [key: string]: any } = {};

  getVariableValue = (key: string) => {
    return this.#variables[key];
  };

  setVariableValue = (key: string, value: any) => {
    this.#variables[key] = value;
  };
}
