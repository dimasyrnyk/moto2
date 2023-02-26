import React from "react";

export default function Returns() {
  return (
    <>
      <h2>Повернення</h2>
      <br />
      <p>
        Повернути товар у магазин (або обміняти його на інший аналогічний)
        можна протягом 14 днів із дня покупки.
        Це правило поширюється на товари належної якості, тобто невикористані та непошкоджені.
        <br />
        <br />
        Обмін товару здійснюється за наступних умов:
      </p>
      <ul className="page__description__list">
          <li>
            Товар, який покупець бажає обміняти, необхідно відправити службою доставки «Нова Пошта»
            або «Укрпошта» разом з заповненим бланком на обмін / повернення товару, який був отриманий
            покупцем разом із замовленням. Замовлення можна обміняти повністю або частково.
            Якщо замовлення було сформовано на кілька позицій, покупець відправляє тільки той товар,
            який необхідно обміняти і вказати його (їх) в бланку на обмін / повернення товару.
          </li>
          <li>Відправлення посилки з товаром для обміну здійснюється за рахунок покупця.</li>
          <li>Посилку з обміном необхідно відправити службою доставки «Нова Пошта» або «Укрпошта» без післяплати.</li>
          <li>
            Якщо одиниця товару не має слідів використання, прання, не має забруднень і пошкоджень, отримана в
            заводській упаковці і було збережено усі бирки та ярлики - в цьому випадку вона підлягає обміну.
          </li>
          <li>
            Якщо товар відповідає умовам п.4 і підлягає обміну, посилка з обміном буде відправлена ​​покупцеві тим
            самим способом, яким було отримано замовлення. Відправлення посилки з обміном здійснюється в термін
            від одного до семи робочих днів, з моменту отримання посилки з товаром для обміну.
          </li>
        </ul>
    </>
  );
}