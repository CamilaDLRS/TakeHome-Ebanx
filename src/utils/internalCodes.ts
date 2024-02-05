export enum InternalCode {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_REQUEST = 'INVALID_REQUEST',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED'
}

export const ErrorMessage: Record<InternalCode, string> = {
  [InternalCode.INTERNAL_ERROR]: 'Erro interno, solicite suporte técnico.',
  [InternalCode.NOT_FOUND]: 'Recurso não encontrado.', 
  [InternalCode.INVALID_REQUEST]: 'Requisição inválida, verifique os paramêtros e corpo.', 
  [InternalCode.NOT_IMPLEMENTED]: 'Código ainda não implementado.',
};