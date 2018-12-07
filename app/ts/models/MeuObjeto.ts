import { Imprimivel } from './Imprimivel'
import { Igualavel } from './igualavel'

export interface MeuObjeto<T> extends Imprimivel, Igualavel<T> {

}