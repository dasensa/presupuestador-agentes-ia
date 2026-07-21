import test from 'node:test';
import assert from 'node:assert/strict';
import { calcBeneficio, calcResumen, calcSinergia } from '../lib/calculations.js';

const casos = {
  1: { id: 1, s: 'Retail', t: 'Chat', ini: 10_000, rec: 1_000 },
  2: { id: 2, s: 'Retail', t: 'Chat', ini: 20_000, rec: 2_000 },
  3: { id: 3, s: 'Banca', t: 'Voz', ini: 30_000, rec: 3_000 },
};

test('no aplica sinergia a un solo agente', () => {
  assert.deepEqual(calcSinergia([1], casos), { bonus: 0, disc: 0 });
});

test('limita los acumulados de sinergia al 50 por ciento', () => {
  const many = Object.fromEntries(Array.from({ length: 8 }, (_, index) => [index + 1, { s: 'Retail', t: 'Chat' }]));
  assert.deepEqual(calcSinergia(Object.keys(many), many), { bonus: 50, disc: 50 });
});

test('calcula inversion y ROI bundled de forma consistente', () => {
  const result = calcResumen([1, 2], casos);
  assert.equal(result.invYear1, 66_000);
  assert.ok(Math.abs(result.invBundled - 44_220) < 0.001);
  assert.equal(result.beneficioInd, calcBeneficio('Chat', 10_000, 1_000) + calcBeneficio('Chat', 20_000, 2_000));
  assert.ok(Number.isFinite(result.roiBundled));
});

test('devuelve un resumen neutro sin seleccion', () => {
  const result = calcResumen([], casos);
  assert.equal(result.invBundled, 0);
  assert.equal(result.roiBundled, 0);
  assert.deepEqual(result.selectedCasos, []);
});
