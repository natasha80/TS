import Cart from './service/Cart';
import Book from './domain/Book';
import MusicAlbum from './domain/MusicAlbum';
import Gadget from './domain/Gadget';

const cart = new Cart();
console.log(cart.items);

cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
cart.add(new Gadget(2222, 'phone', 120000, 'iPhone 12', true));
cart.add(new Gadget(2222, 'phone', 120000, 'iPhone 12', true));
console.log(cart.items);

console.log(cart.getTotalCoast());
console.log(cart.getTotalCoast(10));

cart.deleteItem(2222);
console.log(cart.items);