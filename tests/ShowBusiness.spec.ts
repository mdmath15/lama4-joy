import { ShowBusiness } from '../src/business/Show/ShowBusiness'
import { WEEK_DAY } from '../src/model/Show'

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
const showExistsDataBaseMock = {
  createShow: jest.fn(),
  getShowByHour: jest.fn(() => {
    return {
      id: 'any_id',
      weekDay: WEEK_DAY.SABADO,
      startTime: 0,
      endTime: 0,
      bandId: 'any_id'
    }
  })
} as any

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

describe('Testa ShowBusiness', () => {
  test('Retorna erro caso show já exista', async () => {
    expect.assertions(1)
    const showBusiness = new ShowBusiness(
      showExistsDataBaseMock,
      userDatabaseMock,
      RoleAdminMock,
      IdGeneratorMock
    )

    const input = {
      weekDay: WEEK_DAY.SABADO,
      startTime: 12,
      endTime: 12,
      bandId: 'any_id'
    }

    const token = IdGeneratorMock.generate()

    try {
      await showBusiness.createShow(input, token)
    } catch (error: any) {
      expect(error.message).toBe(
        'Horário inválido. Já existe um show cadastrado para o dia e horário passados'
      )
    }
  })
    
    test('Retorna erro caso weekday esteja faltando', async () => {
      expect.assertions(1)
      const showBusiness = new ShowBusiness(
        showExistsDataBaseMock,
        userDatabaseMock,
        RoleAdminMock,
        IdGeneratorMock
      )

      const input = {
        weekDay: "",
        startTime: 12,
        endTime: 12,
        bandId: 'any_id'
      } as any

      const token = IdGeneratorMock.generate()

      try {
        await showBusiness.createShow(input, token)
      } catch (error: any) {
        expect(error.message).toBe(
          'Por favor, passe todos os parâmetros weekDay, startTime, endTime e bandId para a criação do Show'
        )
      }
    })

    test('Retorna erro caso startTime esteja faltando', async () => {
      expect.assertions(1)
      const showBusiness = new ShowBusiness(
        showExistsDataBaseMock,
        userDatabaseMock,
        RoleAdminMock,
        IdGeneratorMock
      )

      const input = {
        weekDay: WEEK_DAY.SABADO,
        startTime: "",
        endTime: 12,
        bandId: 'any_id'
      } as any

      const token = IdGeneratorMock.generate()

      try {
        await showBusiness.createShow(input, token)
      } catch (error: any) {
        expect(error.message).toBe(
          'Por favor, passe todos os parâmetros weekDay, startTime, endTime e bandId para a criação do Show'
        )
      }
    })

    test('Retorna erro caso endTime esteja faltando', async () => {
      expect.assertions(1)
      const showBusiness = new ShowBusiness(
        showExistsDataBaseMock,
        userDatabaseMock,
        RoleAdminMock,
        IdGeneratorMock
      )

      const input = {
        weekDay: WEEK_DAY.SABADO,
        startTime: 12,
        endTime: "",
        bandId: 'any_id'
      } as any

      const token = IdGeneratorMock.generate()

      try {
        await showBusiness.createShow(input, token)
      } catch (error: any) {
        expect(error.message).toBe(
          'Por favor, passe todos os parâmetros weekDay, startTime, endTime e bandId para a criação do Show'
        )
      }
    })

    test('Retorna erro caso esteja fora do horario permitido', async () => {
      expect.assertions(1)
      const showBusiness = new ShowBusiness(
        showExistsDataBaseMock,
        userDatabaseMock,
        RoleAdminMock,
        IdGeneratorMock
      )

      const input = {
        weekDay: WEEK_DAY.SABADO,
        startTime: 6,
        endTime: 7,
        bandId: 'any_id'
      } as any

      const token = IdGeneratorMock.generate()

      try {
        await showBusiness.createShow(input, token)
      } catch (error: any) {
        expect(error.message).toBe(
          'Horário inválido. Os horários apenas podem ser registrados entre 8h e 23h'
        )
      }
    })
    test('Caso de sucesso na criação de show', async () => {
        expect.assertions(1)
        const showDatabase = {
            createShow: jest.fn(),
            getShowByHour: jest.fn(() => {
                return undefined
            })
        } as any

      const showBusiness = new ShowBusiness(
        showDatabase,
        userDatabaseMock,
        RoleAdminMock,
        IdGeneratorMock
      )

      const input = {
        weekDay: WEEK_DAY.SEXTA,
        startTime: 21,
        endTime: 22,
        bandId: 'any_id'
      } as any

      const token = IdGeneratorMock.generate()

      try {
          await showBusiness.createShow(input, token)
          expect(showDatabase.createShow).toHaveBeenCalled()
      } catch (error: any) {
      }
    })
})
