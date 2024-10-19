import {ConsCell} from '../../src/lang/ConsCell';
import {makeAtom} from '../../src/lang/Atom';

describe('Cons Cell', () => {
  it('should be a proper list', () => {
    const cell = new ConsCell(
      new ConsCell(new ConsCell(makeAtom(5), null), null),
      null,
    );

    expect(cell.isProperList()).toBe(true);
  });

  it('should be an improper list', () => {
    const cell = new ConsCell(
      new ConsCell(makeAtom(5), makeAtom(6)),
      makeAtom(7),
    );

    expect(cell.isImproperList()).toBe(true);
  });

  it('should be a dotted pair', () => {
    const cell = new ConsCell(makeAtom(5), makeAtom(6));

    expect(cell.isDottedPair()).toBe(true);
  });
});
