CREATE TABLE usuarios (
    id     BIGINT       NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL DEFAULT '',
    email  VARCHAR(150) NOT NULL,
    rol      VARCHAR(20) NOT NULL DEFAULT 'CLIENTE',
    PRIMARY KEY (id),
    CONSTRAINT uk_usuarios_email UNIQUE (email)
);
