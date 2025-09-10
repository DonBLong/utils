/**
 * Represents an `object` that stores the best-matching candidate
 * from a list of candidates alongside its matching-score.
 *
 * @typeparam Candidate The type of the candidate the was elected as the best-matching candidate.
 */
export interface BestMatch<Candidate> {
  /**
   * The candidate that was elected as the best-matching candidate.
   */
  match?: Candidate;
  /**
   * The matching-score of the candidate elected as the best-matching candidate.
   */
  matchingScore: number;
}
