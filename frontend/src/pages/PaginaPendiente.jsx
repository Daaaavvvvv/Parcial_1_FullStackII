import { useParams } from 'react-router';

function PaginaPendiente({ titulo }) {
    const parametros = useParams();

    return (
        <section>
            <h1>{titulo}</h1>
            <p>Esta pagina esta pendiente de desarrollo</p>

            {Object.entries(parametros).map(([nombre, valor]) => (
                <p key={nombre}>
                    {nombre}: {valor}
                </p>
            ))}
        </section>
    );
}

export default PaginaPendiente;