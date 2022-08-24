export const getCardNumber = (): string => {
  let result = '';

  [0, 1, 2, 3].forEach(item => {
    const randomNums = (Math.random() * 9999).toFixed(0); // генерируем случайные цифры от 0 до 9999 и обрезаем до целого числа
    // разворачиваем в новый массив и добавляем нули обрезаем до 4 цифр и возвращаем строку
    const fixedNums = [...randomNums.split(''), '0', '0', '0'].slice(0, 4).reverse().join('');

    item !== 0 ? (result += ` ${fixedNums}`) : (result += fixedNums); // добавляем пробел
  });

  return result;
};
