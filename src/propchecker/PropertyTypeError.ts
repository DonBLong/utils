import { Property } from "./Property.ts";
import type { PropertyParams } from "./PropertyParams.ts";

/**
 * Constructs a `TypeError` `object` that indicates that
 * a type-incompatible value is being assigned to a property.
 */
export class PropertyTypeError<O> extends TypeError {
  /**
   * A {@linkcode Property} `object` that stores information about the property
   * to which the type-incompatible value is being assigned.
   */
  #property?: Property<O>;
  /**
   * A {@linkcode ValueFound} `object` that stores information about
   * the type-incompatible value that is being assigned to the property.
   */
  valueFound?: Property<O>["valueFound"];
  /**
   * @param property An `object` used to pass information about the {@linkcode Property}.
   */
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
