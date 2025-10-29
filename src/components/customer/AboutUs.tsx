
export function AboutUsSection() {
  return (
    <section className="py-12 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título con subrayado decorativo */}
        <h2 className="text-3xl font-bold text-foreground text-center mb-10">
          Sobre Nosotros: <span className="text-destructive">Mr. Pizza</span>
          <span className="block w-16 h-1 bg-destructive mt-3 mx-auto rounded"></span>
        </h2>

        {/* Contenido optimizado */}
        <div className="bg-card shadow-sm rounded-lg p-6 space-y-6 text-base text-muted-foreground">
          <p className="leading-relaxed text-lg">
            Bienvenidos a <span className="font-medium text-destructive">Mr. Pizza</span>, donde nuestra pasión es crear la pizza perfecta, o como nos gusta llamarla: <span className="italic text-destructive">¡El Señor Sabor!</span>
          </p>
          <p className="leading-relaxed text-lg">
            Nuestra historia comenzó hace más de 20 años con una simple misión: traer a la ciudad un sabor auténtico utilizando solo los ingredientes más frescos. Nuestra masa se prepara a diario, nuestra salsa de tomate utiliza tomates seleccionados y nuestros quesos son de la más alta calidad.
          </p>
          <p className="leading-relaxed text-lg">
            No somos solo una pizzería, somos parte de la comunidad. Gracias por elegirnos y permitirnos ser parte de tus cenas familiares, reuniones con amigos y momentos especiales.
          </p>
        </div>
      </div>
    </section>
  );
}