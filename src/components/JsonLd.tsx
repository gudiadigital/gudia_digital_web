/**
 * Sayfanın yapılandırılmış verisi (schema.org, JSON-LD).
 *
 * Next'in JSON-LD rehberine göre next/script değil düz <script>: bu
 * çalıştırılacak kod değil, veri. "<" kaçırılıyor; metnin içinde
 * "</script>" geçerse etiket erken kapanıp sayfa bozulmasın.
 *
 * Her sayfa bunu yalnızca bir kez, kendi içeriğinin başında çiziyor.
 * layout'a konmuyor: orada her sayfaya ikinci bir kopya eklenirdi.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
