import {Atom} from '../../lang/Atom';
import {ConsCell} from '../../lang/ConsCell';

type ParentFrame = Frame | null;
type Binding = Atom | ConsCell | null;
type FrameBindings = Map<string, Binding>;

/**
 * Represents a frame in the environment. In the context of the interpreter, a frame is essentially a stack frame
 * for the current executing function with the idea being that each function call creates a new frame. Each frame
 * contains a map of bindings which are essentially the variables that are defined within the function.
 */
export default class Frame {
  private readonly _parent: ParentFrame;
  private readonly _bindings: FrameBindings;

  constructor(parent: ParentFrame = null) {
    this._parent = parent;
    this._bindings = new Map();
  }

  public get parent(): ParentFrame {
    return this._parent;
  }

  public get bindings(): FrameBindings {
    return this._bindings;
  }

  /**
   * defines a new binding for the current frame.
   */
  public define(key: string, value: Binding): void {
    this._bindings.set(key, value);
  }

  /**
   * Does the current frame have a binding for the given key?
   */
  public exists(key: string): boolean {
    return this._bindings.has(key);
  }

  /**
   * Looks up the value of a binding in the current frame or any parent frames.
   */
  public lookup(key: string): Binding {
    if (this._bindings.has(key)) {
      return this._bindings.get(key)!;
    } else if (this._parent !== null) {
      return this._parent.lookup(key);
    } else {
      return null;
    }
  }

  public toString(): string {
    let output = '';

    this._bindings.forEach((value, key) => {
      output += `(${key} . ${value?.toString()})\n`;
    });

    return output;
  }
}
