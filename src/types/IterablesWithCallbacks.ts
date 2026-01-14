/**
 * Obtain a `Tuple` with 1-2 elements, the first is an `Iterable` of {@linkcode Type},
 * and the second is an optional or a required callback the returns {@linkcode Constraint}.
 *
 * @typeparam Type The type of the elements of the `Iterable`.
 * @typeparam Constaint The type-constraint the the elements of the `Iterable` must meet
 * for the callback to be optional.
 */
export type IterableAndCallbackTuple<Type, Constraint> = Iterable<Type> extends
  Iterable<Constraint>
  ? [Iterable<Type>] | [Iterable<Type>, (p: Type) => Constraint]
  : [Iterable<Type>, (p: Type) => Constraint];

/**
 * Obtain a `Tuple` with 2-4 elements, the first 2 elements are an `Iterable` of {@linkcode TypeA}
 * and an `Iterable` of {@linkcode TypeB}. The other 2 elements are either optional or required
 * callbacks for each `Iterable` consecutivley. If either one of the iterables did not fulfill
 * its constraint, then its respective callback is required, otherwise its optional.
 *
 * @typeparam TypeA The type of the elements of the first `Iterable`.
 * @typeparam ConstraintA The type-constraint that the elements of the `Iterable` of {@linkcode TypeA}
 * must meet for their respective callback to be optional.
 * @typeparam TypeB The type of the elements of the second `Iterable`.
 * @typeparam ConstraintB The type-constraint the elements of the `Iterable` of {@linkcode TypeB}
 * must meet for their respective callback to be optional.
 */
export type IterableAndCallbackDouble<TypeA, ConstraintA, TypeB, ConstraintB> =
  Iterable<TypeA> extends Iterable<ConstraintA>
    ? Iterable<TypeB> extends Iterable<ConstraintB>
      // Both compatible (any combination)
      ? [Iterable<TypeA>, Iterable<TypeB>] | [
        Iterable<TypeA>,
        Iterable<TypeB>,
        ((p: TypeA) => ConstraintA),
      ] | [
        Iterable<TypeA>,
        Iterable<TypeB>,
        ((p: TypeA) => ConstraintA) | undefined,
        (p: TypeB) => ConstraintB,
      ]
      // TypeA compatible, TypeB incompatible
    : [
      Iterable<TypeA>,
      Iterable<TypeB>,
      ((p: TypeA) => ConstraintA) | undefined,
      (p: TypeB) => ConstraintB,
    ]
    : Iterable<TypeB> extends Iterable<ConstraintB>
    // TypeA incompatible, TypeB compatible
      ? [Iterable<TypeA>, Iterable<TypeB>, (p: TypeA) => ConstraintA]
    // Both incompatible (both converters)
    : [
      Iterable<TypeA>,
      Iterable<TypeB>,
      ((p: TypeA) => ConstraintA),
      (p: TypeB) => ConstraintB,
    ];

/**
 * Represents an `object` storing an `Iterable` of {@linkcode Type}
 * alongside its optional callback that returns {@linkcode Constraint}.
 *
 * @typeparam Type The type of the elements of the `Iterable`.
 * @typeparam Constraint An optional type-constraint that is the return-type
 * of the optional {@linkcode callback}.
 */
export interface IterableWithOptionalCallback<Type, Constraint> {
  /**
   * The iterable whose elements are of type {@linkcode Type}.
   */
  iterable: Iterable<Type>;
  /**
   * An optioanl callback that returns a value of type {@linkcode Constraint}.
   * @param element The element of the {@linkcode iterable}.
   * @returns A value of Type the {@linkcode Constraint}.
   */
  callback?(element: Type): Constraint;
}

/**
 * Represents an `object` storing an `Iterable` of {@linkcode Type}
 * alongside its required callback that returns {@linkcode Constraint}.
 *
 * @typeparam Type The type of the elements of the `Iterable`.
 * @typeparam Constraint A required type-constraint for all elements of
 * the `Iterable` and is the return-type of the requried {@linkcode callback}.
 */
export interface IterableWithCallback<Type, Constraint> {
  /**
   * The iterable whose elements are of type {@linkcode Type}.
   */
  iterable: Iterable<Type>;
  /**
   * A required callback that returns a value of type {@linkcode Constraint}.
   * @param element The element of the {@linkcode iterable}.
   * @returns A value of Type {@linkcode Constraint}.
   */
  callback(element: Type): Constraint;
}

/**
 * Obtain an `Iterable` of {@linkcode Type}, or an `object` that stores the `Iterable` alongside
 * its optional or requried callback that returns {@linkcode Constraint}.
 *
 * @typeparam Type The type of the elements of the `Iterable`.
 * @typeparam Constraint The type-constraint that the elements of the `Iterable` must meet
 * for the callback to be optional.
 */
export type IterableAndCallback<Type, Constraint> = Iterable<Type> extends
  Iterable<Constraint>
  ? Iterable<Type> | IterableWithOptionalCallback<Type, Constraint>
  : IterableWithCallback<Type, Constraint>;
