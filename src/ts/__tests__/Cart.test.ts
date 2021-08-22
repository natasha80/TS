import Book from '../domain/Book';
import Gadget from '../domain/Gadget';
import Movie from '../domain/Movie';
import MusicAlbum from '../domain/MusicAlbum';
import Cart from '../service/Cart';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('В корзину должен добавиться фильм', () => {
  const cart = new Cart();
  const movie = new Movie(
    1000,
    'The Avengers',
    350,
    2012,
    'USA',
    'Avengers Assemble!',
    ['фантастика', 'боевик', 'фэнтези', 'приключения'],
    '137 мин. / 02:17'
  );
  cart.add(movie);
  expect(cart.items.length).toBe(1);
  expect(cart.items).toEqual([movie]);
  expect(cart.items[0]).toEqual(movie);
})

test('В корзину должны добавиться выбранные элементы', () => {
  const cart = new Cart();
  const movie = new Movie(
    1000,
    'The Avengers',
    350,
    2012,
    'USA',
    'Avengers Assemble!',
    ['фантастика', 'боевик', 'фэнтези', 'приключения'],
    '137 мин. / 02:17'
  );
  const book = new Book(1008, 'You do not know JS', 'Kyle Simpson', 2000, 500);
  const album = new MusicAlbum(1002, 'Давай ограбим счастье', 'Taras', 100);
  cart.add(movie);
  cart.add(book);
  cart.add(album);
  expect(cart.items.length).toBe(3);
  expect(cart.items).toEqual([movie, book, album]);
});

test('Метод getTotalCoast должен вернуть корректное значение', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new Movie(
    1000,
    'The Avengers',
    350,
    2012,
    'USA',
    'Avengers Assemble!',
    ['фантастика', 'боевик', 'фэнтези', 'приключения'],
    '137 мин. / 02:17'
  ));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Book(1009, 'You do not know JS', 'Kyle Simpson', 2000, 500));
  expect(cart.getTotalCoast()).toBe(5250);
  expect(cart.getTotalCoast(10)).toBe(4725);
});

test('Метод deleteItem должен удалить элемент из массива items', () => {
  const cart = new Cart();
  const movie = new Movie(
    1000,
    'The Avengers',
    350,
    2012,
    'USA',
    'Avengers Assemble!',
    ['фантастика', 'боевик', 'фэнтези', 'приключения'],
    '137 мин. / 02:17'
  );
  const book = new Book(1001, 'You do not know JS', 'Kyle Simpson', 1000, 500);
  const album = new MusicAlbum(1002, 'Давай ограбим счастье', 'Taras', 100);
  cart.add(movie);
  cart.add(book);
  cart.add(album);
  cart.deleteItem(1000);
  expect(cart.items.length).toBe(2);
  expect(cart.items).toEqual([book, album]);
});

test('На товары с isQuantiable = true и с одинаковыми id, не должно быть ограничения по количеству', () => {
  const cart = new Cart();
  const phone1 = new Gadget(2222, 'phone', 120000, 'iPhone 12', true);
  const phone2 = new Gadget(2222, 'phone', 120000, 'iPhone 12', true);
  const phone3 = new Gadget(2222, 'phone', 120000, 'iPhone 12', true);
  cart.add(phone1);
  cart.add(phone2);
  cart.add(phone3);
  expect(cart.items.length).toBe(3);
  expect(cart.items).toEqual([phone1, phone2, phone3]);
});

test('У товаров без isQuantiable и с одинаковыми id, при добавлении в корзину кол-во всегда должно быть 1', () => {
  const cart = new Cart();
  const book1 = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);
  const book2 = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);
  const book3 = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);
  cart.add(book1);
  cart.add(book2);
  cart.add(book3);
  expect(cart.items.length).toBe(1);
  expect(cart.items).toEqual([book1]);
});

test('У товаров без isQuantiable но с разными id, не должно быть ограничений по кол-ву', () => {
  const cart = new Cart();
  const book1 = new Book(1001, 'War and Piece part 1', 'Leo Tolstoy', 2000, 1225);
  const book2 = new Book(1002, 'War and Piece part 2', 'Leo Tolstoy', 2000, 1225);
  const book3 = new Book(1003, 'War and Piece part 3', 'Leo Tolstoy', 2000, 1225);
  cart.add(book1);
  cart.add(book2);
  cart.add(book3);
  expect(cart.items.length).toBe(3);
  expect(cart.items).toEqual([book1, book2, book3]);
});

test('Удаление одинаковых товаров должно быть корректным', () => {
  const cart = new Cart();
  const phone1 = new Gadget(2222, 'phone', 120000, 'iPhone 12', true);
  const phone2 = new Gadget(2222, 'phone', 120000, 'iPhone 12', true);
  const phone3 = new Gadget(2222, 'phone', 120000, 'iPhone 12', true);
  cart.add(phone1);
  cart.add(phone2);
  cart.add(phone3);
  cart.deleteItem(1001);
  expect(cart.items.length).toBe(2);
  expect(cart.items).toEqual([phone2, phone3]);
});