/**
 * Plantilla HTML del correo que llega desde el formulario de contacto.
 * Solo tablas y estilos inline: es lo único que Gmail/Outlook respetan.
 * Todo lo que escribe el visitante pasa por `escapeHtml`.
 */

const ACCENT = "#22c55e";
const ACCENT_DARK = "#15803d";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function contactEmail({
  name,
  email,
  message,
  siteUrl,
}: {
  name: string;
  email: string;
  message: string;
  siteUrl: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");
  const date = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Merida",
  }).format(new Date());

  const subject = `Portafolio · mensaje de ${name}`;
  const text = `${message}\n\n— ${name} <${email}>\n${date}`;

  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1c1f26;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e3e8e5;">
          <tr>
            <td style="height:6px;background:${ACCENT};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:${ACCENT_DARK};font-weight:600;">Portafolio · nuevo mensaje</p>
              <h1 style="margin:0;font-size:22px;line-height:1.3;font-weight:600;">${safeName} te escribió</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#6b7280;">${escapeHtml(date)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;">
                <tr>
                  <td style="padding:6px 0;color:#6b7280;width:88px;">Nombre</td>
                  <td style="padding:6px 0;font-weight:500;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;">Correo</td>
                  <td style="padding:6px 0;"><a href="mailto:${safeEmail}" style="color:${ACCENT_DARK};text-decoration:none;font-weight:500;">${safeEmail}</a></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 32px 28px;">
              <div style="background:#f4f7f5;border-left:4px solid ${ACCENT};border-radius:8px;padding:16px 18px;font-size:15px;line-height:1.6;white-space:normal;">${safeMessage}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;">
              <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display:inline-block;background:${ACCENT};color:#0b1a10;text-decoration:none;font-weight:600;font-size:14px;padding:11px 20px;border-radius:999px;">Responder a ${safeName}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #e3e8e5;font-size:12px;color:#6b7280;">
              Enviado desde el formulario de contacto de <a href="${escapeHtml(siteUrl)}" style="color:${ACCENT_DARK};text-decoration:none;">tu portafolio</a>. Puedes responder directamente a este correo.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
