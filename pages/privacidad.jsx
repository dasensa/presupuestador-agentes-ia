import Head from 'next/head';
import Link from 'next/link';

export default function PrivacidadPage() {
  return <>
    <Head><title>Politica de privacidad — AgentIA</title><meta name="robots" content="noindex" /></Head>
    <article className="mx-auto max-w-3xl px-4 py-28 text-slate-700">
      <h1 className="font-serif text-5xl text-slate-950">Politica de privacidad</h1>
      <p className="mt-6">AgentIA trata los datos enviados mediante sus formularios para responder consultas, preparar simulaciones solicitadas y mantener comunicaciones relacionadas con ellas. La base juridica es tu solicitud y, cuando corresponda, tu consentimiento.</p>
      <h2 className="mt-8 font-serif text-2xl text-slate-950">Datos y conservacion</h2>
      <p className="mt-3">Podemos tratar nombre, email profesional, empresa, telefono y datos de la simulacion. Se conservaran durante el tiempo necesario para atender la solicitud y cumplir obligaciones legales.</p>
      <h2 className="mt-8 font-serif text-2xl text-slate-950">Proveedores y derechos</h2>
      <p className="mt-3">El correo se gestiona mediante Resend como proveedor tecnico. Puedes solicitar acceso, rectificacion, supresion, limitacion u oposicion escribiendo a <a className="text-blue-600" href="mailto:info@agentia.es">info@agentia.es</a>.</p>
      <p className="mt-8 text-sm text-amber-700">Antes de publicar, completa la identidad juridica, NIF y domicilio del responsable del tratamiento.</p>
      <Link href="/" className="mt-8 inline-block text-blue-600">Volver al inicio</Link>
    </article>
  </>;
}
