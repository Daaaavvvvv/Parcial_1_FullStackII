import { Link } from 'react-router';

function NoEncontrada(){
    return (
        <section>
            <h1>Página no encontrada</h1>
            <p>La direccion o ruta ingresada no existe</p>
            <Link to="/" className="btn btn-primary">
            Volver al inicio
            </Link>
        </section>
    );
}

export default NoEncontrada;