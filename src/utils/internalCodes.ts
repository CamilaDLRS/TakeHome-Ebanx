export enum InternalCode {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED'
}

export const ErrorMessage: Record<InternalCode, string> = {
  [InternalCode.INTERNAL_ERROR]: 'Erro interno, solicite suporte técnico.',
  [InternalCode.INVALID_REQUEST]: 'Requisição inválida, verifique os paramêtros e corpo.', 
  [InternalCode.NOT_IMPLEMENTED]: 'Código ainda não implementado.',
};