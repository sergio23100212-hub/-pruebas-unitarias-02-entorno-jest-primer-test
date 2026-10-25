import request from 'supertest';
import app from '../src/app';

describe('POST /tareas', () => {

    it('Debe crear una tarea cuando se envía título y descripción', async () => {
        const nuevaTarea = {
            titulo: "Aprender mocks",
            descripcion: "Estudiar mocks y stubs en Jest"
        };

        const response = await request(app)
            .post('/tareas')
            .send(nuevaTarea);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.titulo).toBe(nuevaTarea.titulo);
        expect(response.body.descripcion).toBe(nuevaTarea.descripcion);
        expect(response.body.completada).toBe(false);
    });

    it('Debe responder con 400 si falta algún campo obligatorio', async () => {
        const tareaInvalida = {
            titulo: "Tarea sin descripción"
        };

        const response = await request(app)
            .post('/tareas')
            .send(tareaInvalida);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.mensaje).toMatch(/obligatorios/i);
    });

});
