import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
      if (!this.getItem(item.id) || item.isQuantiable) {
        this._items.push(item);
      }
    }

    getItem(id: number): Buyable | undefined {
      return this.items.find((elem: Buyable) => elem.id === id);
    }

    getTotalCoast(discount?: number): number {
      const totalSum = this.items.reduce((acc: number, prev: Buyable) => acc + prev.price, 0);
      if (!discount) {
        return totalSum;
      }
      return totalSum - ((totalSum / 100) * discount);
    }

    deleteItem(id: number): void {
      this._items = this._items.filter((element: Buyable) => element.id === id);
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }
}