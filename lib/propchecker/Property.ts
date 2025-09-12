import type { ValueFound } from "./ValueFound.ts";
import type { PropertyParams } from "./PropertyParams.ts";

/**
 * Constructs an `object` that stores some information about
 * the property that is being type-guarded.
 */
export class Property<O> {
  /**
   * The name of the type of the `object` that owns the {@linkcode Property}
   */
  #objectType?: string;
  /**
   * The identifier of the {@linkcode Property} as `string`.
   */
  #key?: string;
  /**
   * The name the type that the {@linkcode Property} accepts.
   * - If the {@linkcode Property} accepts more than one type,
   *   the types' are separated by a `" | "`.
   */
  #type?: string;
  /**
   * An `object` that stores some information
   * about the value that is being assigned to the {@linkcode Property}.
   */
  #valueFound?: ValueFound;
  /**
   * A template literal storing the name of the `function` that
   * is trying to access the {@linkcode  Property}, alongside the name of the `class`
   * to which this `function` belongs, in the form of `${className}.${functionName}`.
   */
  #caller?: string;
  /**
   * @param params An `object` used to pass information about the {@linkcode Property}.
   */
  constructor(params?: Partial<PropertyParams<O>>) {
    this.objectType = params?.objectType;
    this.key = params?.key;
    this.type = params?.type;
    this.valueFound = params?.value;
    this.caller = {
      caller: params?.caller,
      callerClass: params?.callerClass,
    };
  }
  set objectType(
    value: Partial<PropertyParams<O>>["objectType"] | string | undefined,
  ) {
    this.#objectType = this.#typeToString(value);
  }
  get objectType(): string | undefined {
    return this.#objectType;
  }
  set key(value: Partial<PropertyParams<O>["key"]> | string | undefined) {
    this.#key = String(value);
  }
  get key(): string | undefined {
    return this.#key;
  }
  set type(value: Partial<PropertyParams<O>>["type"] | string | undefined) {
    this.#type = value instanceof Array
      ? value.map((v) => this.#typeToString(v)).join(" | ")
      : this.#typeToString(value);
  }
  get type(): string | undefined {
    return this.#type;
  }
  set valueFound(value: PropertyParams<O>["value"]) {
    this.#valueFound = {
      value: value,
      type: typeof value,
      constructor: value?.constructor.name,
    };
  }
  get valueFound(): ValueFound | undefined {
    return this.#valueFound;
  }
  set caller(
    value:
      | Pick<Partial<PropertyParams<O>>, "caller" | "callerClass">
      | undefined,
  ) {
    const caller = typeof value?.caller === "string"
      ? value.caller
      : value?.caller?.name;
    const callerClass = typeof value?.callerClass === "string"
      ? value.callerClass
      : value?.callerClass?.name;
    this.#caller = `${callerClass ? `${callerClass}.` : ""}${caller}`;
  }
  get caller(): string | undefined {
    return this.#caller;
  }

  /**
   * Extracts a `string` name from a type.
   * @param type The type from which to extract a `string` name.
   * @returns A `string` name representing the input {@linkcode type}.
   */
  #typeToString<T>(type: T): string {
    return typeof type === "string"
      ? type
      : typeof type === "function"
      ? type.name
      : typeof type === "object"
      ? type?.constructor.name === "Object"
        ? JSON.stringify(type)
        : String(type?.constructor.name)
      : String(type);
  }
}
