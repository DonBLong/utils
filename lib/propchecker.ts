/**
 * Represents a type-map mapping each name of the JavaScript's primitive types (including "null") as key
 * to a type compatible with what the type's name represent.
 */
export interface PrimitiveTypes {
  bigint: bigint;
  boolean: boolean;
  function: (...args: unknown[]) => unknown;
  number: number;
  object: object;
  string: string;
  symbol: symbol;
  undefined: undefined;
  null: null;
}

/**
 * Represents a `constructor` `Function`.
 */
// deno-lint-ignore no-explicit-any
export type Constructor = abstract new (...args: any[]) => any;

/**
 * Obtain the type of a `class`, where {@link C} must extend a {@link Constructor}.
 */
// deno-lint-ignore no-explicit-any
export type Class<C> = C extends abstract new (...args: any[]) => infer T ? T
  : never;

/**
 * Obtain the keys of an `object` or a `class`.
 */
export type Key<O> = O extends Constructor ? keyof Class<O> : keyof O;

/**
 * Represents the value a type selector.
 */
export type Type = keyof PrimitiveTypes | Constructor | object;

/**
 * Obtain the type of a value as a type selector. See {@link Type}.
 */
export type Value<T> = T extends keyof PrimitiveTypes ? PrimitiveTypes[T]
  : T extends Constructor ? Class<T>
  : T extends object ? T
  : never;

/**
 * Represents the `object` parameter of the `constructor`
 * of the {@link Property} `class`.
 */
export interface PropertyParams<O> {
  /**
   * The type of the `object` that owns the {@link Property}.
   * - Despite the name, this property will accept the `object`
   *   itself as its own type.
   */
  objectType: O;
  /**
   * The identifier of the {@link Property}.
   */
  key: Key<O>;
  /**
   * The type (or the list of types) that the {@link Property} accepts.
   */
  type: Type | Type[];
  /**
   * The actual value that is being assigned to the {@link Property}.
   */
  value: unknown;
  /**
   * The `function` that is trying to access the {@link Property}.
   */
  caller: (...args: unknown[]) => unknown;
  /**
   * The `class` to which the {@link caller} belongs.
   */
  callerClass: (...args: unknown[]) => unknown;
}

/**
 * Represents and `object` that stores some information
 * about the value that is being assigned to the {@link Property}.
 */
export interface ValueFound {
  /**
   * The actual value that is being assigned to the {@link Property}.
   */
  value: unknown;
  /**
   * The name of the type of the value that is being assigned to the {@link Property}.
   */
  type: keyof PrimitiveTypes;
  /**
   * The name of the `constructor` `Function` of the value.
   */
  constructor: string | undefined;
}

/**
 * Constructs an `object` that stores some information about
 * the property that is being type-guarded.
 */
export class Property<O> {
  /**
   * The name of the type of the `object` that owns the {@link Property}
   */
  #objectType?: string;
  /**
   * The identifier of the {@link Property} as `string`.
   */
  #key?: string;
  /**
   * The name the type that the {@link Property} accepts.
   * - If the {@link Property} accepts more than one type,
   *   the types' are separated by a `" | "`.
   */
  #type?: string;
  /**
   * An `object` that stores some information
   * about the value that is being assigned to the {@link Property}.
   */
  #valueFound?: ValueFound;
  /**
   * A template literal storing the name of the `function` that
   * is trying to access the {@link  Property}, alongside the name of the `class`
   * to which this `function` belongs, in the form of `${className}.${functionName}`.
   */
  #caller?: string;
  /**
   * @param params An `object` used to pass information about the {@link Property}.
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
      | string
      | undefined,
  ) {
    this.#caller = typeof value === "string"
      ? value
      : typeof value?.callerClass === "function"
      ? `${value?.callerClass.name}.${value?.caller?.name}`
      : value?.caller?.name;
  }
  get caller(): string | undefined {
    return this.#caller;
  }
  /**
   * Extract a `string` name from a type.
   * @param type The type from which to extract a `string` name.
   * @returns A `string` name representing the input {@link type}.
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

export class PropertyTypeError<O> extends TypeError {
  #property?: Property<O>;
  valueFound?: Property<O>["valueFound"];
  constructor(property?: Partial<PropertyParams<O>>) {
    super();
    this.property = property;
  }
  set property(value: Partial<PropertyParams<O>> | Property<O> | undefined) {
    this.#property = value instanceof Property ? value : new Property(value);
    this.message =
      `Property '${this.#property.key}' in type '${this.#property.objectType}' must be of type '${this.#property.type}'`;
    this.valueFound = this.#property.valueFound;
  }
  get property(): Property<O> | undefined {
    return this.#property;
  }
}

export class PropertyRequiredTypeError<O> extends TypeError {
  #property?: Property<O>;
  constructor(property?: Partial<PropertyParams<O>>) {
    super();
    this.property = property;
  }
  set property(value: Partial<PropertyParams<O>> | Property<O> | undefined) {
    this.#property = value instanceof Property ? value : new Property(value);
    this.message =
      `Property '${this.#property.key}' in type '${this.#property.objectType}' is '${
        String(
          this.#property.valueFound?.value,
        )
      }' but is required in method '${this.#property.caller}'`;
  }
  get property(): Property<O> | undefined {
    return this.#property;
  }
}

export function isNonNullable<O, P>(
  value: P,
  throwError?: {
    objectType: PropertyParams<O>["objectType"];
    key: PropertyParams<O>["key"];
    caller?: PropertyParams<O>["caller"];
    callerClass?: PropertyParams<O>["callerClass"];
  },
): value is NonNullable<P> {
  if (value === undefined || value === null) {
    if (throwError) {
      throw new PropertyRequiredTypeError({
        objectType: throwError.objectType,
        key: throwError.key,
        value: value,
        caller: throwError.caller,
        callerClass: throwError.callerClass,
      });
    }
    return false;
  }
  return true;
}

export function isOfType<O, T extends Type>(
  value: unknown,
  types: T | T[],
  throwError?: {
    objectType: PropertyParams<O>["objectType"];
    key: PropertyParams<O>["key"];
  },
): value is Value<T> {
  function isValid(type: T) {
    return typeof type === "string"
      // deno-lint-ignore valid-typeof
      ? typeof value === type
      : typeof type === "function"
      ? value?.constructor.name === type.name
      : typeof type === "object"
      ? JSON.stringify(value) === JSON.stringify(type)
      : value === null || value === undefined;
  }
  const typesArray = types instanceof Array ? types : [types];
  if (!typesArray.some(isValid)) {
    if (throwError) {
      throw new PropertyTypeError({
        objectType: throwError.objectType,
        key: throwError.key,
        type: types,
        value: value,
      });
    }
    return false;
  }
  return true;
}
