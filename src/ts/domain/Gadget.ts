import Buyable from "./Buyable";

export default class Gadget implements Buyable {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly price: number,
    readonly model: string,
    readonly isQuantiable: boolean
  ) {}
}