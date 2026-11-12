CREATE TABLE usuarios (
    id     BIGINT       NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email  VARCHAR(150) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_usuarios_email UNIQUE (email)
);
