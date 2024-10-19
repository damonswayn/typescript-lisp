/* eslint-disable @typescript-eslint/no-unused-vars */
import {Atom} from '../../../../lang/Atom';
import Frame from '../../../env/Frame';
import {ConsCell, Datum} from '../../../../lang/ConsCell';

export default function applyDefine(
  frame: Frame,
  evalConsCell: (consCell: ConsCell) => Datum,
): (operands: Atom[]) => Atom {
  return (operands: Atom[]): Atom => {
    const [symbol, value] = operands;

    frame.define(symbol.asValue<string>(), value);

    return value;
  };
}
