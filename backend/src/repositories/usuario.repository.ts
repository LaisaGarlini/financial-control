import { usuarioDTO } from '../dto/usuario.dto'
import { Usuario } from '../models/usuario'

export const UsuarioRepository = {
    async GetUsuarios(): Promise<usuarioDTO[]> {
        return await Usuario.findAll()
    },

    async GetUsuarioById(id: number): Promise<usuarioDTO | null> {
        return await Usuario.findByPk(id)
    },

    async Create(data: Omit<usuarioDTO, 'id'>): Promise<usuarioDTO> {
        return await Usuario.create(data)
    },

    async Update(data: Partial<usuarioDTO>): Promise<boolean> {
        const usuario = await Usuario.findByPk(data.id)

        if (usuario) {
            await usuario.update(data)
            return true
        }

        return false
    },

    async Delete(id: number): Promise<boolean> {
        const usuario = await Usuario.findByPk(id)

        if (usuario) {
            await usuario.destroy()
            return true
        }

        return false
    },
}
