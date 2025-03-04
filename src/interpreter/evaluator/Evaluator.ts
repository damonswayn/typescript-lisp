import Frame from '../env/Frame';
import {ConsCell, Datum} from '../../lang/ConsCell';
import {Atom, AtomTypes} from '../../lang/Atom';
import coreFunctionTable from './core/coreFunctionTable';

/**
 * The Evaluator class is responsible for evaluating the cons cell tree that is generated by the parser. It does this by
 * recursively evaluating the car and cdr of each cons cell until it reaches a point where it can apply the operator to
 * the operands.
 *
 * The essential assumption here is that the first element in an evaluated cons cell is treated as a function name, and
 * the rest of the elements are treated as arguments to that function.
 */
export class Evaluator {
  private readonly parentFrame: Frame;

  constructor(parentFrame: Frame) {
    this.parentFrame = parentFrame;
  }

  /**
   * Return either the evaluated atom or the evaluated cons cell.
   */
  public eval(consCell: Datum): Datum {
    if (consCell instanceof ConsCell) {
      return this.evalConsCell(consCell);
    } else {
      return consCell as Atom;
    }
  }

  /**
   * Evaluates a cons cell by evaluating the car and cdr of the cons cell and then applying the operator to the operands.
   */
  private evalConsCell(consCell: ConsCell): Datum {
    const operator = this.eval(consCell.car) as Atom;
    const operands = this.evalOperands(consCell.cdr);

    return this.apply(operator, operands);
  }

  /**
   * Evaluates the operands of a cons cell by recursively evaluating the car of each cons cell in the list. This
   * allows us to handle nested lists.
   */
  private evalOperands(cdr: Datum | null) {
    const operands: Atom[] = [];

    let current = cdr;
    while (current !== null && current instanceof ConsCell) {
      operands.push(this.eval(current.car) as Atom);
      current = current.cdr;
    }

    return operands;
  }

  private apply(operator: Atom, operands: Atom[]): Datum {
    if (operator.type === AtomTypes.NULL) {
      return operator;
    }

    // If the operator is a symbol, we look up the symbol in the parent frame and return the value.
    if (operator.isSymbol()) {
      const symbol = operator.asValue<string>();
      const binding = this.parentFrame.lookup(symbol);
      if (binding !== null) {
        if (binding instanceof ConsCell) {
          return this.eval(binding);
        } else {
          return binding as Atom;
        }
      }
    }

    /**
     * This is where built-in functions are applied. If the operator is a string, we look up the function in the core
     * function table and apply it to the operands.
     *
     * The core function table is a mapping of function names to higher-order functions that take a frame and a
     * reference to the evaluator's eval function and return a function that takes an array of operands and returns
     * the result of applying the function to the operands.
     */
    if (operator.type === 'string') {
      const funcName = operator.value as string;
      if (Object.prototype.hasOwnProperty.call(coreFunctionTable, funcName)) {
        const builderFunction = coreFunctionTable[funcName];

        const applicatorFunction = builderFunction(
          this.parentFrame,
          this.eval.bind(this),
        );

        return applicatorFunction(operands);
      } else {
        throw new Error(`Function ${funcName} not found`);
      }
    }

    throw new Error(`Invalid operator: ${operator}`);
  }
}
