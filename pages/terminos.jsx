import Head from 'next/head';
import Link from 'next/link';

export default function TerminosPage() {
  return <>
    <Head><title>Terminos de servicio — AgentIA</title><meta name="robots" content="noindex" /></Head>
    <article className="mx-auto max-w-3xl px-4 py-28 text-slate-700">
      <h1 className="font-serif text-5xl text-slate-950">Terminos de servicio</h1>
      <p className="mt-6">Las cifras mostradas por AgentIA son simulaciones preliminares basadas en supuestos generales y en los datos introducidos por el usuario. No constituyen una oferta contractual, asesoramiento financiero ni una garantia de ahorro, rentabilidad o plazo.</p>
      <h2 className="mt-8 font-serif text-2xl text-slate-950">Validacion</h2>
      <p className="mt-3">Toda propuesta definitiva requiere analizar procesos, integraciones, costes, riesgos y restricciones de la organizacion. Los precios y resultados pueden variar tras esa validacion.</p>
      <h2 className="mt-8 font-serif text-2xl text-slate-950">Uso aceptable</h2>
      <p className="mt-3">No se permite utilizar los formularios o servicios para enviar spam, introducir contenido malicioso, interferir con la plataforma o vulnerar derechos de terceros.</p>
      <p className="mt-8 text-sm text-amber-700">Antes de publicar, completa el aviso legal con la identidad juridica, NIF, domicilio y jurisdiccion aplicable.</p>
      <Link href="/" className="mt-8 inline-block text-blue-600">Volver al inicio</Link>
    </article>
  </>;
}
