/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
  pipe,
  allPass,
  equals,
  prop,
  values,
  count,
  lte,
  converge,
  anyPass,
} from "ramda";

import { SHAPES, COLORS } from "../constants";

const CIRCLE = prop(SHAPES.CIRCLE);
const SQUARE = prop(SHAPES.SQUARE);
const STAR = prop(SHAPES.STAR);
const TRIANGLE = prop(SHAPES.TRIANGLE);

const isBLUE = equals(COLORS.BLUE);
const isGREEN = equals(COLORS.GREEN);
const isORANGE = equals(COLORS.ORANGE);
const isRED = equals(COLORS.RED);
const isWHITE = equals(COLORS.WHITE);

// Фигура есть в SHAPES
// const isFigureValid = (figure) => includes(figure, values(SHAPES));

const countColors = (color) => pipe(values, count(color));

// Check Фигура === Цвет
const isColorEquals = (figure, color) => pipe(figure, color);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  isColorEquals(STAR, isRED),
  isColorEquals(SQUARE, isGREEN),
  isColorEquals(TRIANGLE, isWHITE),
  isColorEquals(CIRCLE, isWHITE),
]);

// Минимальное количество цветов
const minColorsCount = (color, count) => pipe(countColors(color), lte(count));
// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = minColorsCount(isGREEN, 2);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = converge(equals, [
  countColors(isRED),
  countColors(isBLUE),
]);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  isColorEquals(STAR, isRED),
  isColorEquals(SQUARE, isORANGE),
  isColorEquals(CIRCLE, isBLUE),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
  minColorsCount(isRED, 3),
  minColorsCount(isORANGE, 3),
  minColorsCount(isBLUE, 3),
  minColorsCount(isGREEN, 3),
]);

// Равное количество цветов
const equalsColorsCount = (color, count) =>
  pipe(countColors(color), equals(count));
// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  equalsColorsCount(isGREEN, 2),
  equalsColorsCount(isRED, 1),
  isColorEquals(TRIANGLE, isGREEN),
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = minColorsCount(isORANGE, 4);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = () => false;
