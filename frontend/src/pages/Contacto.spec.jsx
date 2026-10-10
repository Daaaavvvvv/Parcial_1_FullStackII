import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contacto from './Contacto';

describe('Componente Contacto (Pruebas)', function() {
  
  it('muestra un error cuando el correo no tiene un dominio permitido', function() {
    render(<Contacto />);

    // Buscar elementos en el formulario
    const inputNombre = screen.getByLabelText(/tu nombre/i);
    const inputCorreo = screen.getByLabelText(/correo/i);
    const inputMensaje = screen.getByLabelText(/comentario/i);
    const botonEnviar = screen.getByRole('button', { name: /enviar mensaje/i });

    // Simular escritura con un correo no válido
    fireEvent.change(inputNombre, { target: { value: 'Estudiante Test' } });
    fireEvent.change(inputCorreo, { target: { value: 'correo@yahoo.com' } });
    fireEvent.change(inputMensaje, { target: { value: 'Consulta de prueba para el sistema.' } });

    // Hacer clic en enviar
    fireEvent.click(botonEnviar);

    // Verificar que aparezca el error correspondiente a los dominios
    const mensajeError = screen.getByText(/Debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com/i);
    expect(mensajeError).toBeDefined();
  });

});