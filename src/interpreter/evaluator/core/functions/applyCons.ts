/* eslint-disable @typescript-eslint/no-unused-vars */
import Frame from '../../../env/Frame';
import {ConsCell, Datum} from '../../../../lang/ConsCell';
import {Atom} from '../../../../lang/Atom';

export default function applyCons(
  frame: Frame,
  evalConsCell: (consCell: ConsCell) => Datum,
): (operands: Atom[]) => Datum {
  return (operands: Atom[]): Datum => {
    const [car, cdr] = operands;
    return new ConsCell(car, cdr);
  };
}
