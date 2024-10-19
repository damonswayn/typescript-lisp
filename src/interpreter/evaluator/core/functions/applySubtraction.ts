import {Atom, makeAtom} from '../../../../lang/Atom';
import {ConsCell, Datum} from '../../../../lang/ConsCell';
import Frame from '../../../env/Frame';

export default function applySubtraction(
  frame: Frame,
  evalConsCell: (consCell: ConsCell) => Datum,
): (operands: Atom[]) => Atom {
  return (operands: Atom[]): Atom => {
    const iteratorFunc = (acc: number, operand: Atom) => {
      if (operand.isSymbol()) {
        const binding = frame.lookup(operand.asValue<string>());
        if (binding !== null) {
          if (binding instanceof ConsCell) {
            return acc - (evalConsCell(binding) as Atom).asValue<number>();
          }

          return acc - binding.asValue<number>();
        }
      }

      return acc - operand.asValue<number>();
    };

    return makeAtom(operands.reduce(iteratorFunc, 0));
  };
}
