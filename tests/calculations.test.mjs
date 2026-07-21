import test from 'node:test';
import assert from 'node:assert/strict';
import { calcResumen, calcSinergia } from '../lib/calculations.js';
import { calcROIModel } from '../lib/roi-calculator.js';
import { calculateMonthlyUsageCost, getAgentPricing } from '../lib/agent-pricing.js';
import { CASOS_DATA } from '../data/casos.js';

const casos = {
  1: { id: 1, s: 'Retail', t: 'Chat', ini: 10_000, rec: 1_000 },
  2: { id: 2, s: 'Retail', t: 'Chat', ini: 20_000, rec: 2_000 },
  3: { id: 3, s: 'Banca', t: 'Voz', ini: 30_000, rec: 3_000 },
};

test('no aplica sinergia a un solo agente', () => {
  assert.deepEqual(calcSinergia([1], casos), { bonus: 0, disc: 0 });
});

test('limita el descuento acumulado por reutilización al 20 por ciento', () => {
  const many = Object.fromEntries(Array.from({ length: 8 }, (_, index) => [index + 1, { s: 'Retail', t: 'Chat' }]));
  assert.deepEqual(calcSinergia(Object.keys(many), many), { bonus: 0, disc: 20 });
});

test('calcula la inversión conjunta sin inventar un retorno', () => {
  const result = calcResumen([1, 2], casos);
  assert.equal(result.invYear1, 66_000);
  assert.ok(Math.abs(result.invBundled - 60_720) < 0.001);
  assert.equal('beneficioInd' in result, false);
  assert.equal('roiBundled' in result, false);
});

test('devuelve un resumen neutro sin seleccion', () => {
  const result = calcResumen([], casos);
  assert.equal(result.invBundled, 0);
  assert.deepEqual(result.selectedCasos, []);
});

test('calcula ROI desde datos operativos y no desde el precio', () => {
  const model = calcROIModel({
    category: 'operacion',
    vars: { operaciones: 2_000, costeOperacion: 8 },
    initialCost: 20_000,
    monthlyCost: 2_000,
    scenario: 'probable',
    factors: { alcance: 60, efectividad: 75, adopcion: 80 },
  });
  assert.equal(model.costePrimerAno, 44_000);
  assert.equal(model.beneficioMensual, 5_760);
  assert.ok(Math.abs(model.roi - 57.090909) < 0.001);
  assert.ok(model.paybackMonths > 5 && model.paybackMonths < 6);
});

test('el escenario conservador produce menos beneficio que el probable', () => {
  const input = { category: 'soporte', vars: { tickets: 3_000, costeTicket: 12 }, initialCost: 20_000, monthlyCost: 2_000, factors: {} };
  const conservative = calcROIModel({ ...input, scenario: 'conservador' });
  const probable = calcROIModel({ ...input, scenario: 'probable' });
  assert.ok(conservative.beneficioAnual < probable.beneficioAnual);
});

test('los 70 agentes tienen una tarifa completa', () => {
  assert.equal(CASOS_DATA.length, 70);
  CASOS_DATA.forEach((caso) => {
    const pricing = getAgentPricing(caso);
    assert.ok(pricing.initial > 0, caso.slug);
    assert.ok(pricing.baseMonthly > 0, caso.slug);
    assert.ok(pricing.included > 0, caso.slug);
    assert.ok(pricing.overage > 0, caso.slug);
    assert.ok(pricing.unit, caso.slug);
  });
});

test('solo factura el consumo que supera la bolsa incluida', () => {
  const pricing = getAgentPricing({ s: 'Retail', t: 'Chat', ini: 14_000, prob: 'Retencion' });
  assert.equal(calculateMonthlyUsageCost(pricing, 800).monthlyTotal, 1_500);
  assert.equal(calculateMonthlyUsageCost(pricing, 1_600).monthlyTotal, 2_040);
});
