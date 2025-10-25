-- CreateTable
CREATE TABLE "Permiso" (
    "id_permiso" SERIAL NOT NULL,
    "nombre_permiso" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Permiso_pkey" PRIMARY KEY ("id_permiso")
);

-- CreateTable
CREATE TABLE "RolPermiso" (
    "id_rol" INTEGER NOT NULL,
    "id_permiso" INTEGER NOT NULL,

    CONSTRAINT "RolPermiso_pkey" PRIMARY KEY ("id_rol","id_permiso")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permiso_nombre_permiso_key" ON "Permiso"("nombre_permiso");

-- AddForeignKey
ALTER TABLE "RolPermiso" ADD CONSTRAINT "RolPermiso_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "roles"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolPermiso" ADD CONSTRAINT "RolPermiso_id_permiso_fkey" FOREIGN KEY ("id_permiso") REFERENCES "Permiso"("id_permiso") ON DELETE RESTRICT ON UPDATE CASCADE;
