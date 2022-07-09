import { BandBusiness } from '../src/business/Band/BandBusiness'

const RoleNormalMock = {
  generateToken: jest.fn((paylod: any) => {
    return 'token_mockado'
  }),
  getData: jest.fn((token: any): any => {
    return {
      id: 'any_id',
      role: 'NORMAL'
    }
  })
}

const RoleAdminMock = {
  generateToken: jest.fn((paylod: any) => {
    return 'token_mockado'
  }),
  getData: jest.fn((token: any): any => {
    return {
      id: 'any_id',
      role: 'ADMIN'
    }
  })
}

const IdGeneratorMock = {
  generate: jest.fn((): any => {
    return 'any_id'
  })
}

const bandDatabaseMock = { createBand: jest.fn((input) => {}) } as any

const userDatabaseMock = {
  getUserById: jest.fn(() => {
    return {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      role: 'ADMIN'
    }
  })
} as any

describe('Testa a classe BandBusiness', () => {
  test('Deve dar erro se o campo nome estiver vazio', async () => {
    expect.assertions(1)
    const bandBusiness = new BandBusiness(
      bandDatabaseMock,
      userDatabaseMock,
      RoleAdminMock,
      IdGeneratorMock
    )

    const input: any = {
      name: '',
      music_genre: 'Rock',
      responsible: 'João'
    }

    const token = IdGeneratorMock.generate()

    try {
      await bandBusiness.createBand(input, token)
    } catch (error: any) {
      expect(error.message).toBe(
        'Por favor, passe os parâmetros name, music_genre e responsible na requisição'
      )
    }
  })

  test('Deve dar erro se o campo music_genre estiver vazio', async () => {
    expect.assertions(1)
    const bandBusiness = new BandBusiness(
      bandDatabaseMock,
      userDatabaseMock,
      RoleAdminMock,
      IdGeneratorMock
    )

    const input: any = {
      name: 'Banda',
      music_genre: '',
      responsible: 'João'
    }

    const token = IdGeneratorMock.generate()

    try {
      await bandBusiness.createBand(input, token)
    } catch (error: any) {
      expect(error.message).toBe(
        'Por favor, passe os parâmetros name, music_genre e responsible na requisição'
      )
    }
  })

  test('Deve dar erro se o campo responsible estiver vazio', async () => {
    expect.assertions(1)
    const bandBusiness = new BandBusiness(
      bandDatabaseMock,
      userDatabaseMock,
      RoleAdminMock,
      IdGeneratorMock
    )

    const input: any = {
      name: 'Banda',
      music_genre: 'Rock',
      responsible: ''
    }

    const token = IdGeneratorMock.generate()

    try {
      await bandBusiness.createBand(input, token)
    } catch (error: any) {
      expect(error.message).toBe(
        'Por favor, passe os parâmetros name, music_genre e responsible na requisição'
      )
    }
  })

  test('Deve dar erro se o role do usuário não for ADMIN', async () => {
    expect.assertions(1)

    const bandBusiness = new BandBusiness(
      bandDatabaseMock,
      userDatabaseMock,
      RoleNormalMock,
      IdGeneratorMock
    )

    const input: any = {
      name: 'Any_Band',
      music_genre: 'Any_Genre',
      responsible: 'Any_responsible'
    }

    const token = IdGeneratorMock.generate()

    try {
      await bandBusiness.createBand(input, token)
    } catch (error: any) {
        expect(error.message).toBe('Usuário não autorizado')
    }
  })
    
    test('Deve criar uma banda com sucesso caso todos os dados estejam corretos', async () => {
      expect.assertions(1)

      const bandBusiness = new BandBusiness(
        bandDatabaseMock,
        userDatabaseMock,
        RoleAdminMock,
        IdGeneratorMock
      )

      const input: any = {
        name: 'Any_Band',
        music_genre: 'Any_Genre',
        responsible: 'Any_responsible'
      }

      const token = IdGeneratorMock.generate()

      try {
          await bandBusiness.createBand(input, token)

          expect(bandDatabaseMock.createBand).toHaveBeenCalled()
      } catch (error: any) {
          
      }
    })
})
