# Parcial_1_FullStackII

Proyecto Sonido Vivo desarrollado con React, Vite, Bootstrap y React Router.
Las pruebas utilizan Jasmine y Karma.

La aplicación React está dentro de `frontend`.
La carpeta `sonido.vivo` conserva las páginas originales como referencia para migrarlas.

## Requisitos

- Node.js y npm instalados.
- Git instalado.
- Google Chrome instalado para ejecutar las pruebas.

## 1. Preparar el proyecto para trabajar

Desde la carpeta principal del repositorio, comprueba si tienes cambios pendientes:

```bash
git status
```

Si tienes cambios, guárdalos en tu branch antes de continuar.

Cuando tu trabajo esté guardado, actualiza la rama principal:

```bash
git switch main
git pull origin main
```

Crea una branch para la issue que vas a desarrollar.
Por ejemplo, para la issue #20 del catálogo:

```bash
git switch -c feature/20-catalogo
```

Cada integrante trabaja en la branch de su tarea

## 2. Instalar las dependencias

Entra a la aplicación:

```bash
cd frontend
```

Instala los paquetes necesarios:

```bash
npm install
```

Ejecuta este comando la primera vez y después de recibir cambios
en `package.json` o `package-lock.json`.

No es necesario instalar React, Bootstrap, Jasmine o Karma por separado:
ya están declarados en el proyecto.

## 3. Iniciar la aplicación

```bash
npm run dev
```

Abre en el navegador la dirección que muestra la terminal.

Al guardar cambios, la página se actualiza.
Para detener el servidor, presiona Ctrl + C.

## 4. Desarrollar las páginas

Las rutas están preparadas en `frontend/src/App.jsx`.
Actualmente, las vistas pendientes muestran `PaginaPendiente`.

Cada integrante debe:

1. Revisar las páginas originales de su módulo en `sonido.vivo`.
2. Adaptar su contenido a componentes React dentro de `frontend/src/pages`.
3. Crear componentes reutilizables dentro de `frontend/src/components`.
4. Importar la página terminada en `App.jsx` y conectarla con su ruta.

Coordinen los cambios en `App.jsx` para evitar modificar las mismas líneas.
Conserven las páginas originales durante la migración.

## 5. Comprobar los cambios antes de subirlos

Desde `frontend`, ejecuta estos comandos uno por uno:

```bash
npm run lint
```

Revisa posibles errores del código.
Si vuelve a la terminal sin mostrar errores, la revisión pasó.

```bash
npm run test:run
```

Ejecuta las pruebas una vez en Google Chrome.
Comprueba que se ejecuten pruebas y que todas pasen:
un resultado de cero pruebas no verifica el código.

```bash
npm run test:coverage
```

Ejecuta las pruebas y genera el informe `frontend/coverage/index.html`.
Puedes abrirlo en el navegador para consultar los resultados.

La configuración exige un mínimo de 80 % de cobertura.
Solo se mide el código importado por las pruebas:
un porcentaje alto no significa que toda la aplicación esté probada.

```bash
npm run build
```

Transforma y optimiza la aplicación para publicarla.
Los archivos generados quedan en `frontend/dist`.
Este comando no publica el sitio automáticamente.

Si algún comando falla, revisa el error antes de integrar los cambios.
No cambies las configuraciones compartidas ni bajes el mínimo de cobertura
sin acordarlo con el equipo.

## Jasmine y Karma

- Jasmine permite escribir las pruebas y comprobar sus resultados.
- Karma ejecuta las pruebas en Google Chrome.
- Testing Library ayuda a comprobar los componentes como los utiliza una persona.

### Archivos de pruebas

- `frontend/karma.conf.cjs`: configuración de Karma.
- `frontend/src/test/setup.js`: prepara las comprobaciones adicionales de Jasmine.
- Archivos `.spec.js` o `.spec.jsx` dentro de `frontend/src`: contienen las pruebas.

Karma detecta esos archivos automáticamente.
Actualmente existen dos pruebas para `NoEncontrada.jsx`.
Cada integrante debe agregar las pruebas de su módulo.

### Ejecutar pruebas mientras trabajas

```bash
npm test
```

Mantiene Karma abierto y repite las pruebas al guardar cambios.
Para detenerlo, presiona Ctrl + C.

## 6. Guardar y subir el trabajo

Si estás dentro de `frontend`, vuelve a la raíz:

```bash
cd ..
```

Comprueba tu branch y los archivos modificados:

```bash
git status
```

Prepara únicamente los archivos de tu tarea.
Por ejemplo:

```bash
git add frontend/src/pages/Productos.jsx
```

Guarda los cambios:

```bash
git commit -m "feat: crea catalogo de productos"
```

Sube tu branch usando su nombre real:

```bash
git push -u origin feature/20-catalogo
```

En GitHub:

1. Abre una Pull Request desde tu branch hacia `main`.
2. Explica qué cambió y cómo lo comprobaste.
3. Agrega `Closes #20`, reemplazando 20 por el número real de tu issue.
4. Pide revisión a un compañero.
5. Integra los cambios cuando estén revisados y las comprobaciones pasen.

## Archivos que se suben y archivos que se excluyen

Sí se suben:

- Código, imágenes y estilos.
- `package.json` y `package-lock.json`.
- Configuraciones y archivos de pruebas.
- README!!!

No se suben:

- `node_modules/`
- `dist/`
- `coverage/`
- `test-results/`

Estas carpetas se generan mediante los comandos del proyecto
y deben estar excluidas en `.gitignore`.

## Si algo falla

- No ejecutes `npm audit fix --force` sin revisar qué versiones cambiará.