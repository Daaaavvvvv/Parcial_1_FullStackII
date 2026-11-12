
-- 1. Categorías
CREATE TABLE categorias (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_categorias_nombre UNIQUE (nombre)
);

-- 2. Productos 
CREATE TABLE productos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio INT NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    stock_critico INT NOT NULL DEFAULT 0,
    imagen VARCHAR(255),
    categoria_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_productos_codigo UNIQUE (codigo),
    CONSTRAINT ck_productos_precio CHECK (precio >= 0),
    CONSTRAINT ck_productos_stock CHECK (stock >= 0),
    CONSTRAINT fk_productos_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- 3. Boletas
CREATE TABLE boletas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total INT NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    usuario_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ck_boletas_total CHECK (total >= 0),
    CONSTRAINT ck_boletas_estado CHECK (estado IN ('PENDIENTE', 'PAGADA', 'ANULADA')),
    CONSTRAINT fk_boletas_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 4. Detalle de boletas
CREATE TABLE detalle_boleta (
    id BIGINT NOT NULL AUTO_INCREMENT,
    boleta_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario INT NOT NULL,
    subtotal INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT ck_detalle_boleta_subtotal CHECK (subtotal >=0),
    CONSTRAINT ck_detalle_boleta_cantidad CHECK (cantidad > 0),
    CONSTRAINT ck_detalle_boleta_precio_unitario CHECK (precio_unitario >= 0),
    CONSTRAINT uk_detalle_boleta_producto UNIQUE (boleta_id, producto_id),
    CONSTRAINT fk_detalle_boleta_boleta FOREIGN KEY (boleta_id) REFERENCES boletas(id),
    CONSTRAINT fk_detalle_boleta_producto FOREIGN KEY (producto_id) REFERENCES productos(id)
);
