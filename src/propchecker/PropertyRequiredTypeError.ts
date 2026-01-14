import { Property } from "./Property.ts";
import type { PropertyParams } from "./PropertyParams.ts";

/**
 * Constructs a `TypeError` `object` that indicates that
 * a required property was not assigned a non-nullable value.
 */
export class PropertyRequiredTypeError<O> extends TypeError {
  /**
   * A {@linkcode Property} `object` that stores information about the required property
   * that was not assigned a non-nullable value.
   */
  #property?: Property<O>;
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
