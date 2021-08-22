import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
      if (!this.getItem(item.id) || item.isQuantiable) {
        this._items.push(item);
      }
    }

    getItem(id: number): Buyable | undefined {
      return this.items.find((elem) => elem.id === id);
    }

    getTotalCoast(discount?: number): number {
      const totalSum = this.items.reduce((acc, prev) => acc + prev.price, 0);
      if (!discount) {
        return totalSum;
      }
      return totalSum - ((totalSum / 100) * discount);
    }

    deleteItem(id: number): void {
      const idx = this.items.findIndex((elem) => elem.id === id);
      this._items.splice(idx, 1);
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }
}