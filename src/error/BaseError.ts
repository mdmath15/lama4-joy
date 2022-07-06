export class BaseError extends Error {
    constructor(public code: number,message:string) {
      super(message);
    }
  }
  export class InvalidEmail extends BaseError{
    constructor() {
      super(400,"Email Inválido")
    }
  }
  export class InvalidName extends BaseError{ 
    constructor(){
        super(400, "Nome inválido")
    }
      }
      export class InvalidPassword extends BaseError{
        constructor(){
          super(400,"Senha inválida")
        }
    }    
 export class UserNotFound extends BaseError{
      constructor(){
        super(404,"Usuário não encontrado")
      }
  }