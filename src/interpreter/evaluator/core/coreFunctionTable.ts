import applyAddition from './functions/applyAddition';
import applySubtraction from './functions/applySubtraction';
import applyMultiplication from './functions/applyMultiplication';
import applyDivision from './functions/applyDivision';
import applyDefine from './functions/applyDefine';
import {Atom} from '../../../lang/Atom';
import Frame from '../../env/Frame';
import {ConsCell, Datum} from '../../../lang/ConsCell';
import applyCons from './functions/applyCons';

export type BuilderFunction = (
  frame: Frame,
  evalConsCell: (consCell: ConsCell) => Datum,
) => (operands: Atom[]) => Datum;

export type CoreFunctionTable = {
  [key: string]: BuilderFunction;
};

const coreFunctionTable: CoreFunctionTable = {
  '+': applyAddition,
  '-': applySubtraction,
  '*': applyMultiplication,
  '/': applyDivision,
  define: applyDefine,
  cons: applyCons,
};

export default coreFunctionTable;
