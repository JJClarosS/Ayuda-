-- Created by Redgate Data Modeler (https://datamodeler.redgate-platform.com)
-- Last modification date: 2025-10-23 01:28:37.101

-- tables
-- Table: almacenes
CREATE TABLE almacenes (
    id_almacen serial  NOT NULL,
    nombre varchar(100)  NOT NULL,
    direccion text  NOT NULL,
    ciudad varchar(100)  NOT NULL,
    telefono varchar(20)  NULL,
    responsable varchar(100)  NULL,
    tipo varchar(50)  NOT NULL,
    activo boolean  NOT NULL DEFAULT true,
    fecha_apertura date  NOT NULL DEFAULT current_date,
    CONSTRAINT almacenes_nombre_unique UNIQUE (nombre) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT CHECK_1 CHECK (( tipo IN ( 'Principal' , 'Sucursal' , 'Depósito' ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT almacenes_pk PRIMARY KEY (id_almacen)
);

-- Table: categorias
CREATE TABLE categorias (
    id_categoria serial  NOT NULL,
    nombre varchar(50)  NOT NULL,
    descripcion text  NULL,
    activo boolean  NOT NULL DEFAULT true,
    CONSTRAINT AK_4 UNIQUE (nombre) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT categorias_pk PRIMARY KEY (id_categoria)
);

-- Table: clientes
CREATE TABLE clientes (
    id_cliente serial  NOT NULL,
    id_usuario integer  NULL,
    nombre varchar(100)  NOT NULL,
    apellido varchar(100)  NULL,
    telefono varchar(20)  NOT NULL,
    email varchar(150)  NULL,
    direccion text  NULL,
    ciudad varchar(100)  NULL,
    codigo_postal varchar(10)  NULL,
    fecha_registro timestamp  NULL DEFAULT current_timestamp,
    puntos_fidelidad integer  NULL DEFAULT 0,
    activo boolean  NOT NULL DEFAULT true,
    CONSTRAINT AK_3 UNIQUE (id_usuario) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT clientes_pk PRIMARY KEY (id_cliente)
);

-- Table: comentarios
CREATE TABLE comentarios (
    id_comentario serial  NOT NULL,
    id_pedido integer  NOT NULL,
    id_cliente integer  NOT NULL,
    calificacion integer  NULL,
    comentario text  NULL,
    fecha_comentario timestamp  NULL DEFAULT current_timestamp,
    CONSTRAINT CHECK_11 CHECK (( ( calificacion BETWEEN 1 AND 5 ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT comentarios_pk PRIMARY KEY (id_comentario)
);

-- Table: compras
CREATE TABLE compras (
    id_compra serial  NOT NULL,
    id_proveedor integer  NOT NULL,
    id_empleado integer  NOT NULL,
    id_almacen integer  NOT NULL,
    fecha_compra timestamp  NOT NULL DEFAULT current_timestamp,
    total decimal(10,2)  NOT NULL,
    estado varchar(20)  NOT NULL DEFAULT 'pendiente',
    notas text  NULL,
    CONSTRAINT CHECK_3 CHECK (( ( estado IN ( 'Pendiente' , 'Recibida' , 'Cancelada' ) ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT compras_pk PRIMARY KEY (id_compra)
);

-- Table: detalle_compras
CREATE TABLE detalle_compras (
    id_detalle_compra serial  NOT NULL,
    id_compra integer  NOT NULL,
    id_ingrediente integer  NOT NULL,
    cantidad decimal(10,2)  NOT NULL,
    precio_unitario decimal(10,2)  NOT NULL,
    subtotal decimal(10,2)  NOT NULL,
    CONSTRAINT detalle_compras_pk PRIMARY KEY (id_detalle_compra)
);

-- Table: detalle_pedidos
CREATE TABLE detalle_pedidos (
    id_detalle serial  NOT NULL,
    id_producto_tamano integer  NOT NULL,
    id_pedido integer  NOT NULL,
    cantidad integer  NOT NULL,
    precio_unitario decimal(10,2)  NOT NULL,
    subtotal decimal(10,2)  NOT NULL,
    ingredientes_extra text  NULL,
    notas text  NULL,
    CONSTRAINT detalle_pedidos_pk PRIMARY KEY (id_detalle)
);

CREATE INDEX idx_detalle_pedido on detalle_pedidos (id_pedido ASC);

-- Table: empleados
CREATE TABLE empleados (
    id_empleado serial  NOT NULL,
    id_usuario integer  NOT NULL,
    id_almacen integer  NULL,
    fecha_contratacion date  NOT NULL,
    salario decimal(10,2)  NOT NULL,
    turno varchar(20)  NOT NULL,
    estado varchar(20)  NOT NULL DEFAULT 'activo',
    activo boolean  NOT NULL,
    CONSTRAINT AK_2 UNIQUE (id_usuario) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT CHECK_0 CHECK (( ( turno IN ( 'Mañana' , 'Tarde' , 'Noche' , 'Rotativo' ) ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT CHECK_100 CHECK (( ( estado IN ( 'Activo' , 'Inactivo' , 'Vacaciones' , 'Licencia' ) ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT empleados_pk PRIMARY KEY (id_empleado)
);

-- Table: entregas
CREATE TABLE entregas (
    id_entrega serial  NOT NULL,
    id_pedido integer  NOT NULL,
    id_repartidor integer  NOT NULL,
    hora_salida timestamp  NULL,
    hora_entrega timestamp  NULL,
    estado varchar(20)  NOT NULL DEFAULT 'asignado',
    comentarios text  NULL,
    CONSTRAINT AK_10 UNIQUE (id_pedido) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT CHECK_9 CHECK (( ( estado IN ( 'Asignado' , 'En Camino' , 'Entregado' , 'Fallido' ) ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT entregas_pk PRIMARY KEY (id_entrega)
);

-- Table: gastos
CREATE TABLE gastos (
    id_gasto serial  NOT NULL,
    id_almacen integer  NULL,
    tipo_gasto varchar(100)  NOT NULL,
    descripcion text  NULL,
    monto decimal(10,2)  NOT NULL,
    fecha_gasto date  NOT NULL,
    id_empleado integer  NOT NULL,
    factura varchar(100)  NULL,
    CONSTRAINT gastos_pk PRIMARY KEY (id_gasto)
);

-- Table: historial_acciones
CREATE TABLE historial_acciones (
    id_historial serial  NOT NULL,
    id_usuario integer  NOT NULL,
    id_sesion integer  NULL,
    tabla_afectada varchar(100)  NOT NULL,
    id_registro integer  NULL,
    accion varchar(20)  NOT NULL,
    datos_anteriores jsonb  NULL,
    datos_nuevos jsonb  NULL,
    descripcion text  NULL,
    fecha_accion timestamp  NOT NULL DEFAULT current_timestamp,
    ip_address varchar(45)  NULL,
    CONSTRAINT CHECK_3 CHECK (( accion IN ( 'INSERT' , 'UPDATE' , 'DELETE' , 'SELECT' , 'LOGIN' , 'LOGOUT' ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT historial_acciones_pk PRIMARY KEY (id_historial)
);

CREATE INDEX idx_historial_usuario on historial_acciones (id_usuario ASC);

CREATE INDEX idx_historial_tabla on historial_acciones (tabla_afectada ASC);

CREATE INDEX idx_historial_fecha on historial_acciones (fecha_accion ASC);

CREATE INDEX idx_historial_accion on historial_acciones (accion ASC);

-- Table: historial_clientes
CREATE TABLE historial_clientes (
    id_historial_cliente serial  NOT NULL,
    id_cliente integer  NOT NULL,
    tipo_actividad varchar(50)  NOT NULL,
    id_referencia integer  NULL,
    descripcion text  NOT NULL,
    detalles jsonb  NULL,
    fecha_actividad timestamp  NOT NULL DEFAULT current_timestamp,
    ip_address varchar(45)  NULL,
    dispositivo varchar(100)  NULL,
    CONSTRAINT CHECK_4 CHECK (( tipo_actividad IN ( 'Registro' , 'Login' , 'Pedido Creado' , 'Pedido Cancelado' , 'Pago Realizado' , 'Comentario' , 'Cambio Perfil' , 'Agregar Dirección' , 'Cambiar Contraseña' , 'Logout' , 'Reserva Creada' , 'Reserva Cancelada' , 'Puntos Canjeados' ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT historial_clientes_pk PRIMARY KEY (id_historial_cliente)
);

CREATE INDEX idx_historial_clientes_cliente on historial_clientes (id_cliente ASC);

CREATE INDEX idx_historial_clientes_tipo on historial_clientes (tipo_actividad ASC);

CREATE INDEX idx_historial_clientes_fecha on historial_clientes (fecha_actividad ASC);

-- Table: ingredientes
CREATE TABLE ingredientes (
    id_ingrediente serial  NOT NULL,
    nombre varchar(100)  NOT NULL,
    unidad_medida varchar(20)  NOT NULL,
    stock_minimo decimal(10,2)  NOT NULL,
    costo_unitario decimal(10,2)  NOT NULL,
    proveedor varchar(150)  NOT NULL,
    fecha_actualizacion timestamp  NOT NULL DEFAULT current_timestamp,
    activo boolean  NOT NULL,
    CONSTRAINT AK_5 UNIQUE (nombre) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT ingredientes_pk PRIMARY KEY (id_ingrediente)
);

-- Table: inventario_almacen
CREATE TABLE inventario_almacen (
    id_inventario serial  NOT NULL,
    id_almacen integer  NOT NULL,
    id_ingrediente integer  NOT NULL,
    stock_actual decimal(10,2)  NOT NULL DEFAULT 0,
    fecha_actualizacion timestamp  NOT NULL DEFAULT current_timestamp,
    CONSTRAINT inventario_unico UNIQUE (id_almacen, id_ingrediente) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT inventario_almacen_pk PRIMARY KEY (id_inventario)
);

CREATE INDEX idx_inventario_almacen on inventario_almacen (id_almacen ASC);

CREATE INDEX idx_inventario_ingrediente on inventario_almacen (id_ingrediente ASC);

CREATE INDEX idx_inventario_stock on inventario_almacen (stock_actual ASC);

-- Table: mesas
CREATE TABLE mesas (
    id_mesa serial  NOT NULL,
    numero_mesa integer  NOT NULL,
    capacidad integer  NOT NULL,
    ubicacion varchar(50)  NOT NULL,
    estado varchar(20)  NOT NULL DEFAULT 'disponible',
    activo boolean  NOT NULL,
    CONSTRAINT AK_7 UNIQUE (numero_mesa) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT CHECK_4 CHECK (( ( estado IN ( 'Disponible' , 'Ocupada' , 'Reservada' , 'Mantenimiento' ) ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT mesas_pk PRIMARY KEY (id_mesa)
);

-- Table: metodos_pago
CREATE TABLE metodos_pago (
    id_metodo serial  NOT NULL,
    nombre varchar(50)  NOT NULL,
    activo boolean  NOT NULL DEFAULT true,
    CONSTRAINT AK_8 UNIQUE (nombre) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT metodos_pago_pk PRIMARY KEY (id_metodo)
);

-- Table: movimientos_almacen
CREATE TABLE movimientos_almacen (
    id_movimiento serial  NOT NULL,
    id_almacen_origen integer  NOT NULL,
    id_almacen_destino integer  NOT NULL,
    id_ingrediente integer  NOT NULL,
    cantidad decimal(10,2)  NOT NULL,
    tipo_movimiento varchar(50)  NOT NULL,
    motivo text  NULL,
    id_empleado integer  NOT NULL,
    fecha_movimiento timestamp  NOT NULL DEFAULT current_timestamp,
    referencia varchar(100)  NULL,
    CONSTRAINT CHECK_2 CHECK (( tipo_movimiento IN ( 'Entrada' , 'Salida' , 'Traspaso' , 'Ajuste' , 'Merma' ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT movimientos_almacen_pk PRIMARY KEY (id_movimiento)
);

CREATE INDEX idx_movimientos_almacen_origen on movimientos_almacen (id_almacen_origen ASC);

CREATE INDEX idx_movimientos_almacen_destino on movimientos_almacen (id_almacen_destino ASC);

CREATE INDEX idx_movimientos_fecha on movimientos_almacen (fecha_movimiento ASC);

-- Table: pagos
CREATE TABLE pagos (
    id_pago serial  NOT NULL,
    id_pedido integer  NOT NULL,
    id_metodo integer  NOT NULL,
    monto decimal(10,2)  NOT NULL,
    fecha_pago timestamp  NOT NULL DEFAULT current_timestamp,
    referencia varchar(100)  NULL,
    estado varchar(20)  NOT NULL DEFAULT 'completado',
    CONSTRAINT CHECK_8 CHECK (( ( estado IN ( 'Pendiente' , 'Completado' , 'Rechazado' , 'Reembolsado' ) ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT pagos_pk PRIMARY KEY (id_pago)
);

-- Table: pedidos
CREATE TABLE pedidos (
    id_pedido serial  NOT NULL,
    id_cliente integer  NULL,
    id_empleado integer  NOT NULL,
    id_mesa integer  NULL,
    id_almacen integer  NOT NULL,
    tipo_pedido varchar(20)  NOT NULL,
    fecha_pedido timestamp  NOT NULL DEFAULT current_timestamp,
    estado varchar(20)  NOT NULL DEFAULT 'pendiente',
    subtotal decimal(10,2)  NOT NULL,
    descuento decimal(10,2)  NULL DEFAULT 0,
    total decimal(10,2)  NOT NULL,
    direccion_entrega text  NULL,
    notas text  NULL,
    CONSTRAINT CHECK_6 CHECK (( ( tipo_pedido IN ( 'Local' , 'Domicilio' , 'Para Llevar' ) ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT CHECK_7 CHECK (( ( estado IN ( 'Pendiente' , 'En Preparación' , 'Listo' , 'En Camino' , 'Entregado' , 'Cancelado' ) ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT pedidos_pk PRIMARY KEY (id_pedido)
);

CREATE INDEX idx_pedidos_cliente on pedidos (id_cliente ASC);

CREATE INDEX idx_pedidos_fecha on pedidos (fecha_pedido ASC);

CREATE INDEX idx_pedidos_estado on pedidos (estado ASC);

CREATE INDEX idx_pedidos_almacen on pedidos (id_almacen ASC);

-- Table: preferencias_clientes
CREATE TABLE preferencias_clientes (
    id_preferencia serial  NOT NULL,
    id_cliente integer  NOT NULL,
    producto_favorito integer  NULL,
    categoria_favorita integer  NULL,
    tamano_preferido integer  NULL,
    horario_preferido varchar(20)  NULL,
    dia_preferido varchar(20)  NULL,
    frecuencia_pedidos integer  NULL DEFAULT 0,
    ticket_promedio decimal(10,2)  NULL,
    ultimo_pedido date  NULL,
    fecha_actualizacion timestamp  NULL DEFAULT current_timestamp,
    CONSTRAINT AK_20 UNIQUE (id_cliente) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT preferencias_clientes_pk PRIMARY KEY (id_preferencia)
);

CREATE INDEX idx_preferencias_producto on preferencias_clientes (producto_favorito ASC);

CREATE INDEX idx_preferencias_frecuencia on preferencias_clientes (frecuencia_pedidos DESC);

-- Table: producto_tamanos
CREATE TABLE producto_tamanos (
    id_producto_tamano serial  NOT NULL,
    id_producto integer  NOT NULL,
    id_tamano integer  NOT NULL,
    precio decimal(10,2)  NOT NULL,
    disponible boolean  NOT NULL,
    activo boolean  NOT NULL,
    CONSTRAINT producto_tamano_unico UNIQUE (id_producto, id_tamano) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT producto_tamanos_pk PRIMARY KEY (id_producto_tamano)
);

CREATE INDEX idx_producto_tamanos_producto on producto_tamanos (id_producto ASC);

-- Table: productos
CREATE TABLE productos (
    id_producto serial  NOT NULL,
    nombre varchar(100)  NOT NULL,
    descripcion text  NULL,
    id_categoria integer  NOT NULL,
    imagen_url varchar(255)  NULL,
    disponible boolean  NOT NULL DEFAULT true,
    es_promocion boolean  NULL DEFAULT false,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    activo boolean  NOT NULL DEFAULT true,
    CONSTRAINT productos_pk PRIMARY KEY (id_producto)
);

CREATE INDEX idx_productos_categoria on productos (id_categoria ASC);

-- Table: productos_promocion
CREATE TABLE productos_promocion (
    id_producto_promocion serial  NOT NULL,
    id_promocion integer  NOT NULL,
    id_producto integer  NOT NULL,
    CONSTRAINT AK_12 UNIQUE (id_promocion, id_producto) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT productos_promocion_pk PRIMARY KEY (id_producto_promocion)
);

-- Table: promociones
CREATE TABLE promociones (
    id_promocion serial  NOT NULL,
    nombre varchar(100)  NOT NULL,
    descripcion text  NULL,
    tipo_descuento varchar(20)  NULL,
    valor_descuento decimal(10,2)  NOT NULL,
    fecha_inicio date  NOT NULL,
    fecha_fin date  NOT NULL,
    activo boolean  NOT NULL DEFAULT true,
    codigo varchar(50)  NULL,
    CONSTRAINT AK_11 UNIQUE (codigo) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT CHECK_10 CHECK (( ( tipo_descuento IN ( 'Porcentaje' , 'Monto Fijo' ) ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT promociones_pk PRIMARY KEY (id_promocion)
);

-- Table: proveedores
CREATE TABLE proveedores (
    id_proveedor serial  NOT NULL,
    nombre_empresa varchar(150)  NOT NULL,
    contacto varchar(100)  NULL,
    telefono varchar(20)  NOT NULL,
    email varchar(150)  NULL,
    direccion text  NULL,
    ciudad varchar(100)  NULL,
    activo boolean  NOT NULL DEFAULT true,
    CONSTRAINT proveedores_pk PRIMARY KEY (id_proveedor)
);

-- Table: recetas
CREATE TABLE recetas (
    id_receta serial  NOT NULL,
    id_producto_tamano integer  NOT NULL,
    id_ingrediente integer  NOT NULL,
    cantidad decimal(10,2)  NOT NULL,
    activo boolean  NOT NULL,
    CONSTRAINT AK_6 UNIQUE (id_producto_tamano, id_ingrediente) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT recetas_pk PRIMARY KEY (id_receta)
);

CREATE INDEX idx_recetas_producto_tamano on recetas (id_producto_tamano ASC);

-- Table: repartidores
CREATE TABLE repartidores (
    id_repartidor serial  NOT NULL,
    id_empleado integer  NOT NULL,
    vehiculo varchar(50)  NOT NULL,
    placa varchar(20)  NOT NULL,
    licencia varchar(50)  NOT NULL,
    disponible boolean  NOT NULL DEFAULT true,
    activo boolean  NOT NULL DEFAULT true,
    CONSTRAINT AK_9 UNIQUE (id_empleado) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT repartidores_pk PRIMARY KEY (id_repartidor)
);

-- Table: reservas
CREATE TABLE reservas (
    id_reserva serial  NOT NULL,
    id_cliente integer  NOT NULL,
    id_mesa integer  NOT NULL,
    fecha_reserva date  NOT NULL,
    hora_reserva time  NOT NULL,
    numero_personas integer  NOT NULL,
    estado varchar(20)  NOT NULL DEFAULT 'pendiente',
    notas text  NULL,
    fecha_creacion timestamp  NOT NULL DEFAULT current_timestamp,
    activo boolean  NOT NULL,
    CONSTRAINT CHECK_5 CHECK (( ( estado IN ( 'Pendiente' , 'Confirmada' , 'Cancelada' , 'Completada' ) ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT reservas_pk PRIMARY KEY (id_reserva)
);

-- Table: roles
CREATE TABLE roles (
    id_rol serial  NOT NULL,
    nombre_rol varchar(50)  NOT NULL,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    descripcion text  NOT NULL,
    activo boolean  NOT NULL,
    CONSTRAINT AK_0 UNIQUE (nombre_rol) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT roles_pk PRIMARY KEY (id_rol)
);

-- Table: sesiones_usuario
CREATE TABLE sesiones_usuario (
    id_sesion serial  NOT NULL,
    id_usuario integer  NOT NULL,
    fecha_inicio timestamp  NOT NULL DEFAULT current_timestamp,
    fecha_fin timestamp  NOT NULL DEFAULT current_timestamp,
    ip_address varchar(45)  NULL,
    user_agent text  NULL,
    token_sesion varchar(255)  NULL,
    activa boolean  NOT NULL DEFAULT true,
    CONSTRAINT sesiones_usuario_pk PRIMARY KEY (id_sesion)
);

CREATE INDEX idx_sesiones_usuario on sesiones_usuario (id_usuario ASC);

CREATE INDEX idx_sesiones_activas on sesiones_usuario (activa ASC)
    WHERE activa = true;

-- Table: tamano
CREATE TABLE tamano (
    id_tamano serial  NOT NULL,
    nombre varchar(50)  NOT NULL,
    abreviatura varchar(10)  NULL,
    orden integer  NULL,
    descripcion text  NULL,
    activo boolean  NOT NULL DEFAULT true,
    CONSTRAINT tamano_nombre_unique UNIQUE (nombre) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT tamano_pk PRIMARY KEY (id_tamano)
);

-- Table: usuarios
CREATE TABLE usuarios (
    id_usuario serial  NOT NULL,
    nombre varchar(100)  NOT NULL,
    apellido varchar(100)  NOT NULL,
    email varchar(150)  NOT NULL,
    telefono varchar(20)  NULL,
    password_hash varchar(255)  NOT NULL,
    id_rol integer  NOT NULL,
    activo boolean  NOT NULL DEFAULT true,
    fecha_registro timestamp  NOT NULL DEFAULT current_timestamp,
    ultimo_acceso timestamp  NULL,
    CONSTRAINT AK_1 UNIQUE (email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT usuarios_pk PRIMARY KEY (id_usuario)
);

CREATE INDEX idx_usuarios_email on usuarios (email ASC);

-- views
-- View: vista_pedidos_completos
CREATE VIEW vista_pedidos_completos AS
SELECT p.id_pedido, p.fecha_pedido, p.tipo_pedido, p.estado, c.nombre || ' ' || COALESCE(c.apellido, '') AS cliente, c.telefono AS telefono_cliente, u.nombre || ' ' || u.apellido AS empleado, a.nombre AS almacen, p.subtotal, p.total FROM pedidos p LEFT JOIN clientes c ON p.id_cliente = c.id_cliente INNER JOIN empleados e ON p.id_empleado = e.id_empleado INNER JOIN usuarios u ON e.id_usuario = u.id_usuario INNER JOIN almacenes a ON p.id_almacen = a.id_almacen;

-- View: vista_inventario_critico
CREATE VIEW vista_inventario_critico AS
SELECT a.nombre AS almacen, i.nombre AS ingrediente, ia.stock_actual, i.stock_minimo, i.unidad_medida, i.proveedor, ROUND(((i.stock_minimo - ia.stock_actual) / NULLIF(i.stock_minimo, 0) * 100), 2) AS porcentaje_faltante FROM inventario_almacen ia INNER JOIN ingredientes i ON ia.id_ingrediente = i.id_ingrediente INNER JOIN almacenes a ON ia.id_almacen = a.id_almacen WHERE ia.stock_actual <= i.stock_minimo AND i.activo = true ORDER BY porcentaje_faltante DESC;

-- View: vista_ventas_diarias
CREATE VIEW vista_ventas_diarias AS
SELECT DATE(fecha_pedido) AS fecha, COUNT(*) AS num_pedidos, SUM(total) AS total_ventas, AVG(total) AS promedio_venta FROM pedidos WHERE estado != 'Cancelado' GROUP BY DATE(fecha_pedido) ORDER BY fecha DESC;

-- View: vista_inventario_total
CREATE VIEW vista_inventario_total AS
SELECT i.id_ingrediente, i.nombre AS ingrediente, SUM(ia.stock_actual) AS stock_total, i.stock_minimo, i.unidad_medida, i.costo_unitario, SUM(ia.stock_actual) * i.costo_unitario AS valor_inventario, COUNT(DISTINCT ia.id_almacen) AS num_almacenes FROM ingredientes i LEFT JOIN inventario_almacen ia ON i.id_ingrediente = ia.id_ingrediente WHERE i.activo = true GROUP BY i.id_ingrediente, i.nombre, i.stock_minimo, i.unidad_medida, i.costo_unitario ORDER BY i.nombre;

-- View: vista_actividad_usuarios
CREATE VIEW vista_actividad_usuarios AS
SELECT u.id_usuario, u.nombre || ' ' || u.apellido AS usuario, r.nombre_rol AS rol, COUNT(DISTINCT s.id_sesion) AS sesiones_totales, MAX(s.fecha_inicio) AS ultima_sesion, COUNT(ha.id_historial) AS acciones_totales, COUNT(CASE WHEN ha.accion = 'INSERT' THEN 1 END) AS inserciones, COUNT(CASE WHEN ha.accion = 'UPDATE' THEN 1 END) AS actualizaciones, COUNT(CASE WHEN ha.accion = 'DELETE' THEN 1 END) AS eliminaciones FROM usuarios u INNER JOIN roles r ON u.id_rol = r.id_rol LEFT JOIN sesiones_usuario s ON u.id_usuario = s.id_usuario LEFT JOIN historial_acciones ha ON u.id_usuario = ha.id_usuario WHERE u.activo = true GROUP BY u.id_usuario, u.nombre, u.apellido, r.nombre_rol ORDER BY acciones_totales DESC;

-- foreign keys
-- Reference: fk_clientes_usuarios (table: clientes)
ALTER TABLE clientes ADD CONSTRAINT fk_clientes_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_comentarios_clientes (table: comentarios)
ALTER TABLE comentarios ADD CONSTRAINT fk_comentarios_clientes
    FOREIGN KEY (id_cliente)
    REFERENCES clientes (id_cliente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_comentarios_pedidos (table: comentarios)
ALTER TABLE comentarios ADD CONSTRAINT fk_comentarios_pedidos
    FOREIGN KEY (id_pedido)
    REFERENCES pedidos (id_pedido)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_compras_almacenes (table: compras)
ALTER TABLE compras ADD CONSTRAINT fk_compras_almacenes
    FOREIGN KEY (id_almacen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_compras_empleados (table: compras)
ALTER TABLE compras ADD CONSTRAINT fk_compras_empleados
    FOREIGN KEY (id_empleado)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_compras_proveedores (table: compras)
ALTER TABLE compras ADD CONSTRAINT fk_compras_proveedores
    FOREIGN KEY (id_proveedor)
    REFERENCES proveedores (id_proveedor)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_detalle_compras_compras (table: detalle_compras)
ALTER TABLE detalle_compras ADD CONSTRAINT fk_detalle_compras_compras
    FOREIGN KEY (id_compra)
    REFERENCES compras (id_compra)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_detalle_compras_ingredientes (table: detalle_compras)
ALTER TABLE detalle_compras ADD CONSTRAINT fk_detalle_compras_ingredientes
    FOREIGN KEY (id_ingrediente)
    REFERENCES ingredientes (id_ingrediente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_detalle_pedidos_pedidos (table: detalle_pedidos)
ALTER TABLE detalle_pedidos ADD CONSTRAINT fk_detalle_pedidos_pedidos
    FOREIGN KEY (id_pedido)
    REFERENCES pedidos (id_pedido)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_detalle_pedidos_producto_tamanos (table: detalle_pedidos)
ALTER TABLE detalle_pedidos ADD CONSTRAINT fk_detalle_pedidos_producto_tamanos
    FOREIGN KEY (id_producto_tamano)
    REFERENCES producto_tamanos (id_producto_tamano)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_empleados_almacenes (table: empleados)
ALTER TABLE empleados ADD CONSTRAINT fk_empleados_almacenes
    FOREIGN KEY (id_almacen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_empleados_usuarios (table: empleados)
ALTER TABLE empleados ADD CONSTRAINT fk_empleados_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_entregas_pedidos (table: entregas)
ALTER TABLE entregas ADD CONSTRAINT fk_entregas_pedidos
    FOREIGN KEY (id_pedido)
    REFERENCES pedidos (id_pedido)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_entregas_repartidores (table: entregas)
ALTER TABLE entregas ADD CONSTRAINT fk_entregas_repartidores
    FOREIGN KEY (id_repartidor)
    REFERENCES repartidores (id_repartidor)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_gastos_almacenes (table: gastos)
ALTER TABLE gastos ADD CONSTRAINT fk_gastos_almacenes
    FOREIGN KEY (id_almacen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_gastos_empleados (table: gastos)
ALTER TABLE gastos ADD CONSTRAINT fk_gastos_empleados
    FOREIGN KEY (id_empleado)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_historial_clientes_clientes (table: historial_clientes)
ALTER TABLE historial_clientes ADD CONSTRAINT fk_historial_clientes_clientes
    FOREIGN KEY (id_cliente)
    REFERENCES clientes (id_cliente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_historial_sesiones (table: historial_acciones)
ALTER TABLE historial_acciones ADD CONSTRAINT fk_historial_sesiones
    FOREIGN KEY (id_sesion)
    REFERENCES sesiones_usuario (id_sesion)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_historial_usuarios (table: historial_acciones)
ALTER TABLE historial_acciones ADD CONSTRAINT fk_historial_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_inventario_almacenes (table: inventario_almacen)
ALTER TABLE inventario_almacen ADD CONSTRAINT fk_inventario_almacenes
    FOREIGN KEY (id_almacen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_inventario_ingredientes (table: inventario_almacen)
ALTER TABLE inventario_almacen ADD CONSTRAINT fk_inventario_ingredientes
    FOREIGN KEY (id_ingrediente)
    REFERENCES ingredientes (id_ingrediente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_movimientos_almacen_destino (table: movimientos_almacen)
ALTER TABLE movimientos_almacen ADD CONSTRAINT fk_movimientos_almacen_destino
    FOREIGN KEY (id_almacen_destino)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_movimientos_almacen_origen (table: movimientos_almacen)
ALTER TABLE movimientos_almacen ADD CONSTRAINT fk_movimientos_almacen_origen
    FOREIGN KEY (id_almacen_origen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_movimientos_empleados (table: movimientos_almacen)
ALTER TABLE movimientos_almacen ADD CONSTRAINT fk_movimientos_empleados
    FOREIGN KEY (id_empleado)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_movimientos_ingredientes (table: movimientos_almacen)
ALTER TABLE movimientos_almacen ADD CONSTRAINT fk_movimientos_ingredientes
    FOREIGN KEY (id_ingrediente)
    REFERENCES ingredientes (id_ingrediente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_pagos_metodos_pago (table: pagos)
ALTER TABLE pagos ADD CONSTRAINT fk_pagos_metodos_pago
    FOREIGN KEY (id_metodo)
    REFERENCES metodos_pago (id_metodo)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_pagos_pedidos (table: pagos)
ALTER TABLE pagos ADD CONSTRAINT fk_pagos_pedidos
    FOREIGN KEY (id_pedido)
    REFERENCES pedidos (id_pedido)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_pedidos_almacenes (table: pedidos)
ALTER TABLE pedidos ADD CONSTRAINT fk_pedidos_almacenes
    FOREIGN KEY (id_almacen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_pedidos_clientes (table: pedidos)
ALTER TABLE pedidos ADD CONSTRAINT fk_pedidos_clientes
    FOREIGN KEY (id_cliente)
    REFERENCES clientes (id_cliente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_pedidos_empleados (table: pedidos)
ALTER TABLE pedidos ADD CONSTRAINT fk_pedidos_empleados
    FOREIGN KEY (id_empleado)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_pedidos_mesas (table: pedidos)
ALTER TABLE pedidos ADD CONSTRAINT fk_pedidos_mesas
    FOREIGN KEY (id_mesa)
    REFERENCES mesas (id_mesa)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_preferencias_categoria_favorita (table: preferencias_clientes)
ALTER TABLE preferencias_clientes ADD CONSTRAINT fk_preferencias_categoria_favorita
    FOREIGN KEY (categoria_favorita)
    REFERENCES categorias (id_categoria)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_preferencias_clientes (table: preferencias_clientes)
ALTER TABLE preferencias_clientes ADD CONSTRAINT fk_preferencias_clientes
    FOREIGN KEY (id_cliente)
    REFERENCES clientes (id_cliente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_preferencias_producto_favorito (table: preferencias_clientes)
ALTER TABLE preferencias_clientes ADD CONSTRAINT fk_preferencias_producto_favorito
    FOREIGN KEY (producto_favorito)
    REFERENCES productos (id_producto)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_preferencias_tamano_preferido (table: preferencias_clientes)
ALTER TABLE preferencias_clientes ADD CONSTRAINT fk_preferencias_tamano_preferido
    FOREIGN KEY (tamano_preferido)
    REFERENCES tamano (id_tamano)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_producto_tamanos_productos (table: producto_tamanos)
ALTER TABLE producto_tamanos ADD CONSTRAINT fk_producto_tamanos_productos
    FOREIGN KEY (id_producto)
    REFERENCES productos (id_producto)
    ON DELETE  CASCADE  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_producto_tamanos_tamano (table: producto_tamanos)
ALTER TABLE producto_tamanos ADD CONSTRAINT fk_producto_tamanos_tamano
    FOREIGN KEY (id_tamano)
    REFERENCES tamano (id_tamano)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_productos_categorias (table: productos)
ALTER TABLE productos ADD CONSTRAINT fk_productos_categorias
    FOREIGN KEY (id_categoria)
    REFERENCES categorias (id_categoria)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_productos_promocion_productos (table: productos_promocion)
ALTER TABLE productos_promocion ADD CONSTRAINT fk_productos_promocion_productos
    FOREIGN KEY (id_producto)
    REFERENCES productos (id_producto)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_productos_promocion_promociones (table: productos_promocion)
ALTER TABLE productos_promocion ADD CONSTRAINT fk_productos_promocion_promociones
    FOREIGN KEY (id_promocion)
    REFERENCES promociones (id_promocion)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_recetas_ingredientes (table: recetas)
ALTER TABLE recetas ADD CONSTRAINT fk_recetas_ingredientes
    FOREIGN KEY (id_ingrediente)
    REFERENCES ingredientes (id_ingrediente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_recetas_producto_tamanos (table: recetas)
ALTER TABLE recetas ADD CONSTRAINT fk_recetas_producto_tamanos
    FOREIGN KEY (id_producto_tamano)
    REFERENCES producto_tamanos (id_producto_tamano)
    ON DELETE  CASCADE  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_repartidores_empleados (table: repartidores)
ALTER TABLE repartidores ADD CONSTRAINT fk_repartidores_empleados
    FOREIGN KEY (id_empleado)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_reservas_clientes (table: reservas)
ALTER TABLE reservas ADD CONSTRAINT fk_reservas_clientes
    FOREIGN KEY (id_cliente)
    REFERENCES clientes (id_cliente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_reservas_mesas (table: reservas)
ALTER TABLE reservas ADD CONSTRAINT fk_reservas_mesas
    FOREIGN KEY (id_mesa)
    REFERENCES mesas (id_mesa)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_sesiones_usuarios (table: sesiones_usuario)
ALTER TABLE sesiones_usuario ADD CONSTRAINT fk_sesiones_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_usuarios_roles (table: usuarios)
ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_roles
    FOREIGN KEY (id_rol)
    REFERENCES roles (id_rol)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

-- Trigger para actualizar inventario cuando se recibe una compra
CREATE OR REPLACE FUNCTION actualizar_inventario_compra()
RETURNS TRIGGER AS $$
BEGIN
    -- Actualizar o insertar en inventario_almacen
    INSERT INTO inventario_almacen (id_almacen, id_ingrediente, stock_actual, fecha_actualizacion)
    SELECT c.id_almacen, NEW.id_ingrediente, NEW.cantidad, CURRENT_TIMESTAMP
    FROM compras c
    WHERE c.id_compra = NEW.id_compra
    ON CONFLICT (id_almacen, id_ingrediente) 
    DO UPDATE SET 
        stock_actual = inventario_almacen.stock_actual + NEW.cantidad,
        fecha_actualizacion = CURRENT_TIMESTAMP;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_inventario_compra
AFTER INSERT ON detalle_compras
FOR EACH ROW
EXECUTE FUNCTION actualizar_inventario_compra();

-- Trigger para descontar inventario al confirmar pedido
CREATE OR REPLACE FUNCTION descontar_inventario_pedido()
RETURNS TRIGGER AS $$
DECLARE
    v_id_almacen INTEGER;
    v_cantidad_necesaria DECIMAL(10,2);
    v_stock_actual DECIMAL(10,2);
    detalle RECORD;
    receta RECORD;
BEGIN
    -- Solo ejecutar cuando cambia a 'En Preparación'
    IF NEW.estado = 'En Preparación' AND OLD.estado = 'Pendiente' THEN
        v_id_almacen := NEW.id_almacen;
        
        -- Recorrer cada detalle del pedido
        FOR detalle IN 
            SELECT * FROM detalle_pedidos WHERE id_pedido = NEW.id_pedido
        LOOP
            -- Recorrer cada ingrediente de la receta
            FOR receta IN 
                SELECT * FROM recetas WHERE id_producto_tamano = detalle.id_producto_tamano AND activo = true
            LOOP
                v_cantidad_necesaria := receta.cantidad * detalle.cantidad;
                
                -- Verificar stock disponible
                SELECT stock_actual INTO v_stock_actual
                FROM inventario_almacen
                WHERE id_almacen = v_id_almacen 
                  AND id_ingrediente = receta.id_ingrediente;
                
                IF v_stock_actual IS NULL OR v_stock_actual < v_cantidad_necesaria THEN
                    RAISE EXCEPTION 'Stock insuficiente para el ingrediente ID: %. Disponible: %, Necesario: %', 
                        receta.id_ingrediente, COALESCE(v_stock_actual, 0), v_cantidad_necesaria;
                END IF;
                
                -- Descontar del inventario
                UPDATE inventario_almacen
                SET stock_actual = stock_actual - v_cantidad_necesaria,
                    fecha_actualizacion = CURRENT_TIMESTAMP
                WHERE id_almacen = v_id_almacen 
                  AND id_ingrediente = receta.id_ingrediente;
                
                -- Registrar movimiento
                INSERT INTO movimientos_almacen (
                    id_almacen_origen, id_almacen_destino, id_ingrediente, 
                    cantidad, tipo_movimiento, motivo, id_empleado, referencia
                ) VALUES (
                    v_id_almacen, v_id_almacen, receta.id_ingrediente,
                    v_cantidad_necesaria, 'Salida', 
                    'Consumo por pedido', NEW.id_empleado, 
                    'PEDIDO-' || NEW.id_pedido
                );
            END LOOP;
        END LOOP;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_descontar_inventario_pedido
AFTER UPDATE ON pedidos
FOR EACH ROW
EXECUTE FUNCTION descontar_inventario_pedido();

-- Trigger para calcular subtotal en detalle_pedidos
CREATE OR REPLACE FUNCTION calcular_subtotal_detalle_pedido()
RETURNS TRIGGER AS $$
BEGIN
    NEW.subtotal := NEW.cantidad * NEW.precio_unitario;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_calcular_subtotal_detalle_pedido
BEFORE INSERT OR UPDATE ON detalle_pedidos
FOR EACH ROW
EXECUTE FUNCTION calcular_subtotal_detalle_pedido();

-- Trigger para actualizar total del pedido
CREATE OR REPLACE FUNCTION actualizar_total_pedido()
RETURNS TRIGGER AS $$
DECLARE
    v_subtotal DECIMAL(10,2);
    v_id_pedido INTEGER;
BEGIN
    -- Obtener id_pedido según la operación
    IF TG_OP = 'DELETE' THEN
        v_id_pedido := OLD.id_pedido;
    ELSE
        v_id_pedido := NEW.id_pedido;
    END IF;
    
    -- Calcular nuevo subtotal
    SELECT COALESCE(SUM(subtotal), 0) INTO v_subtotal
    FROM detalle_pedidos
    WHERE id_pedido = v_id_pedido;
    
    -- Actualizar pedido
    UPDATE pedidos
    SET subtotal = v_subtotal,
        total = v_subtotal - COALESCE(descuento, 0)
    WHERE id_pedido = v_id_pedido;
    
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_total_pedido
AFTER INSERT OR UPDATE OR DELETE ON detalle_pedidos
FOR EACH ROW
EXECUTE FUNCTION actualizar_total_pedido();

-- Lo mismo para compras
CREATE OR REPLACE FUNCTION calcular_subtotal_detalle_compra()
RETURNS TRIGGER AS $$
BEGIN
    NEW.subtotal := NEW.cantidad * NEW.precio_unitario;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_calcular_subtotal_detalle_compra
BEFORE INSERT OR UPDATE ON detalle_compras
FOR EACH ROW
EXECUTE FUNCTION calcular_subtotal_detalle_compra();

CREATE OR REPLACE FUNCTION actualizar_total_compra()
RETURNS TRIGGER AS $$
DECLARE
    v_total DECIMAL(10,2);
    v_id_compra INTEGER;
BEGIN
    IF TG_OP = 'DELETE' THEN
        v_id_compra := OLD.id_compra;
    ELSE
        v_id_compra := NEW.id_compra;
    END IF;
    
    SELECT COALESCE(SUM(subtotal), 0) INTO v_total
    FROM detalle_compras
    WHERE id_compra = v_id_compra;
    
    UPDATE compras
    SET total = v_total
    WHERE id_compra = v_id_compra;
    
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_total_compra
AFTER INSERT OR UPDATE OR DELETE ON detalle_compras
FOR EACH ROW
EXECUTE FUNCTION actualizar_total_compra();

-- Trigger para actualizar estado de mesa al crear/actualizar pedido
CREATE OR REPLACE FUNCTION gestionar_estado_mesa()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Si es pedido local y tiene mesa asignada
        IF NEW.tipo_pedido = 'Local' AND NEW.id_mesa IS NOT NULL THEN
            UPDATE mesas 
            SET estado = 'Ocupada'
            WHERE id_mesa = NEW.id_mesa;
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Si se completó o canceló el pedido, liberar mesa
        IF NEW.estado IN ('Entregado', 'Cancelado') 
           AND OLD.estado NOT IN ('Entregado', 'Cancelado')
           AND NEW.id_mesa IS NOT NULL THEN
            UPDATE mesas 
            SET estado = 'Disponible'
            WHERE id_mesa = NEW.id_mesa;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gestionar_estado_mesa
AFTER INSERT OR UPDATE ON pedidos
FOR EACH ROW
EXECUTE FUNCTION gestionar_estado_mesa();

-- Trigger para actualizar preferencias automáticamente
CREATE OR REPLACE FUNCTION actualizar_preferencias_cliente()
RETURNS TRIGGER AS $$
DECLARE
    v_producto_favorito INTEGER;
    v_categoria_favorita INTEGER;
    v_tamano_preferido INTEGER;
    v_frecuencia INTEGER;
    v_ticket_promedio DECIMAL(10,2);
BEGIN
    -- Solo actualizar si el pedido está completado
    IF NEW.estado = 'Entregado' AND NEW.id_cliente IS NOT NULL THEN
        
        -- Calcular producto más pedido
        SELECT pt.id_producto INTO v_producto_favorito
        FROM detalle_pedidos dp
        JOIN pedidos p ON dp.id_pedido = p.id_pedido
        JOIN producto_tamanos pt ON dp.id_producto_tamano = pt.id_producto_tamano
        WHERE p.id_cliente = NEW.id_cliente
        GROUP BY pt.id_producto
        ORDER BY SUM(dp.cantidad) DESC
        LIMIT 1;
        
        -- Calcular categoría favorita
        SELECT prod.id_categoria INTO v_categoria_favorita
        FROM detalle_pedidos dp
        JOIN pedidos p ON dp.id_pedido = p.id_pedido
        JOIN producto_tamanos pt ON dp.id_producto_tamano = pt.id_producto_tamano
        JOIN productos prod ON pt.id_producto = prod.id_producto
        WHERE p.id_cliente = NEW.id_cliente
        GROUP BY prod.id_categoria
        ORDER BY COUNT(*) DESC
        LIMIT 1;
        
        -- Calcular tamaño preferido
        SELECT pt.id_tamano INTO v_tamano_preferido
        FROM detalle_pedidos dp
        JOIN pedidos p ON dp.id_pedido = p.id_pedido
        JOIN producto_tamanos pt ON dp.id_producto_tamano = pt.id_producto_tamano
        WHERE p.id_cliente = NEW.id_cliente
        GROUP BY pt.id_tamano
        ORDER BY COUNT(*) DESC
        LIMIT 1;
        
        -- Calcular frecuencia y ticket promedio
        SELECT COUNT(*), AVG(total) INTO v_frecuencia, v_ticket_promedio
        FROM pedidos
        WHERE id_cliente = NEW.id_cliente 
          AND estado = 'Entregado';
        
        -- Insertar o actualizar preferencias
        INSERT INTO preferencias_clientes (
            id_cliente, producto_favorito, categoria_favorita, 
            tamano_preferido, frecuencia_pedidos, ticket_promedio,
            ultimo_pedido, fecha_actualizacion
        ) VALUES (
            NEW.id_cliente, v_producto_favorito, v_categoria_favorita,
            v_tamano_preferido, v_frecuencia, v_ticket_promedio,
            CURRENT_DATE, CURRENT_TIMESTAMP
        )
        ON CONFLICT (id_cliente) DO UPDATE SET
            producto_favorito = EXCLUDED.producto_favorito,
            categoria_favorita = EXCLUDED.categoria_favorita,
            tamano_preferido = EXCLUDED.tamano_preferido,
            frecuencia_pedidos = EXCLUDED.frecuencia_pedidos,
            ticket_promedio = EXCLUDED.ticket_promedio,
            ultimo_pedido = EXCLUDED.ultimo_pedido,
            fecha_actualizacion = CURRENT_TIMESTAMP;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_preferencias_cliente
AFTER UPDATE ON pedidos
FOR EACH ROW
EXECUTE FUNCTION actualizar_preferencias_cliente();

-- Trigger para otorgar puntos de fidelidad
CREATE OR REPLACE FUNCTION otorgar_puntos_fidelidad()
RETURNS TRIGGER AS $$
DECLARE
    v_id_cliente INTEGER;
    v_puntos INTEGER;
BEGIN
    -- Solo si el pago está completado
    IF NEW.estado = 'Completado' THEN
        -- Obtener cliente del pedido
        SELECT id_cliente INTO v_id_cliente
        FROM pedidos
        WHERE id_pedido = NEW.id_pedido;
        
        IF v_id_cliente IS NOT NULL THEN
            -- Calcular puntos (1 punto por cada Bs. 10)
            v_puntos := FLOOR(NEW.monto / 10);
            
            -- Actualizar puntos del cliente
            UPDATE clientes
            SET puntos_fidelidad = puntos_fidelidad + v_puntos
            WHERE id_cliente = v_id_cliente;
            
            -- Registrar en historial
            INSERT INTO historial_clientes (
                id_cliente, tipo_actividad, id_referencia, 
                descripcion, detalles
            ) VALUES (
                v_id_cliente, 'Pago Realizado', NEW.id_pago,
                'Puntos ganados por pago',
                jsonb_build_object(
                    'monto', NEW.monto,
                    'puntos_ganados', v_puntos,
                    'id_pago', NEW.id_pago
                )
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_otorgar_puntos_fidelidad
AFTER INSERT OR UPDATE ON pagos
FOR EACH ROW
EXECUTE FUNCTION otorgar_puntos_fidelidad();

-- Trigger para validar disponibilidad de mesa en reservas
CREATE OR REPLACE FUNCTION validar_disponibilidad_mesa()
RETURNS TRIGGER AS $$
DECLARE
    v_reservas_existentes INTEGER;
BEGIN
    -- Verificar si la mesa está disponible
    SELECT COUNT(*) INTO v_reservas_existentes
    FROM reservas
    WHERE id_mesa = NEW.id_mesa
      AND fecha_reserva = NEW.fecha_reserva
      AND hora_reserva = NEW.hora_reserva
      AND estado IN ('Pendiente', 'Confirmada')
      AND id_reserva != COALESCE(NEW.id_reserva, 0);
    
    IF v_reservas_existentes > 0 THEN
        RAISE EXCEPTION 'La mesa % ya está reservada para esa fecha y hora', NEW.id_mesa;
    END IF;
    
    -- Verificar capacidad
    IF NEW.numero_personas > (SELECT capacidad FROM mesas WHERE id_mesa = NEW.id_mesa) THEN
        RAISE EXCEPTION 'El número de personas excede la capacidad de la mesa';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validar_disponibilidad_mesa
BEFORE INSERT OR UPDATE ON reservas
FOR EACH ROW
EXECUTE FUNCTION validar_disponibilidad_mesa();

-- Trigger para validar cantidades positivas
CREATE OR REPLACE FUNCTION validar_cantidades_positivas()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.cantidad <= 0 THEN
        RAISE EXCEPTION 'La cantidad debe ser mayor a cero';
    END IF;
    
    IF NEW.precio_unitario < 0 THEN
        RAISE EXCEPTION 'El precio unitario no puede ser negativo';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validar_cantidades_detalle_pedidos
BEFORE INSERT OR UPDATE ON detalle_pedidos
FOR EACH ROW
EXECUTE FUNCTION validar_cantidades_positivas();

CREATE TRIGGER trg_validar_cantidades_detalle_compras
BEFORE INSERT OR UPDATE ON detalle_compras
FOR EACH ROW
EXECUTE FUNCTION validar_cantidades_positivas();

-- Trigger para registrar actividad de clientes automáticamente
CREATE OR REPLACE FUNCTION registrar_actividad_cliente_pedido()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.id_cliente IS NOT NULL THEN
        INSERT INTO historial_clientes (
            id_cliente, tipo_actividad, id_referencia, descripcion, detalles
        ) VALUES (
            NEW.id_cliente, 'Pedido Creado', NEW.id_pedido,
            'Nuevo pedido creado',
            jsonb_build_object(
                'tipo_pedido', NEW.tipo_pedido,
                'total', NEW.total,
                'almacen', NEW.id_almacen
            )
        );
    ELSIF TG_OP = 'UPDATE' AND NEW.id_cliente IS NOT NULL THEN
        IF NEW.estado = 'Cancelado' AND OLD.estado != 'Cancelado' THEN
            INSERT INTO historial_clientes (
                id_cliente, tipo_actividad, id_referencia, descripcion, detalles
            ) VALUES (
                NEW.id_cliente, 'Pedido Cancelado', NEW.id_pedido,
                'Pedido cancelado',
                jsonb_build_object(
                    'estado_anterior', OLD.estado,
                    'motivo', NEW.notas
                )
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_registrar_actividad_cliente_pedido
AFTER INSERT OR UPDATE ON pedidos
FOR EACH ROW
EXECUTE FUNCTION registrar_actividad_cliente_pedido();

-- Trigger para generar alerta cuando el stock es bajo
CREATE OR REPLACE FUNCTION alerta_stock_bajo()
RETURNS TRIGGER AS $$
DECLARE
    v_stock_minimo DECIMAL(10,2);
    v_nombre_ingrediente VARCHAR(100);
    v_nombre_almacen VARCHAR(100);
BEGIN
    -- Obtener stock mínimo del ingrediente
    SELECT stock_minimo, nombre INTO v_stock_minimo, v_nombre_ingrediente
    FROM ingredientes
    WHERE id_ingrediente = NEW.id_ingrediente;
    
    SELECT nombre INTO v_nombre_almacen
    FROM almacenes
    WHERE id_almacen = NEW.id_almacen;
    
    -- Si el stock actual es menor o igual al mínimo
    IF NEW.stock_actual <= v_stock_minimo THEN
        -- Aquí podrías insertar en una tabla de alertas o notificaciones
        RAISE NOTICE 'ALERTA: Stock bajo de % en almacén %. Actual: %, Mínimo: %',
            v_nombre_ingrediente, v_nombre_almacen, NEW.stock_actual, v_stock_minimo;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_alerta_stock_bajo
AFTER UPDATE ON inventario_almacen
FOR EACH ROW
WHEN (NEW.stock_actual IS DISTINCT FROM OLD.stock_actual)
EXECUTE FUNCTION alerta_stock_bajo();

-- Trigger para actualizar fecha_actualizacion
CREATE OR REPLACE FUNCTION actualizar_fecha_modificacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_fecha_ingredientes
BEFORE UPDATE ON ingredientes
FOR EACH ROW
EXECUTE FUNCTION actualizar_fecha_modificacion();

CREATE TRIGGER trg_actualizar_fecha_inventario
BEFORE UPDATE ON inventario_almacen
FOR EACH ROW
EXECUTE FUNCTION actualizar_fecha_modificacion();

CREATE TRIGGER trg_actualizar_fecha_preferencias
BEFORE UPDATE ON preferencias_clientes
FOR EACH ROW
EXECUTE FUNCTION actualizar_fecha_modificacion();

-- Trigger para validar disponibilidad de repartidor
CREATE OR REPLACE FUNCTION validar_repartidor_disponible()
RETURNS TRIGGER AS $$
DECLARE
    v_disponible BOOLEAN;
BEGIN
    -- Verificar si el repartidor está disponible
    SELECT disponible INTO v_disponible
    FROM repartidores
    WHERE id_repartidor = NEW.id_repartidor;
    
    IF NOT v_disponible THEN
        RAISE EXCEPTION 'El repartidor no está disponible';
    END IF;
    
    -- Marcar repartidor como no disponible
    UPDATE repartidores
    SET disponible = false
    WHERE id_repartidor = NEW.id_repartidor;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validar_repartidor_disponible
BEFORE INSERT ON entregas
FOR EACH ROW
EXECUTE FUNCTION validar_repartidor_disponible();

-- Trigger para liberar repartidor al completar entrega
CREATE OR REPLACE FUNCTION liberar_repartidor()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estado IN ('Entregado', 'Fallido') AND OLD.estado NOT IN ('Entregado', 'Fallido') THEN
        UPDATE repartidores
        SET disponible = true
        WHERE id_repartidor = NEW.id_repartidor;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_liberar_repartidor
AFTER UPDATE ON entregas
FOR EACH ROW
EXECUTE FUNCTION liberar_repartidor();

-- Validar fechas en promociones
ALTER TABLE promociones 
ADD CONSTRAINT check_fechas_promocion 
CHECK (fecha_fin >= fecha_inicio);

-- Validar horas en entregas
ALTER TABLE entregas 
ADD CONSTRAINT check_horas_entrega 
CHECK (hora_entrega IS NULL OR hora_entrega >= hora_salida);

-- Validar formato de email
ALTER TABLE usuarios 
ADD CONSTRAINT check_email_formato 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE clientes 
ADD CONSTRAINT check_email_formato_clientes
CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Validar teléfonos
ALTER TABLE clientes 
ADD CONSTRAINT check_telefono_formato 
CHECK (telefono ~* '^\+?[0-9\s\-()]{7,20}$');

-- Validar que el descuento no sea mayor al subtotal
ALTER TABLE pedidos 
ADD CONSTRAINT check_descuento_valido 
CHECK (descuento <= subtotal);

-- Validar que total = subtotal - descuento
ALTER TABLE pedidos 
ADD CONSTRAINT check_total_correcto 
CHECK (total = subtotal - COALESCE(descuento, 0));

-- Índices compuestos para consultas frecuentes
CREATE INDEX idx_pedidos_cliente_fecha ON pedidos(id_cliente, fecha_pedido DESC);
CREATE INDEX idx_pedidos_estado_fecha ON pedidos(estado, fecha_pedido DESC);
CREATE INDEX idx_detalle_pedidos_producto ON detalle_pedidos(id_producto_tamano, id_pedido);
CREATE INDEX idx_inventario_stock_actual ON inventario_almacen(stock_actual, id_ingrediente);
CREATE INDEX idx_reservas_fecha_mesa ON reservas(fecha_reserva, id_mesa) 
    WHERE estado IN ('Pendiente', 'Confirmada');
CREATE INDEX idx_entregas_pendientes ON entregas(id_repartidor, estado) 
    WHERE estado NOT IN ('Entregado', 'Fallido');


-- 1. ROLES
INSERT INTO roles (nombre_rol, descripcion, activo) VALUES
('Administrador', 'Acceso total al sistema', true),
('Gerente', 'Gestión de operaciones y personal', true),
('Cajero', 'Registro de pedidos y cobros', true),
('Cocinero', 'Preparación de pedidos', true),
('Repartidor', 'Entrega de pedidos a domicilio', true),
('Cliente', 'Usuario cliente del sistema', true);

-- 2. USUARIOS
INSERT INTO usuarios (nombre, apellido, email, telefono, password_hash, id_rol, activo) VALUES
('Juan', 'Pérez', 'juan.perez@pizzeria.com', '71234567', '$2a$10$abcdefghijklmnopqrstuvwxyz', 1, true),
('María', 'González', 'maria.gonzalez@pizzeria.com', '72345678', '$2a$10$abcdefghijklmnopqrstuvwxyz', 2, true),
('Pedro', 'Mamani', 'pedro.mamani@pizzeria.com', '73456789', '$2a$10$abcdefghijklmnopqrstuvwxyz', 3, true),
('Luis', 'Condori', 'luis.condori@pizzeria.com', '74567890', '$2a$10$abcdefghijklmnopqrstuvwxyz', 4, true),
('Carlos', 'Quispe', 'carlos.quispe@pizzeria.com', '75678901', '$2a$10$abcdefghijklmnopqrstuvwxyz', 5, true),
('Ana', 'López', 'ana.lopez@gmail.com', '76789012', '$2a$10$abcdefghijklmnopqrstuvwxyz', 6, true),
('Roberto', 'Silva', 'roberto.silva@gmail.com', '77890123', '$2a$10$abcdefghijklmnopqrstuvwxyz', 6, true);

-- 3. ALMACENES
INSERT INTO almacenes (nombre, direccion, ciudad, telefono, responsable, tipo, activo) VALUES
('Almacén Principal', 'Av. 6 de Agosto #1234', 'La Paz', '22334455', 'Juan Pérez', 'Principal', true),
('Sucursal Zona Sur', 'Av. Ballivián #567', 'La Paz', '22445566', 'María González', 'Sucursal', true);

-- 4. EMPLEADOS
INSERT INTO empleados (id_usuario, id_almacen, fecha_contratacion, salario, turno, estado, activo) VALUES
(1, 1, '2023-01-15', 5000.00, 'Mañana', 'Activo', true),
(2, 1, '2023-02-20', 4500.00, 'Tarde', 'Activo', true),
(3, 1, '2023-03-10', 3500.00, 'Rotativo', 'Activo', true),
(4, 1, '2023-04-05', 3000.00, 'Tarde', 'Activo', true),
(5, 2, '2023-05-12', 3200.00, 'Rotativo', 'Activo', true);

-- 5. REPARTIDORES
INSERT INTO repartidores (id_empleado, vehiculo, placa, licencia, disponible, activo) VALUES
(5, 'Motocicleta Honda', 'ABC-123', 'LIC-12345', true, true);

-- 6. CLIENTES
INSERT INTO clientes (id_usuario, nombre, apellido, telefono, email, direccion, ciudad, activo) VALUES
(6, 'Ana', 'López', '76789012', 'ana.lopez@gmail.com', 'Calle 21 de Calacoto #456', 'La Paz', true),
(7, 'Roberto', 'Silva', '77890123', 'roberto.silva@gmail.com', 'Av. Arce #789', 'La Paz', true),
(NULL, 'Cliente', 'Genérico', '70000000', NULL, NULL, 'La Paz', true);

-- 7. CATEGORÍAS
INSERT INTO categorias (nombre, descripcion, activo) VALUES
('Pizzas', 'Pizzas artesanales con ingredientes frescos', true),
('Bebidas', 'Bebidas frías y calientes', true),
('Postres', 'Postres caseros', true),
('Entradas', 'Entradas y aperitivos', true);

-- 8. TAMAÑOS
INSERT INTO tamano (nombre, abreviatura, orden, descripcion, activo) VALUES
('Personal', 'P', 1, 'Pizza individual de 20cm', true),
('Mediana', 'M', 2, 'Pizza mediana de 30cm', true),
('Familiar', 'F', 3, 'Pizza familiar de 40cm', true),
('Único', 'U', 4, 'Tamaño único para otros productos', true);

-- 9. PRODUCTOS
INSERT INTO productos (nombre, descripcion, id_categoria, disponible, es_promocion, activo) VALUES
('Pizza Margarita', 'Salsa de tomate, mozzarella y albahaca', 1, true, false, true),
('Pizza Pepperoni', 'Salsa de tomate, mozzarella y pepperoni', 1, true, false, true),
('Pizza Hawaiana', 'Salsa de tomate, mozzarella, jamón y piña', 1, true, false, true),
('Coca Cola', 'Bebida gaseosa 500ml', 2, true, false, true),
('Fanta', 'Bebida gaseosa sabor naranja 500ml', 2, true, false, true),
('Helado', 'Helado artesanal de vainilla', 3, true, false, true);

-- 10. PRODUCTO_TAMANOS
INSERT INTO producto_tamanos (id_producto, id_tamano, precio, disponible, activo) VALUES
(1, 1, 25.00, true, true),
(1, 2, 45.00, true, true),
(1, 3, 70.00, true, true),
(2, 1, 30.00, true, true),
(2, 2, 50.00, true, true),
(2, 3, 80.00, true, true),
(3, 1, 32.00, true, true),
(3, 2, 52.00, true, true),
(3, 3, 82.00, true, true),
(4, 4, 8.00, true, true),
(5, 4, 8.00, true, true),
(6, 4, 12.00, true, true);

-- 11. INGREDIENTES
INSERT INTO ingredientes (nombre, unidad_medida, stock_minimo, costo_unitario, proveedor, activo) VALUES
('Harina', 'kg', 50.00, 8.50, 'Distribuidora La Estrella', true),
('Queso Mozzarella', 'kg', 30.00, 45.00, 'Lácteos Pil', true),
('Salsa de Tomate', 'kg', 20.00, 12.00, 'Distribuidora La Estrella', true),
('Pepperoni', 'kg', 15.00, 65.00, 'Carnes Premium', true),
('Jamón', 'kg', 15.00, 38.00, 'Carnes Premium', true),
('Piña', 'kg', 10.00, 15.00, 'Frutas y Verduras Sol', true),
('Coca Cola', 'unidad', 100.00, 4.00, 'Embol', true),
('Fanta', 'unidad', 100.00, 4.00, 'Embol', true),
('Helado', 'litro', 10.00, 25.00, 'Delizia', true);

-- 12. INVENTARIO INICIAL
INSERT INTO inventario_almacen (id_almacen, id_ingrediente, stock_actual) VALUES
(1, 1, 100.00),
(1, 2, 50.00),
(1, 3, 40.00),
(1, 4, 25.00),
(1, 5, 20.00),
(1, 6, 15.00),
(1, 7, 150.00),
(1, 8, 150.00),
(1, 9, 20.00),
(2, 1, 80.00),
(2, 2, 40.00),
(2, 3, 30.00),
(2, 7, 120.00),
(2, 8, 120.00);

-- 13. RECETAS (ingredientes por producto-tamaño)
-- Pizza Margarita Personal
INSERT INTO recetas (id_producto_tamano, id_ingrediente, cantidad, activo) VALUES
(1, 1, 0.150, true),  -- Harina
(1, 2, 0.100, true),  -- Queso
(1, 3, 0.080, true);  -- Salsa

-- Pizza Margarita Mediana
INSERT INTO recetas (id_producto_tamano, id_ingrediente, cantidad, activo) VALUES
(2, 1, 0.250, true),
(2, 2, 0.180, true),
(2, 3, 0.120, true);

-- Pizza Margarita Familiar
INSERT INTO recetas (id_producto_tamano, id_ingrediente, cantidad, activo) VALUES
(3, 1, 0.400, true),
(3, 2, 0.300, true),
(3, 3, 0.200, true);

-- Pizza Pepperoni Personal
INSERT INTO recetas (id_producto_tamano, id_ingrediente, cantidad, activo) VALUES
(4, 1, 0.150, true),
(4, 2, 0.100, true),
(4, 3, 0.080, true),
(4, 4, 0.060, true);  -- Pepperoni

-- Pizza Pepperoni Mediana
INSERT INTO recetas (id_producto_tamano, id_ingrediente, cantidad, activo) VALUES
(5, 1, 0.250, true),
(5, 2, 0.180, true),
(5, 3, 0.120, true),
(5, 4, 0.100, true);

-- Pizza Hawaiana Personal
INSERT INTO recetas (id_producto_tamano, id_ingrediente, cantidad, activo) VALUES
(7, 1, 0.150, true),
(7, 2, 0.100, true),
(7, 3, 0.080, true),
(7, 5, 0.050, true),  -- Jamón
(7, 6, 0.080, true);  -- Piña

-- Bebidas y postres
INSERT INTO recetas (id_producto_tamano, id_ingrediente, cantidad, activo) VALUES
(10, 7, 1.000, true),  -- Coca Cola
(11, 8, 1.000, true),  -- Fanta
(12, 9, 0.150, true);  -- Helado

-- 14. MESAS
INSERT INTO mesas (numero_mesa, capacidad, ubicacion, estado, activo) VALUES
(1, 4, 'Terraza', 'Disponible', true),
(2, 4, 'Terraza', 'Disponible', true),
(3, 2, 'Interior', 'Disponible', true),
(4, 6, 'Interior', 'Disponible', true),
(5, 8, 'Salón Principal', 'Disponible', true);

-- 15. MÉTODOS DE PAGO
INSERT INTO metodos_pago (nombre, activo) VALUES
('Efectivo', true),
('Tarjeta de Débito', true),
('Tarjeta de Crédito', true),
('QR Simple', true),
('Transferencia Bancaria', true);

-- 16. PROVEEDORES
INSERT INTO proveedores (nombre_empresa, contacto, telefono, email, direccion, ciudad, activo) VALUES
('Distribuidora La Estrella', 'Jorge Mamani', '22112233', 'ventas@laestrella.com', 'Av. Buenos Aires #123', 'La Paz', true),
('Lácteos Pil', 'Rosa Ticona', '22334455', 'pedidos@pil.com', 'Av. Blanco Galindo Km 5', 'Cochabamba', true),
('Carnes Premium', 'Miguel Flores', '22556677', 'ventas@carnespremium.com', 'Calle Comercio #456', 'La Paz', true),
('Embol', 'Patricia Luna', '22778899', 'distribuidores@embol.com', 'Av. Industrial #789', 'La Paz', true);


