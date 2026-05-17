/*
|--------------------------------------------------------------------------
| GERAR CÓDIGO DE VERIFICAÇÃO
|--------------------------------------------------------------------------
|
| Gera código aleatório de 6 números
|
*/

export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
