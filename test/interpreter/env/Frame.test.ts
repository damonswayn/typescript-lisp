import Frame from '../../../src/interpreter/env/Frame';
import {makeAtom} from '../../../src/lang/Atom';

describe('Frame', () => {
  it('Creates a basic root frame', () => {
    const frame = new Frame();
    expect(frame.parent).toBeNull();
    expect(frame.bindings).toEqual(new Map());
  });

  it('Defines a binding', () => {
    const frame = new Frame();
    frame.define('x', makeAtom(5));
    expect(frame.bindings.get('x')).atomMatches(makeAtom(5));
  });

  it('Checks if a binding exists', () => {
    const frame = new Frame();
    frame.define('x', makeAtom(5));
    expect(frame.exists('x')).toBe(true);
  });

  it('Looks up a binding', () => {
    const frame = new Frame();
    frame.define('x', makeAtom(5));
    expect(frame.lookup('x')).atomMatches(makeAtom(5));
  });

  it('Throws an error when looking up an unbound variable', () => {
    const frame = new Frame();
    expect(frame.lookup('x')).toBeNull();
  });

  it('Looks up a binding in a parent frame', () => {
    const parent = new Frame();
    parent.define('x', makeAtom(5));
    const frame = new Frame(parent);
    expect(frame.lookup('x')).atomMatches(makeAtom(5));
  });
});
