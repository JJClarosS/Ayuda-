
export function LocationSection() {
  return (
    <section className="py-12 bg-card">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título centrado */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground">Nuestra Ubicación</h2>
        </div>

        {/* Contenedor principal con grid centrado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-items-center">
          {/* Información de la ubicación */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-foreground">¡Visítanos!</h3>
            <p className="text-muted-foreground text-lg">
              Encuéntranos en nuestra sucursal principal:
            </p>
            <address className="text-foreground font-medium not-italic space-y-2 text-lg">
              <a
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51801.15056595517!2d-68.19840467832037!3d-16.510150400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f206233a37eed%3A0xb1e52e893f6777c0!2sMr.%20Pizza!5e1!3m2!1ses!2sbo!4v1761641736074!5m2!1ses!2sbo"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-destructive transition-colors underline decoration-2 underline-offset-2"
              >
                AV. HERNANDO SILES ESQ CALLE 9<br />
                EDIF. VISION MODERNA<br />
                La Paz, Bolivia
              </a>
            </address>
            <p className="text-muted-foreground text-lg">
              ¡Te esperamos para que disfrutes del Señor Sabor!
            </p>
          </div>

          {/* Mapa Embed centrado */}
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51801.15056595517!2d-68.19840467832037!3d-16.510150400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f206233a37eed%3A0xb1e52e893f6777c0!2sMr.%20Pizza!5e1!3m2!1ses!2sbo!4v1761641736074!5m2!1ses!2sbo"
              width="400"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl shadow-lg border-0"
              title="Ubicación de Mr. Pizza en Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  );
}