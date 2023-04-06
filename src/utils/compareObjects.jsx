export const compareObjects = (obj1, obj2) => {
  // Получаем ключи свойств каждого объекта
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  // Если количество ключей разное, объекты не равны
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  // Рекурсивно сравниваем каждого свойства и его значение
  for (let key of obj1Keys) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    // Если значение является объектом, вызываем функцию compareObjects рекурсивно
    if (typeof val1 === 'object' && typeof val2 === 'object') {
      const objectsEqual = compareObjects(val1, val2);
      if (!objectsEqual) {
        return false;
      }
    } else if (val1 !== val2) { // Если значение не является объектом, проверяем на равенство
      return false;
    }
  }

  return true;
} 