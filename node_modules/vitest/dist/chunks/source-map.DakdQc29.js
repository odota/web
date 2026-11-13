import { g as getDefaultExportFromCjs } from './index.D0heQG4v.js';
import { p as isPrimitive, q as notNullish, r as resolve$1 } from './pathe.M-eThtNZ.zq3TM4NT.js';

var build = {};

var hasRequiredBuild;

function requireBuild () {
	if (hasRequiredBuild) return build;
	hasRequiredBuild = 1;

	Object.defineProperty(build, '__esModule', {
	  value: true
	});
	build.default = diffSequence;
	/**
	 * Copyright (c) Meta Platforms, Inc. and affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	// This diff-sequences package implements the linear space variation in
	// An O(ND) Difference Algorithm and Its Variations by Eugene W. Myers

	// Relationship in notation between Myers paper and this package:
	// A is a
	// N is aLength, aEnd - aStart, and so on
	// x is aIndex, aFirst, aLast, and so on
	// B is b
	// M is bLength, bEnd - bStart, and so on
	// y is bIndex, bFirst, bLast, and so on
	// Δ = N - M is negative of baDeltaLength = bLength - aLength
	// D is d
	// k is kF
	// k + Δ is kF = kR - baDeltaLength
	// V is aIndexesF or aIndexesR (see comment below about Indexes type)
	// index intervals [1, N] and [1, M] are [0, aLength) and [0, bLength)
	// starting point in forward direction (0, 0) is (-1, -1)
	// starting point in reverse direction (N + 1, M + 1) is (aLength, bLength)

	// The “edit graph” for sequences a and b corresponds to items:
	// in a on the horizontal axis
	// in b on the vertical axis
	//
	// Given a-coordinate of a point in a diagonal, you can compute b-coordinate.
	//
	// Forward diagonals kF:
	// zero diagonal intersects top left corner
	// positive diagonals intersect top edge
	// negative diagonals insersect left edge
	//
	// Reverse diagonals kR:
	// zero diagonal intersects bottom right corner
	// positive diagonals intersect right edge
	// negative diagonals intersect bottom edge

	// The graph contains a directed acyclic graph of edges:
	// horizontal: delete an item from a
	// vertical: insert an item from b
	// diagonal: common item in a and b
	//
	// The algorithm solves dual problems in the graph analogy:
	// Find longest common subsequence: path with maximum number of diagonal edges
	// Find shortest edit script: path with minimum number of non-diagonal edges

	// Input callback function compares items at indexes in the sequences.

	// Output callback function receives the number of adjacent items
	// and starting indexes of each common subsequence.
	// Either original functions or wrapped to swap indexes if graph is transposed.
	// Indexes in sequence a of last point of forward or reverse paths in graph.
	// Myers algorithm indexes by diagonal k which for negative is bad deopt in V8.
	// This package indexes by iF and iR which are greater than or equal to zero.
	// and also updates the index arrays in place to cut memory in half.
	// kF = 2 * iF - d
	// kR = d - 2 * iR
	// Division of index intervals in sequences a and b at the middle change.
	// Invariant: intervals do not have common items at the start or end.
	const pkg = 'diff-sequences'; // for error messages
	const NOT_YET_SET = 0; // small int instead of undefined to avoid deopt in V8

	// Return the number of common items that follow in forward direction.
	// The length of what Myers paper calls a “snake” in a forward path.
	const countCommonItemsF = (aIndex, aEnd, bIndex, bEnd, isCommon) => {
	  let nCommon = 0;
	  while (aIndex < aEnd && bIndex < bEnd && isCommon(aIndex, bIndex)) {
	    aIndex += 1;
	    bIndex += 1;
	    nCommon += 1;
	  }
	  return nCommon;
	};

	// Return the number of common items that precede in reverse direction.
	// The length of what Myers paper calls a “snake” in a reverse path.
	const countCommonItemsR = (aStart, aIndex, bStart, bIndex, isCommon) => {
	  let nCommon = 0;
	  while (aStart <= aIndex && bStart <= bIndex && isCommon(aIndex, bIndex)) {
	    aIndex -= 1;
	    bIndex -= 1;
	    nCommon += 1;
	  }
	  return nCommon;
	};

	// A simple function to extend forward paths from (d - 1) to d changes
	// when forward and reverse paths cannot yet overlap.
	const extendPathsF = (
	  d,
	  aEnd,
	  bEnd,
	  bF,
	  isCommon,
	  aIndexesF,
	  iMaxF // return the value because optimization might decrease it
	) => {
	  // Unroll the first iteration.
	  let iF = 0;
	  let kF = -d; // kF = 2 * iF - d
	  let aFirst = aIndexesF[iF]; // in first iteration always insert
	  let aIndexPrev1 = aFirst; // prev value of [iF - 1] in next iteration
	  aIndexesF[iF] += countCommonItemsF(
	    aFirst + 1,
	    aEnd,
	    bF + aFirst - kF + 1,
	    bEnd,
	    isCommon
	  );

	  // Optimization: skip diagonals in which paths cannot ever overlap.
	  const nF = d < iMaxF ? d : iMaxF;

	  // The diagonals kF are odd when d is odd and even when d is even.
	  for (iF += 1, kF += 2; iF <= nF; iF += 1, kF += 2) {
	    // To get first point of path segment, move one change in forward direction
	    // from last point of previous path segment in an adjacent diagonal.
	    // In last possible iteration when iF === d and kF === d always delete.
	    if (iF !== d && aIndexPrev1 < aIndexesF[iF]) {
	      aFirst = aIndexesF[iF]; // vertical to insert from b
	    } else {
	      aFirst = aIndexPrev1 + 1; // horizontal to delete from a

	      if (aEnd <= aFirst) {
	        // Optimization: delete moved past right of graph.
	        return iF - 1;
	      }
	    }

	    // To get last point of path segment, move along diagonal of common items.
	    aIndexPrev1 = aIndexesF[iF];
	    aIndexesF[iF] =
	      aFirst +
	      countCommonItemsF(aFirst + 1, aEnd, bF + aFirst - kF + 1, bEnd, isCommon);
	  }
	  return iMaxF;
	};

	// A simple function to extend reverse paths from (d - 1) to d changes
	// when reverse and forward paths cannot yet overlap.
	const extendPathsR = (
	  d,
	  aStart,
	  bStart,
	  bR,
	  isCommon,
	  aIndexesR,
	  iMaxR // return the value because optimization might decrease it
	) => {
	  // Unroll the first iteration.
	  let iR = 0;
	  let kR = d; // kR = d - 2 * iR
	  let aFirst = aIndexesR[iR]; // in first iteration always insert
	  let aIndexPrev1 = aFirst; // prev value of [iR - 1] in next iteration
	  aIndexesR[iR] -= countCommonItemsR(
	    aStart,
	    aFirst - 1,
	    bStart,
	    bR + aFirst - kR - 1,
	    isCommon
	  );

	  // Optimization: skip diagonals in which paths cannot ever overlap.
	  const nR = d < iMaxR ? d : iMaxR;

	  // The diagonals kR are odd when d is odd and even when d is even.
	  for (iR += 1, kR -= 2; iR <= nR; iR += 1, kR -= 2) {
	    // To get first point of path segment, move one change in reverse direction
	    // from last point of previous path segment in an adjacent diagonal.
	    // In last possible iteration when iR === d and kR === -d always delete.
	    if (iR !== d && aIndexesR[iR] < aIndexPrev1) {
	      aFirst = aIndexesR[iR]; // vertical to insert from b
	    } else {
	      aFirst = aIndexPrev1 - 1; // horizontal to delete from a

	      if (aFirst < aStart) {
	        // Optimization: delete moved past left of graph.
	        return iR - 1;
	      }
	    }

	    // To get last point of path segment, move along diagonal of common items.
	    aIndexPrev1 = aIndexesR[iR];
	    aIndexesR[iR] =
	      aFirst -
	      countCommonItemsR(
	        aStart,
	        aFirst - 1,
	        bStart,
	        bR + aFirst - kR - 1,
	        isCommon
	      );
	  }
	  return iMaxR;
	};

	// A complete function to extend forward paths from (d - 1) to d changes.
	// Return true if a path overlaps reverse path of (d - 1) changes in its diagonal.
	const extendOverlappablePathsF = (
	  d,
	  aStart,
	  aEnd,
	  bStart,
	  bEnd,
	  isCommon,
	  aIndexesF,
	  iMaxF,
	  aIndexesR,
	  iMaxR,
	  division // update prop values if return true
	) => {
	  const bF = bStart - aStart; // bIndex = bF + aIndex - kF
	  const aLength = aEnd - aStart;
	  const bLength = bEnd - bStart;
	  const baDeltaLength = bLength - aLength; // kF = kR - baDeltaLength

	  // Range of diagonals in which forward and reverse paths might overlap.
	  const kMinOverlapF = -baDeltaLength - (d - 1); // -(d - 1) <= kR
	  const kMaxOverlapF = -baDeltaLength + (d - 1); // kR <= (d - 1)

	  let aIndexPrev1 = NOT_YET_SET; // prev value of [iF - 1] in next iteration

	  // Optimization: skip diagonals in which paths cannot ever overlap.
	  const nF = d < iMaxF ? d : iMaxF;

	  // The diagonals kF = 2 * iF - d are odd when d is odd and even when d is even.
	  for (let iF = 0, kF = -d; iF <= nF; iF += 1, kF += 2) {
	    // To get first point of path segment, move one change in forward direction
	    // from last point of previous path segment in an adjacent diagonal.
	    // In first iteration when iF === 0 and kF === -d always insert.
	    // In last possible iteration when iF === d and kF === d always delete.
	    const insert = iF === 0 || (iF !== d && aIndexPrev1 < aIndexesF[iF]);
	    const aLastPrev = insert ? aIndexesF[iF] : aIndexPrev1;
	    const aFirst = insert
	      ? aLastPrev // vertical to insert from b
	      : aLastPrev + 1; // horizontal to delete from a

	    // To get last point of path segment, move along diagonal of common items.
	    const bFirst = bF + aFirst - kF;
	    const nCommonF = countCommonItemsF(
	      aFirst + 1,
	      aEnd,
	      bFirst + 1,
	      bEnd,
	      isCommon
	    );
	    const aLast = aFirst + nCommonF;
	    aIndexPrev1 = aIndexesF[iF];
	    aIndexesF[iF] = aLast;
	    if (kMinOverlapF <= kF && kF <= kMaxOverlapF) {
	      // Solve for iR of reverse path with (d - 1) changes in diagonal kF:
	      // kR = kF + baDeltaLength
	      // kR = (d - 1) - 2 * iR
	      const iR = (d - 1 - (kF + baDeltaLength)) / 2;

	      // If this forward path overlaps the reverse path in this diagonal,
	      // then this is the middle change of the index intervals.
	      if (iR <= iMaxR && aIndexesR[iR] - 1 <= aLast) {
	        // Unlike the Myers algorithm which finds only the middle “snake”
	        // this package can find two common subsequences per division.
	        // Last point of previous path segment is on an adjacent diagonal.
	        const bLastPrev = bF + aLastPrev - (insert ? kF + 1 : kF - 1);

	        // Because of invariant that intervals preceding the middle change
	        // cannot have common items at the end,
	        // move in reverse direction along a diagonal of common items.
	        const nCommonR = countCommonItemsR(
	          aStart,
	          aLastPrev,
	          bStart,
	          bLastPrev,
	          isCommon
	        );
	        const aIndexPrevFirst = aLastPrev - nCommonR;
	        const bIndexPrevFirst = bLastPrev - nCommonR;
	        const aEndPreceding = aIndexPrevFirst + 1;
	        const bEndPreceding = bIndexPrevFirst + 1;
	        division.nChangePreceding = d - 1;
	        if (d - 1 === aEndPreceding + bEndPreceding - aStart - bStart) {
	          // Optimization: number of preceding changes in forward direction
	          // is equal to number of items in preceding interval,
	          // therefore it cannot contain any common items.
	          division.aEndPreceding = aStart;
	          division.bEndPreceding = bStart;
	        } else {
	          division.aEndPreceding = aEndPreceding;
	          division.bEndPreceding = bEndPreceding;
	        }
	        division.nCommonPreceding = nCommonR;
	        if (nCommonR !== 0) {
	          division.aCommonPreceding = aEndPreceding;
	          division.bCommonPreceding = bEndPreceding;
	        }
	        division.nCommonFollowing = nCommonF;
	        if (nCommonF !== 0) {
	          division.aCommonFollowing = aFirst + 1;
	          division.bCommonFollowing = bFirst + 1;
	        }
	        const aStartFollowing = aLast + 1;
	        const bStartFollowing = bFirst + nCommonF + 1;
	        division.nChangeFollowing = d - 1;
	        if (d - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
	          // Optimization: number of changes in reverse direction
	          // is equal to number of items in following interval,
	          // therefore it cannot contain any common items.
	          division.aStartFollowing = aEnd;
	          division.bStartFollowing = bEnd;
	        } else {
	          division.aStartFollowing = aStartFollowing;
	          division.bStartFollowing = bStartFollowing;
	        }
	        return true;
	      }
	    }
	  }
	  return false;
	};

	// A complete function to extend reverse paths from (d - 1) to d changes.
	// Return true if a path overlaps forward path of d changes in its diagonal.
	const extendOverlappablePathsR = (
	  d,
	  aStart,
	  aEnd,
	  bStart,
	  bEnd,
	  isCommon,
	  aIndexesF,
	  iMaxF,
	  aIndexesR,
	  iMaxR,
	  division // update prop values if return true
	) => {
	  const bR = bEnd - aEnd; // bIndex = bR + aIndex - kR
	  const aLength = aEnd - aStart;
	  const bLength = bEnd - bStart;
	  const baDeltaLength = bLength - aLength; // kR = kF + baDeltaLength

	  // Range of diagonals in which forward and reverse paths might overlap.
	  const kMinOverlapR = baDeltaLength - d; // -d <= kF
	  const kMaxOverlapR = baDeltaLength + d; // kF <= d

	  let aIndexPrev1 = NOT_YET_SET; // prev value of [iR - 1] in next iteration

	  // Optimization: skip diagonals in which paths cannot ever overlap.
	  const nR = d < iMaxR ? d : iMaxR;

	  // The diagonals kR = d - 2 * iR are odd when d is odd and even when d is even.
	  for (let iR = 0, kR = d; iR <= nR; iR += 1, kR -= 2) {
	    // To get first point of path segment, move one change in reverse direction
	    // from last point of previous path segment in an adjacent diagonal.
	    // In first iteration when iR === 0 and kR === d always insert.
	    // In last possible iteration when iR === d and kR === -d always delete.
	    const insert = iR === 0 || (iR !== d && aIndexesR[iR] < aIndexPrev1);
	    const aLastPrev = insert ? aIndexesR[iR] : aIndexPrev1;
	    const aFirst = insert
	      ? aLastPrev // vertical to insert from b
	      : aLastPrev - 1; // horizontal to delete from a

	    // To get last point of path segment, move along diagonal of common items.
	    const bFirst = bR + aFirst - kR;
	    const nCommonR = countCommonItemsR(
	      aStart,
	      aFirst - 1,
	      bStart,
	      bFirst - 1,
	      isCommon
	    );
	    const aLast = aFirst - nCommonR;
	    aIndexPrev1 = aIndexesR[iR];
	    aIndexesR[iR] = aLast;
	    if (kMinOverlapR <= kR && kR <= kMaxOverlapR) {
	      // Solve for iF of forward path with d changes in diagonal kR:
	      // kF = kR - baDeltaLength
	      // kF = 2 * iF - d
	      const iF = (d + (kR - baDeltaLength)) / 2;

	      // If this reverse path overlaps the forward path in this diagonal,
	      // then this is a middle change of the index intervals.
	      if (iF <= iMaxF && aLast - 1 <= aIndexesF[iF]) {
	        const bLast = bFirst - nCommonR;
	        division.nChangePreceding = d;
	        if (d === aLast + bLast - aStart - bStart) {
	          // Optimization: number of changes in reverse direction
	          // is equal to number of items in preceding interval,
	          // therefore it cannot contain any common items.
	          division.aEndPreceding = aStart;
	          division.bEndPreceding = bStart;
	        } else {
	          division.aEndPreceding = aLast;
	          division.bEndPreceding = bLast;
	        }
	        division.nCommonPreceding = nCommonR;
	        if (nCommonR !== 0) {
	          // The last point of reverse path segment is start of common subsequence.
	          division.aCommonPreceding = aLast;
	          division.bCommonPreceding = bLast;
	        }
	        division.nChangeFollowing = d - 1;
	        if (d === 1) {
	          // There is no previous path segment.
	          division.nCommonFollowing = 0;
	          division.aStartFollowing = aEnd;
	          division.bStartFollowing = bEnd;
	        } else {
	          // Unlike the Myers algorithm which finds only the middle “snake”
	          // this package can find two common subsequences per division.
	          // Last point of previous path segment is on an adjacent diagonal.
	          const bLastPrev = bR + aLastPrev - (insert ? kR - 1 : kR + 1);

	          // Because of invariant that intervals following the middle change
	          // cannot have common items at the start,
	          // move in forward direction along a diagonal of common items.
	          const nCommonF = countCommonItemsF(
	            aLastPrev,
	            aEnd,
	            bLastPrev,
	            bEnd,
	            isCommon
	          );
	          division.nCommonFollowing = nCommonF;
	          if (nCommonF !== 0) {
	            // The last point of reverse path segment is start of common subsequence.
	            division.aCommonFollowing = aLastPrev;
	            division.bCommonFollowing = bLastPrev;
	          }
	          const aStartFollowing = aLastPrev + nCommonF; // aFirstPrev
	          const bStartFollowing = bLastPrev + nCommonF; // bFirstPrev

	          if (d - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
	            // Optimization: number of changes in forward direction
	            // is equal to number of items in following interval,
	            // therefore it cannot contain any common items.
	            division.aStartFollowing = aEnd;
	            division.bStartFollowing = bEnd;
	          } else {
	            division.aStartFollowing = aStartFollowing;
	            division.bStartFollowing = bStartFollowing;
	          }
	        }
	        return true;
	      }
	    }
	  }
	  return false;
	};

	// Given index intervals and input function to compare items at indexes,
	// divide at the middle change.
	//
	// DO NOT CALL if start === end, because interval cannot contain common items
	// and because this function will throw the “no overlap” error.
	const divide = (
	  nChange,
	  aStart,
	  aEnd,
	  bStart,
	  bEnd,
	  isCommon,
	  aIndexesF,
	  aIndexesR,
	  division // output
	) => {
	  const bF = bStart - aStart; // bIndex = bF + aIndex - kF
	  const bR = bEnd - aEnd; // bIndex = bR + aIndex - kR
	  const aLength = aEnd - aStart;
	  const bLength = bEnd - bStart;

	  // Because graph has square or portrait orientation,
	  // length difference is minimum number of items to insert from b.
	  // Corresponding forward and reverse diagonals in graph
	  // depend on length difference of the sequences:
	  // kF = kR - baDeltaLength
	  // kR = kF + baDeltaLength
	  const baDeltaLength = bLength - aLength;

	  // Optimization: max diagonal in graph intersects corner of shorter side.
	  let iMaxF = aLength;
	  let iMaxR = aLength;

	  // Initialize no changes yet in forward or reverse direction:
	  aIndexesF[0] = aStart - 1; // at open start of interval, outside closed start
	  aIndexesR[0] = aEnd; // at open end of interval

	  if (baDeltaLength % 2 === 0) {
	    // The number of changes in paths is 2 * d if length difference is even.
	    const dMin = (nChange || baDeltaLength) / 2;
	    const dMax = (aLength + bLength) / 2;
	    for (let d = 1; d <= dMax; d += 1) {
	      iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
	      if (d < dMin) {
	        iMaxR = extendPathsR(d, aStart, bStart, bR, isCommon, aIndexesR, iMaxR);
	      } else if (
	        // If a reverse path overlaps a forward path in the same diagonal,
	        // return a division of the index intervals at the middle change.
	        extendOverlappablePathsR(
	          d,
	          aStart,
	          aEnd,
	          bStart,
	          bEnd,
	          isCommon,
	          aIndexesF,
	          iMaxF,
	          aIndexesR,
	          iMaxR,
	          division
	        )
	      ) {
	        return;
	      }
	    }
	  } else {
	    // The number of changes in paths is 2 * d - 1 if length difference is odd.
	    const dMin = ((nChange || baDeltaLength) + 1) / 2;
	    const dMax = (aLength + bLength + 1) / 2;

	    // Unroll first half iteration so loop extends the relevant pairs of paths.
	    // Because of invariant that intervals have no common items at start or end,
	    // and limitation not to call divide with empty intervals,
	    // therefore it cannot be called if a forward path with one change
	    // would overlap a reverse path with no changes, even if dMin === 1.
	    let d = 1;
	    iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
	    for (d += 1; d <= dMax; d += 1) {
	      iMaxR = extendPathsR(
	        d - 1,
	        aStart,
	        bStart,
	        bR,
	        isCommon,
	        aIndexesR,
	        iMaxR
	      );
	      if (d < dMin) {
	        iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
	      } else if (
	        // If a forward path overlaps a reverse path in the same diagonal,
	        // return a division of the index intervals at the middle change.
	        extendOverlappablePathsF(
	          d,
	          aStart,
	          aEnd,
	          bStart,
	          bEnd,
	          isCommon,
	          aIndexesF,
	          iMaxF,
	          aIndexesR,
	          iMaxR,
	          division
	        )
	      ) {
	        return;
	      }
	    }
	  }

	  /* istanbul ignore next */
	  throw new Error(
	    `${pkg}: no overlap aStart=${aStart} aEnd=${aEnd} bStart=${bStart} bEnd=${bEnd}`
	  );
	};

	// Given index intervals and input function to compare items at indexes,
	// return by output function the number of adjacent items and starting indexes
	// of each common subsequence. Divide and conquer with only linear space.
	//
	// The index intervals are half open [start, end) like array slice method.
	// DO NOT CALL if start === end, because interval cannot contain common items
	// and because divide function will throw the “no overlap” error.
	const findSubsequences = (
	  nChange,
	  aStart,
	  aEnd,
	  bStart,
	  bEnd,
	  transposed,
	  callbacks,
	  aIndexesF,
	  aIndexesR,
	  division // temporary memory, not input nor output
	) => {
	  if (bEnd - bStart < aEnd - aStart) {
	    // Transpose graph so it has portrait instead of landscape orientation.
	    // Always compare shorter to longer sequence for consistency and optimization.
	    transposed = !transposed;
	    if (transposed && callbacks.length === 1) {
	      // Lazily wrap callback functions to swap args if graph is transposed.
	      const {foundSubsequence, isCommon} = callbacks[0];
	      callbacks[1] = {
	        foundSubsequence: (nCommon, bCommon, aCommon) => {
	          foundSubsequence(nCommon, aCommon, bCommon);
	        },
	        isCommon: (bIndex, aIndex) => isCommon(aIndex, bIndex)
	      };
	    }
	    const tStart = aStart;
	    const tEnd = aEnd;
	    aStart = bStart;
	    aEnd = bEnd;
	    bStart = tStart;
	    bEnd = tEnd;
	  }
	  const {foundSubsequence, isCommon} = callbacks[transposed ? 1 : 0];

	  // Divide the index intervals at the middle change.
	  divide(
	    nChange,
	    aStart,
	    aEnd,
	    bStart,
	    bEnd,
	    isCommon,
	    aIndexesF,
	    aIndexesR,
	    division
	  );
	  const {
	    nChangePreceding,
	    aEndPreceding,
	    bEndPreceding,
	    nCommonPreceding,
	    aCommonPreceding,
	    bCommonPreceding,
	    nCommonFollowing,
	    aCommonFollowing,
	    bCommonFollowing,
	    nChangeFollowing,
	    aStartFollowing,
	    bStartFollowing
	  } = division;

	  // Unless either index interval is empty, they might contain common items.
	  if (aStart < aEndPreceding && bStart < bEndPreceding) {
	    // Recursely find and return common subsequences preceding the division.
	    findSubsequences(
	      nChangePreceding,
	      aStart,
	      aEndPreceding,
	      bStart,
	      bEndPreceding,
	      transposed,
	      callbacks,
	      aIndexesF,
	      aIndexesR,
	      division
	    );
	  }

	  // Return common subsequences that are adjacent to the middle change.
	  if (nCommonPreceding !== 0) {
	    foundSubsequence(nCommonPreceding, aCommonPreceding, bCommonPreceding);
	  }
	  if (nCommonFollowing !== 0) {
	    foundSubsequence(nCommonFollowing, aCommonFollowing, bCommonFollowing);
	  }

	  // Unless either index interval is empty, they might contain common items.
	  if (aStartFollowing < aEnd && bStartFollowing < bEnd) {
	    // Recursely find and return common subsequences following the division.
	    findSubsequences(
	      nChangeFollowing,
	      aStartFollowing,
	      aEnd,
	      bStartFollowing,
	      bEnd,
	      transposed,
	      callbacks,
	      aIndexesF,
	      aIndexesR,
	      division
	    );
	  }
	};
	const validateLength = (name, arg) => {
	  if (typeof arg !== 'number') {
	    throw new TypeError(`${pkg}: ${name} typeof ${typeof arg} is not a number`);
	  }
	  if (!Number.isSafeInteger(arg)) {
	    throw new RangeError(`${pkg}: ${name} value ${arg} is not a safe integer`);
	  }
	  if (arg < 0) {
	    throw new RangeError(`${pkg}: ${name} value ${arg} is a negative integer`);
	  }
	};
	const validateCallback = (name, arg) => {
	  const type = typeof arg;
	  if (type !== 'function') {
	    throw new TypeError(`${pkg}: ${name} typeof ${type} is not a function`);
	  }
	};

	// Compare items in two sequences to find a longest common subsequence.
	// Given lengths of sequences and input function to compare items at indexes,
	// return by output function the number of adjacent items and starting indexes
	// of each common subsequence.
	function diffSequence(aLength, bLength, isCommon, foundSubsequence) {
	  validateLength('aLength', aLength);
	  validateLength('bLength', bLength);
	  validateCallback('isCommon', isCommon);
	  validateCallback('foundSubsequence', foundSubsequence);

	  // Count common items from the start in the forward direction.
	  const nCommonF = countCommonItemsF(0, aLength, 0, bLength, isCommon);
	  if (nCommonF !== 0) {
	    foundSubsequence(nCommonF, 0, 0);
	  }

	  // Unless both sequences consist of common items only,
	  // find common items in the half-trimmed index intervals.
	  if (aLength !== nCommonF || bLength !== nCommonF) {
	    // Invariant: intervals do not have common items at the start.
	    // The start of an index interval is closed like array slice method.
	    const aStart = nCommonF;
	    const bStart = nCommonF;

	    // Count common items from the end in the reverse direction.
	    const nCommonR = countCommonItemsR(
	      aStart,
	      aLength - 1,
	      bStart,
	      bLength - 1,
	      isCommon
	    );

	    // Invariant: intervals do not have common items at the end.
	    // The end of an index interval is open like array slice method.
	    const aEnd = aLength - nCommonR;
	    const bEnd = bLength - nCommonR;

	    // Unless one sequence consists of common items only,
	    // therefore the other trimmed index interval consists of changes only,
	    // find common items in the trimmed index intervals.
	    const nCommonFR = nCommonF + nCommonR;
	    if (aLength !== nCommonFR && bLength !== nCommonFR) {
	      const nChange = 0; // number of change items is not yet known
	      const transposed = false; // call the original unwrapped functions
	      const callbacks = [
	        {
	          foundSubsequence,
	          isCommon
	        }
	      ];

	      // Indexes in sequence a of last points in furthest reaching paths
	      // from outside the start at top left in the forward direction:
	      const aIndexesF = [NOT_YET_SET];
	      // from the end at bottom right in the reverse direction:
	      const aIndexesR = [NOT_YET_SET];

	      // Initialize one object as output of all calls to divide function.
	      const division = {
	        aCommonFollowing: NOT_YET_SET,
	        aCommonPreceding: NOT_YET_SET,
	        aEndPreceding: NOT_YET_SET,
	        aStartFollowing: NOT_YET_SET,
	        bCommonFollowing: NOT_YET_SET,
	        bCommonPreceding: NOT_YET_SET,
	        bEndPreceding: NOT_YET_SET,
	        bStartFollowing: NOT_YET_SET,
	        nChangeFollowing: NOT_YET_SET,
	        nChangePreceding: NOT_YET_SET,
	        nCommonFollowing: NOT_YET_SET,
	        nCommonPreceding: NOT_YET_SET
	      };

	      // Find and return common subsequences in the trimmed index intervals.
	      findSubsequences(
	        nChange,
	        aStart,
	        aEnd,
	        bStart,
	        bEnd,
	        transposed,
	        callbacks,
	        aIndexesF,
	        aIndexesR,
	        division
	      );
	    }
	    if (nCommonR !== 0) {
	      foundSubsequence(nCommonR, aEnd, bEnd);
	    }
	  }
	}
	return build;
}

var buildExports = requireBuild();
var diffSequences = /*@__PURE__*/getDefaultExportFromCjs(buildExports);

const IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
const IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
function isImmutable(v) {
	return v && (v[IS_COLLECTION_SYMBOL] || v[IS_RECORD_SYMBOL]);
}
const OBJECT_PROTO = Object.getPrototypeOf({});
function getUnserializableMessage(err) {
	if (err instanceof Error) return `<unserializable>: ${err.message}`;
	if (typeof err === "string") return `<unserializable>: ${err}`;
	return "<unserializable>";
}
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
function serializeValue(val, seen = /* @__PURE__ */ new WeakMap()) {
	if (!val || typeof val === "string") return val;
	if (val instanceof Error && "toJSON" in val && typeof val.toJSON === "function") {
		const jsonValue = val.toJSON();
		if (jsonValue && jsonValue !== val && typeof jsonValue === "object") {
			if (typeof val.message === "string") safe(() => jsonValue.message ??= normalizeErrorMessage(val.message));
			if (typeof val.stack === "string") safe(() => jsonValue.stack ??= val.stack);
			if (typeof val.name === "string") safe(() => jsonValue.name ??= val.name);
			if (val.cause != null) safe(() => jsonValue.cause ??= serializeValue(val.cause, seen));
		}
		return serializeValue(jsonValue, seen);
	}
	if (typeof val === "function") return `Function<${val.name || "anonymous"}>`;
	if (typeof val === "symbol") return val.toString();
	if (typeof val !== "object") return val;
	if (typeof Buffer !== "undefined" && val instanceof Buffer) return `<Buffer(${val.length}) ...>`;
	if (typeof Uint8Array !== "undefined" && val instanceof Uint8Array) return `<Uint8Array(${val.length}) ...>`;
	// cannot serialize immutables as immutables
	if (isImmutable(val)) return serializeValue(val.toJSON(), seen);
	if (val instanceof Promise || val.constructor && val.constructor.prototype === "AsyncFunction") return "Promise";
	if (typeof Element !== "undefined" && val instanceof Element) return val.tagName;
	if (typeof val.toJSON === "function") return serializeValue(val.toJSON(), seen);
	if (seen.has(val)) return seen.get(val);
	if (Array.isArray(val)) {
		// oxlint-disable-next-line unicorn/no-new-array -- we need to keep sparse arrays ([1,,3])
		const clone = new Array(val.length);
		seen.set(val, clone);
		val.forEach((e, i) => {
			try {
				clone[i] = serializeValue(e, seen);
			} catch (err) {
				clone[i] = getUnserializableMessage(err);
			}
		});
		return clone;
	} else {
		// Objects with `Error` constructors appear to cause problems during worker communication
		// using `MessagePort`, so the serialized error object is being recreated as plain object.
		const clone = Object.create(null);
		seen.set(val, clone);
		let obj = val;
		while (obj && obj !== OBJECT_PROTO) {
			Object.getOwnPropertyNames(obj).forEach((key) => {
				if (key in clone) return;
				try {
					clone[key] = serializeValue(val[key], seen);
				} catch (err) {
					// delete in case it has a setter from prototype that might throw
					delete clone[key];
					clone[key] = getUnserializableMessage(err);
				}
			});
			obj = Object.getPrototypeOf(obj);
		}
		if (val instanceof Error) safe(() => clone.message = normalizeErrorMessage(val.message));
		return clone;
	}
}
function safe(fn) {
	try {
		return fn();
	} catch {}
}
function normalizeErrorMessage(message) {
	return message.replace(/\(0\s?,\s?__vite_ssr_import_\d+__.(\w+)\)/g, "$1").replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "").replace(/getByTestId('__vitest_\d+__')/g, "page");
}

const SAFE_TIMERS_SYMBOL = Symbol("vitest:SAFE_TIMERS");
function getSafeTimers() {
	const { setTimeout: safeSetTimeout, setInterval: safeSetInterval, clearInterval: safeClearInterval, clearTimeout: safeClearTimeout, setImmediate: safeSetImmediate, clearImmediate: safeClearImmediate, queueMicrotask: safeQueueMicrotask } = globalThis[SAFE_TIMERS_SYMBOL] || globalThis;
	const { nextTick: safeNextTick } = globalThis[SAFE_TIMERS_SYMBOL] || globalThis.process || {};
	return {
		nextTick: safeNextTick,
		setTimeout: safeSetTimeout,
		setInterval: safeSetInterval,
		clearInterval: safeClearInterval,
		clearTimeout: safeClearTimeout,
		setImmediate: safeSetImmediate,
		clearImmediate: safeClearImmediate,
		queueMicrotask: safeQueueMicrotask
	};
}
function setSafeTimers() {
	const { setTimeout: safeSetTimeout, setInterval: safeSetInterval, clearInterval: safeClearInterval, clearTimeout: safeClearTimeout, setImmediate: safeSetImmediate, clearImmediate: safeClearImmediate, queueMicrotask: safeQueueMicrotask } = globalThis;
	const { nextTick: safeNextTick } = globalThis.process || {};
	globalThis[SAFE_TIMERS_SYMBOL] = {
		nextTick: safeNextTick,
		setTimeout: safeSetTimeout,
		setInterval: safeSetInterval,
		clearInterval: safeClearInterval,
		clearTimeout: safeClearTimeout,
		setImmediate: safeSetImmediate,
		clearImmediate: safeClearImmediate,
		queueMicrotask: safeQueueMicrotask
	};
}
/**
* Returns a promise that resolves after the specified duration.
*
* @param timeout - Delay in milliseconds
* @param scheduler - Timer function to use, defaults to `setTimeout`. Useful for mocked timers.
*
* @example
* await delay(100)
*
* @example
* // With mocked timers
* const { setTimeout } = getSafeTimers()
* await delay(100, setTimeout)
*/
function delay(timeout, scheduler = setTimeout) {
	return new Promise((resolve) => scheduler(resolve, timeout));
}

// src/vlq.ts
var comma = ",".charCodeAt(0);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
  const c = chars.charCodeAt(i);
  intToChar[i] = c;
  charToInt[c] = i;
}
function decodeInteger(reader) {
  let value = 0;
  let shift = 0;
  let integer = 0;
  do {
    const c = reader.next();
    integer = charToInt[c];
    value |= (integer & 31) << shift;
    shift += 5;
  } while (integer & 32);
  return value;
}
function decodeSign(num) {
  return num & 1 ? -2147483648 | -(num >>> 1) : num >>> 1;
}
function hasMoreVlq(reader, max) {
  if (reader.pos >= max) return false;
  return reader.peek() !== comma;
}
var StringReader = class {
  constructor(buffer) {
    this.pos = 0;
    this.buffer = buffer;
  }
  next() {
    return this.buffer.charCodeAt(this.pos++);
  }
  peek() {
    return this.buffer.charCodeAt(this.pos);
  }
  indexOf(char) {
    const { buffer, pos } = this;
    const idx = buffer.indexOf(char, pos);
    return idx === -1 ? buffer.length : idx;
  }
};

// src/sourcemap-codec.ts
function decode(mappings) {
  const { length } = mappings;
  const reader = new StringReader(mappings);
  const decoded = [];
  let genColumn = 0;
  let sourcesIndex = 0;
  let sourceLine = 0;
  let sourceColumn = 0;
  let namesIndex = 0;
  do {
    const semi = reader.indexOf(";");
    const line = [];
    let sorted = true;
    let lastCol = 0;
    genColumn = 0;
    while (reader.pos < semi) {
      let seg;
      genColumn += decodeSign(decodeInteger(reader));
      if (genColumn < lastCol) sorted = false;
      lastCol = genColumn;
      if (hasMoreVlq(reader, semi)) {
        sourcesIndex += decodeSign(decodeInteger(reader));
        sourceLine += decodeSign(decodeInteger(reader));
        sourceColumn += decodeSign(decodeInteger(reader));
        if (hasMoreVlq(reader, semi)) {
          namesIndex += decodeSign(decodeInteger(reader));
          seg = [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex];
        } else {
          seg = [genColumn, sourcesIndex, sourceLine, sourceColumn];
        }
      } else {
        seg = [genColumn];
      }
      line.push(seg);
      reader.pos++;
    }
    if (!sorted) sort(line);
    decoded.push(line);
    reader.pos = semi + 1;
  } while (reader.pos <= length);
  return decoded;
}
function sort(line) {
  line.sort(sortComparator$1);
}
function sortComparator$1(a, b) {
  return a[0] - b[0];
}

// Matches the scheme of a URL, eg "http://"
const schemeRegex = /^[\w+.-]+:\/\//;
/**
 * Matches the parts of a URL:
 * 1. Scheme, including ":", guaranteed.
 * 2. User/password, including "@", optional.
 * 3. Host, guaranteed.
 * 4. Port, including ":", optional.
 * 5. Path, including "/", optional.
 * 6. Query, including "?", optional.
 * 7. Hash, including "#", optional.
 */
const urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
/**
 * File URLs are weird. They dont' need the regular `//` in the scheme, they may or may not start
 * with a leading `/`, they can have a domain (but only if they don't start with a Windows drive).
 *
 * 1. Host, optional.
 * 2. Path, which may include "/", guaranteed.
 * 3. Query, including "?", optional.
 * 4. Hash, including "#", optional.
 */
const fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
function isAbsoluteUrl(input) {
    return schemeRegex.test(input);
}
function isSchemeRelativeUrl(input) {
    return input.startsWith('//');
}
function isAbsolutePath(input) {
    return input.startsWith('/');
}
function isFileUrl(input) {
    return input.startsWith('file:');
}
function isRelative(input) {
    return /^[.?#]/.test(input);
}
function parseAbsoluteUrl(input) {
    const match = urlRegex.exec(input);
    return makeUrl(match[1], match[2] || '', match[3], match[4] || '', match[5] || '/', match[6] || '', match[7] || '');
}
function parseFileUrl(input) {
    const match = fileRegex.exec(input);
    const path = match[2];
    return makeUrl('file:', '', match[1] || '', '', isAbsolutePath(path) ? path : '/' + path, match[3] || '', match[4] || '');
}
function makeUrl(scheme, user, host, port, path, query, hash) {
    return {
        scheme,
        user,
        host,
        port,
        path,
        query,
        hash,
        type: 7 /* Absolute */,
    };
}
function parseUrl(input) {
    if (isSchemeRelativeUrl(input)) {
        const url = parseAbsoluteUrl('http:' + input);
        url.scheme = '';
        url.type = 6 /* SchemeRelative */;
        return url;
    }
    if (isAbsolutePath(input)) {
        const url = parseAbsoluteUrl('http://foo.com' + input);
        url.scheme = '';
        url.host = '';
        url.type = 5 /* AbsolutePath */;
        return url;
    }
    if (isFileUrl(input))
        return parseFileUrl(input);
    if (isAbsoluteUrl(input))
        return parseAbsoluteUrl(input);
    const url = parseAbsoluteUrl('http://foo.com/' + input);
    url.scheme = '';
    url.host = '';
    url.type = input
        ? input.startsWith('?')
            ? 3 /* Query */
            : input.startsWith('#')
                ? 2 /* Hash */
                : 4 /* RelativePath */
        : 1 /* Empty */;
    return url;
}
function stripPathFilename(path) {
    // If a path ends with a parent directory "..", then it's a relative path with excess parent
    // paths. It's not a file, so we can't strip it.
    if (path.endsWith('/..'))
        return path;
    const index = path.lastIndexOf('/');
    return path.slice(0, index + 1);
}
function mergePaths(url, base) {
    normalizePath(base, base.type);
    // If the path is just a "/", then it was an empty path to begin with (remember, we're a relative
    // path).
    if (url.path === '/') {
        url.path = base.path;
    }
    else {
        // Resolution happens relative to the base path's directory, not the file.
        url.path = stripPathFilename(base.path) + url.path;
    }
}
/**
 * The path can have empty directories "//", unneeded parents "foo/..", or current directory
 * "foo/.". We need to normalize to a standard representation.
 */
function normalizePath(url, type) {
    const rel = type <= 4 /* RelativePath */;
    const pieces = url.path.split('/');
    // We need to preserve the first piece always, so that we output a leading slash. The item at
    // pieces[0] is an empty string.
    let pointer = 1;
    // Positive is the number of real directories we've output, used for popping a parent directory.
    // Eg, "foo/bar/.." will have a positive 2, and we can decrement to be left with just "foo".
    let positive = 0;
    // We need to keep a trailing slash if we encounter an empty directory (eg, splitting "foo/" will
    // generate `["foo", ""]` pieces). And, if we pop a parent directory. But once we encounter a
    // real directory, we won't need to append, unless the other conditions happen again.
    let addTrailingSlash = false;
    for (let i = 1; i < pieces.length; i++) {
        const piece = pieces[i];
        // An empty directory, could be a trailing slash, or just a double "//" in the path.
        if (!piece) {
            addTrailingSlash = true;
            continue;
        }
        // If we encounter a real directory, then we don't need to append anymore.
        addTrailingSlash = false;
        // A current directory, which we can always drop.
        if (piece === '.')
            continue;
        // A parent directory, we need to see if there are any real directories we can pop. Else, we
        // have an excess of parents, and we'll need to keep the "..".
        if (piece === '..') {
            if (positive) {
                addTrailingSlash = true;
                positive--;
                pointer--;
            }
            else if (rel) {
                // If we're in a relativePath, then we need to keep the excess parents. Else, in an absolute
                // URL, protocol relative URL, or an absolute path, we don't need to keep excess.
                pieces[pointer++] = piece;
            }
            continue;
        }
        // We've encountered a real directory. Move it to the next insertion pointer, which accounts for
        // any popped or dropped directories.
        pieces[pointer++] = piece;
        positive++;
    }
    let path = '';
    for (let i = 1; i < pointer; i++) {
        path += '/' + pieces[i];
    }
    if (!path || (addTrailingSlash && !path.endsWith('/..'))) {
        path += '/';
    }
    url.path = path;
}
/**
 * Attempts to resolve `input` URL/path relative to `base`.
 */
function resolve(input, base) {
    if (!input && !base)
        return '';
    const url = parseUrl(input);
    let inputType = url.type;
    if (base && inputType !== 7 /* Absolute */) {
        const baseUrl = parseUrl(base);
        const baseType = baseUrl.type;
        switch (inputType) {
            case 1 /* Empty */:
                url.hash = baseUrl.hash;
            // fall through
            case 2 /* Hash */:
                url.query = baseUrl.query;
            // fall through
            case 3 /* Query */:
            case 4 /* RelativePath */:
                mergePaths(url, baseUrl);
            // fall through
            case 5 /* AbsolutePath */:
                // The host, user, and port are joined, you can't copy one without the others.
                url.user = baseUrl.user;
                url.host = baseUrl.host;
                url.port = baseUrl.port;
            // fall through
            case 6 /* SchemeRelative */:
                // The input doesn't have a schema at least, so we need to copy at least that over.
                url.scheme = baseUrl.scheme;
        }
        if (baseType > inputType)
            inputType = baseType;
    }
    normalizePath(url, inputType);
    const queryHash = url.query + url.hash;
    switch (inputType) {
        // This is impossible, because of the empty checks at the start of the function.
        // case UrlType.Empty:
        case 2 /* Hash */:
        case 3 /* Query */:
            return queryHash;
        case 4 /* RelativePath */: {
            // The first char is always a "/", and we need it to be relative.
            const path = url.path.slice(1);
            if (!path)
                return queryHash || '.';
            if (isRelative(base || input) && !isRelative(path)) {
                // If base started with a leading ".", or there is no base and input started with a ".",
                // then we need to ensure that the relative path starts with a ".". We don't know if
                // relative starts with a "..", though, so check before prepending.
                return './' + path + queryHash;
            }
            return path + queryHash;
        }
        case 5 /* AbsolutePath */:
            return url.path + queryHash;
        default:
            return url.scheme + '//' + url.user + url.host + url.port + url.path + queryHash;
    }
}

// src/trace-mapping.ts

// src/strip-filename.ts
function stripFilename(path) {
  if (!path) return "";
  const index = path.lastIndexOf("/");
  return path.slice(0, index + 1);
}

// src/resolve.ts
function resolver(mapUrl, sourceRoot) {
  const from = stripFilename(mapUrl);
  const prefix = sourceRoot ? sourceRoot + "/" : "";
  return (source) => resolve(prefix + (source || ""), from);
}

// src/sourcemap-segment.ts
var COLUMN = 0;
var SOURCES_INDEX = 1;
var SOURCE_LINE = 2;
var SOURCE_COLUMN = 3;
var NAMES_INDEX = 4;
var REV_GENERATED_LINE = 1;
var REV_GENERATED_COLUMN = 2;

// src/sort.ts
function maybeSort(mappings, owned) {
  const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
  if (unsortedIndex === mappings.length) return mappings;
  if (!owned) mappings = mappings.slice();
  for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) {
    mappings[i] = sortSegments(mappings[i], owned);
  }
  return mappings;
}
function nextUnsortedSegmentLine(mappings, start) {
  for (let i = start; i < mappings.length; i++) {
    if (!isSorted(mappings[i])) return i;
  }
  return mappings.length;
}
function isSorted(line) {
  for (let j = 1; j < line.length; j++) {
    if (line[j][COLUMN] < line[j - 1][COLUMN]) {
      return false;
    }
  }
  return true;
}
function sortSegments(line, owned) {
  if (!owned) line = line.slice();
  return line.sort(sortComparator);
}
function sortComparator(a, b) {
  return a[COLUMN] - b[COLUMN];
}

// src/by-source.ts
function buildBySources(decoded, memos) {
  const sources = memos.map(() => []);
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    for (let j = 0; j < line.length; j++) {
      const seg = line[j];
      if (seg.length === 1) continue;
      const sourceIndex2 = seg[SOURCES_INDEX];
      const sourceLine = seg[SOURCE_LINE];
      const sourceColumn = seg[SOURCE_COLUMN];
      const source = sources[sourceIndex2];
      const segs = source[sourceLine] || (source[sourceLine] = []);
      segs.push([sourceColumn, i, seg[COLUMN]]);
    }
  }
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    for (let j = 0; j < source.length; j++) {
      const line = source[j];
      if (line) line.sort(sortComparator);
    }
  }
  return sources;
}

// src/binary-search.ts
var found = false;
function binarySearch(haystack, needle, low, high) {
  while (low <= high) {
    const mid = low + (high - low >> 1);
    const cmp = haystack[mid][COLUMN] - needle;
    if (cmp === 0) {
      found = true;
      return mid;
    }
    if (cmp < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  found = false;
  return low - 1;
}
function upperBound(haystack, needle, index) {
  for (let i = index + 1; i < haystack.length; index = i++) {
    if (haystack[i][COLUMN] !== needle) break;
  }
  return index;
}
function lowerBound(haystack, needle, index) {
  for (let i = index - 1; i >= 0; index = i--) {
    if (haystack[i][COLUMN] !== needle) break;
  }
  return index;
}
function memoizedState$1() {
  return {
    lastKey: -1,
    lastNeedle: -1,
    lastIndex: -1
  };
}
function memoizedBinarySearch(haystack, needle, state, key) {
  const { lastKey, lastNeedle, lastIndex } = state;
  let low = 0;
  let high = haystack.length - 1;
  if (key === lastKey) {
    if (needle === lastNeedle) {
      found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle;
      return lastIndex;
    }
    if (needle >= lastNeedle) {
      low = lastIndex === -1 ? 0 : lastIndex;
    } else {
      high = lastIndex;
    }
  }
  state.lastKey = key;
  state.lastNeedle = needle;
  return state.lastIndex = binarySearch(haystack, needle, low, high);
}

// src/types.ts
function parse(map) {
  return typeof map === "string" ? JSON.parse(map) : map;
}

// src/trace-mapping.ts
var LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
var COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
var LEAST_UPPER_BOUND = -1;
var GREATEST_LOWER_BOUND = 1;
var TraceMap = class {
  constructor(map, mapUrl) {
    const isString = typeof map === "string";
    if (!isString && map._decodedMemo) return map;
    const parsed = parse(map);
    const { version, file, names, sourceRoot, sources, sourcesContent } = parsed;
    this.version = version;
    this.file = file;
    this.names = names || [];
    this.sourceRoot = sourceRoot;
    this.sources = sources;
    this.sourcesContent = sourcesContent;
    this.ignoreList = parsed.ignoreList || parsed.x_google_ignoreList || void 0;
    const resolve = resolver(mapUrl, sourceRoot);
    this.resolvedSources = sources.map(resolve);
    const { mappings } = parsed;
    if (typeof mappings === "string") {
      this._encoded = mappings;
      this._decoded = void 0;
    } else if (Array.isArray(mappings)) {
      this._encoded = void 0;
      this._decoded = maybeSort(mappings, isString);
    } else if (parsed.sections) {
      throw new Error(`TraceMap passed sectioned source map, please use FlattenMap export instead`);
    } else {
      throw new Error(`invalid source map: ${JSON.stringify(parsed)}`);
    }
    this._decodedMemo = memoizedState$1();
    this._bySources = void 0;
    this._bySourceMemos = void 0;
  }
};
function cast(map) {
  return map;
}
function decodedMappings(map) {
  var _a;
  return (_a = cast(map))._decoded || (_a._decoded = decode(cast(map)._encoded));
}
function originalPositionFor(map, needle) {
  let { line, column, bias } = needle;
  line--;
  if (line < 0) throw new Error(LINE_GTR_ZERO);
  if (column < 0) throw new Error(COL_GTR_EQ_ZERO);
  const decoded = decodedMappings(map);
  if (line >= decoded.length) return OMapping(null, null, null, null);
  const segments = decoded[line];
  const index = traceSegmentInternal(
    segments,
    cast(map)._decodedMemo,
    line,
    column,
    bias || GREATEST_LOWER_BOUND
  );
  if (index === -1) return OMapping(null, null, null, null);
  const segment = segments[index];
  if (segment.length === 1) return OMapping(null, null, null, null);
  const { names, resolvedSources } = map;
  return OMapping(
    resolvedSources[segment[SOURCES_INDEX]],
    segment[SOURCE_LINE] + 1,
    segment[SOURCE_COLUMN],
    segment.length === 5 ? names[segment[NAMES_INDEX]] : null
  );
}
function generatedPositionFor(map, needle) {
  const { source, line, column, bias } = needle;
  return generatedPosition(map, source, line, column, bias || GREATEST_LOWER_BOUND, false);
}
function eachMapping(map, cb) {
  const decoded = decodedMappings(map);
  const { names, resolvedSources } = map;
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    for (let j = 0; j < line.length; j++) {
      const seg = line[j];
      const generatedLine = i + 1;
      const generatedColumn = seg[0];
      let source = null;
      let originalLine = null;
      let originalColumn = null;
      let name = null;
      if (seg.length !== 1) {
        source = resolvedSources[seg[1]];
        originalLine = seg[2] + 1;
        originalColumn = seg[3];
      }
      if (seg.length === 5) name = names[seg[4]];
      cb({
        generatedLine,
        generatedColumn,
        source,
        originalLine,
        originalColumn,
        name
      });
    }
  }
}
function OMapping(source, line, column, name) {
  return { source, line, column, name };
}
function GMapping(line, column) {
  return { line, column };
}
function traceSegmentInternal(segments, memo, line, column, bias) {
  let index = memoizedBinarySearch(segments, column, memo, line);
  if (found) {
    index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
  } else if (bias === LEAST_UPPER_BOUND) index++;
  if (index === -1 || index === segments.length) return -1;
  return index;
}
function generatedPosition(map, source, line, column, bias, all) {
  var _a, _b;
  line--;
  if (line < 0) throw new Error(LINE_GTR_ZERO);
  if (column < 0) throw new Error(COL_GTR_EQ_ZERO);
  const { sources, resolvedSources } = map;
  let sourceIndex2 = sources.indexOf(source);
  if (sourceIndex2 === -1) sourceIndex2 = resolvedSources.indexOf(source);
  if (sourceIndex2 === -1) return all ? [] : GMapping(null, null);
  const bySourceMemos = (_a = cast(map))._bySourceMemos || (_a._bySourceMemos = sources.map(memoizedState$1));
  const generated = (_b = cast(map))._bySources || (_b._bySources = buildBySources(decodedMappings(map), bySourceMemos));
  const segments = generated[sourceIndex2][line];
  if (segments == null) return all ? [] : GMapping(null, null);
  const memo = bySourceMemos[sourceIndex2];
  const index = traceSegmentInternal(segments, memo, line, column, bias);
  if (index === -1) return GMapping(null, null);
  const segment = segments[index];
  return GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]);
}

const CHROME_IE_STACK_REGEXP = /^\s*at .*(?:\S:\d+|\(native\))/m;
const SAFARI_NATIVE_CODE_REGEXP = /^(?:eval@)?(?:\[native code\])?$/;
const stackIgnorePatterns = [
	"node:internal",
	/\/packages\/\w+\/dist\//,
	/\/@vitest\/\w+\/dist\//,
	"/vitest/dist/",
	"/vitest/src/",
	"/packages/expect/src/",
	"/packages/snapshot/src/",
	"/node_modules/chai/",
	"/node_modules/tinyspy/",
	"/vite/dist/node/module-runner",
	"/rolldown-vite/dist/node/module-runner",
	"/deps/chunk-",
	"/deps/@vitest",
	"/deps/loupe",
	"/deps/chai",
	"/browser-playwright/dist/locators.js",
	"/browser-webdriverio/dist/locators.js",
	"/browser-preview/dist/locators.js",
	/node:\w+/,
	/__vitest_test__/,
	/__vitest_browser__/,
	"/@id/__x00__vitest/browser",
	/\/deps\/vitest_/,
	"/deps/vitest.js"
];
const NOW_LENGTH = Date.now().toString().length;
const REGEXP_VITEST = new RegExp(`vitest=\\d{${NOW_LENGTH}}`);
function extractLocation(urlLike) {
	// Fail-fast but return locations like "(native)"
	if (!urlLike.includes(":")) return [urlLike];
	const parts = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(urlLike.replace(/^\(|\)$/g, ""));
	if (!parts) return [urlLike];
	let url = parts[1];
	if (url.startsWith("async ")) url = url.slice(6);
	if (url.startsWith("http:") || url.startsWith("https:")) {
		const urlObj = new URL(url);
		urlObj.searchParams.delete("import");
		urlObj.searchParams.delete("browserv");
		url = tryDecode(urlObj.pathname, decodeURI) + urlObj.hash + urlObj.search;
	}
	if (url.startsWith("/@fs/")) {
		const isWindows = /^\/@fs\/[a-zA-Z]:\//.test(url);
		url = url.slice(isWindows ? 5 : 4);
	}
	if (url.includes("vitest=")) url = url.replace(REGEXP_VITEST, "").replace(/[?&]$/, "");
	return [
		url,
		parts[2] || void 0,
		parts[3] || void 0
	];
}
function tryDecode(value, decode) {
	try {
		return decode(value);
	} catch {
		return value;
	}
}
function parseSingleFFOrSafariStack(raw) {
	let line = raw.trim();
	if (SAFARI_NATIVE_CODE_REGEXP.test(line)) return null;
	if (line.includes(" > eval")) line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
	// Early return for lines that don't look like Firefox/Safari stack traces
	// Firefox/Safari stack traces must contain '@' and should have location info after it
	if (!line.includes("@")) return null;
	// Find the correct @ that separates function name from location
	// For cases like '@https://@fs/path' or 'functionName@https://@fs/path'
	// we need to find the first @ that precedes a valid location (containing :)
	let atIndex = -1;
	let locationPart = "";
	let functionName;
	// Try each @ from left to right to find the one that gives us a valid location
	for (let i = 0; i < line.length; i++) if (line[i] === "@") {
		const candidateLocation = line.slice(i + 1);
		// Minimum length 3 for valid location: 1 for filename + 1 for colon + 1 for line number (e.g., "a:1")
		if (candidateLocation.includes(":") && candidateLocation.length >= 3) {
			atIndex = i;
			locationPart = candidateLocation;
			functionName = i > 0 ? line.slice(0, i) : void 0;
			break;
		}
	}
	// Validate we found a valid location with minimum length (filename:line format)
	if (atIndex === -1 || !locationPart.includes(":") || locationPart.length < 3) return null;
	const [url, lineNumber, columnNumber] = extractLocation(locationPart);
	if (!url || !lineNumber || !columnNumber) return null;
	return {
		file: url,
		method: functionName || "",
		line: Number.parseInt(lineNumber),
		column: Number.parseInt(columnNumber)
	};
}
function parseSingleStack(raw) {
	const line = raw.trim();
	if (!CHROME_IE_STACK_REGEXP.test(line)) return parseSingleFFOrSafariStack(line);
	return parseSingleV8Stack(line);
}
// Based on https://github.com/stacktracejs/error-stack-parser
// Credit to stacktracejs
function parseSingleV8Stack(raw) {
	let line = raw.trim();
	if (!CHROME_IE_STACK_REGEXP.test(line)) return null;
	if (line.includes("(eval ")) line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, "");
	let sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
	// capture and preserve the parenthesized location "(/foo/my bar.js:12:87)" in
	// case it has spaces in it, as the string is split on \s+ later on
	const location = sanitizedLine.match(/ (\(.+\)$)/);
	// remove the parenthesized location from the line, if it was matched
	sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
	// if a location was matched, pass it to extractLocation() otherwise pass all sanitizedLine
	// because this line doesn't have function name
	const [url, lineNumber, columnNumber] = extractLocation(location ? location[1] : sanitizedLine);
	let method = location && sanitizedLine || "";
	let file = url && ["eval", "<anonymous>"].includes(url) ? void 0 : url;
	if (!file || !lineNumber || !columnNumber) return null;
	if (method.startsWith("async ")) method = method.slice(6);
	if (file.startsWith("file://"))
 // pathToFileURL also encodes "#" and "?", which decodeURI keeps
	file = tryDecode(file.slice(7), decodeURIComponent);
	// normalize Windows path (\ -> /)
	file = file.startsWith("node:") || file.startsWith("internal:") ? file : resolve$1(file);
	if (method) method = method.replace(/\(0\s?,\s?__vite_ssr_import_\d+__.(\w+)\)/g, "$1").replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "").replace(/(Object\.)?__vite_ssr_export_default__\s?/g, "");
	return {
		method,
		file,
		line: Number.parseInt(lineNumber),
		column: Number.parseInt(columnNumber)
	};
}
function createStackString(stacks) {
	return stacks.map((stack) => {
		const line = `${stack.file}:${stack.line}:${stack.column}`;
		if (stack.method) return `    at ${stack.method}(${line})`;
		return `    at ${line}`;
	}).join("\n");
}
function parseStacktrace(stack, options = {}) {
	const { ignoreStackEntries = stackIgnorePatterns } = options;
	let stacks = !CHROME_IE_STACK_REGEXP.test(stack) ? parseFFOrSafariStackTrace(stack) : parseV8Stacktrace(stack);
	// remove vi.defineHelper's internal stacks
	const helperIndex = stacks.findLastIndex((s) => s.method.includes("__VITEST_HELPER__"));
	if (helperIndex >= 0) stacks = stacks.slice(helperIndex + 1);
	if (options.firstOnly) {
		for (const stack of stacks) {
			const mapped = mapStackFrame(stack, options, ignoreStackEntries);
			if (mapped) return [mapped];
		}
		return [];
	}
	return stacks.map((stack) => mapStackFrame(stack, options, ignoreStackEntries)).filter((s) => s != null);
}
function mapStackFrame(stack, options, ignoreStackEntries) {
	if (options.getUrlId) stack.file = options.getUrlId(stack.file);
	const map = options.getSourceMap?.(stack.file);
	if (!map || typeof map !== "object" || !map.version) return shouldFilter(ignoreStackEntries, stack.file) ? null : stack;
	const traceMap = new DecodedMap(map, stack.file);
	if (stack.line <= 0 || stack.column <= 0) return stack;
	const position = getOriginalPosition(traceMap, {
		line: stack.line,
		// stacktrace's column is 1-indexed, but sourcemap's one is 0-indexed
		column: stack.column - 1
	});
	if (!position) return stack;
	const { line, column, source, name } = position;
	let file = source || stack.file;
	if (/\/\w:\//.test(file)) file = file.slice(1);
	if (shouldFilter(ignoreStackEntries, file)) return null;
	if (line != null && column != null) return {
		line,
		column: column + 1,
		file,
		method: name || stack.method
	};
	return stack;
}
function shouldFilter(ignoreStackEntries, file) {
	return ignoreStackEntries.some((p) => file.match(p));
}
function parseFFOrSafariStackTrace(stack) {
	return stack.split("\n").map((line) => parseSingleFFOrSafariStack(line)).filter(notNullish);
}
function parseV8Stacktrace(stack) {
	return stack.split("\n").map((line) => parseSingleV8Stack(line)).filter(notNullish);
}
function parseErrorStacktrace(e, options = {}) {
	if (!e || isPrimitive(e)) return [];
	if ("stacks" in e && e.stacks) return e.stacks;
	const stackStr = e.stack || "";
	// if "stack" property was overwritten at runtime to be something else,
	// ignore the value because we don't know how to process it
	let stackFrames = typeof stackStr === "string" ? parseStacktrace(stackStr, options) : [];
	if (!stackFrames.length) {
		const e_ = e;
		if (e_.fileName != null && e_.lineNumber != null && e_.columnNumber != null) stackFrames = parseStacktrace(`${e_.fileName}:${e_.lineNumber}:${e_.columnNumber}`, options);
		if (e_.sourceURL != null && e_.line != null && e_._column != null) stackFrames = parseStacktrace(`${e_.sourceURL}:${e_.line}:${e_.column}`, options);
	}
	if (options.frameFilter) stackFrames = stackFrames.filter((f) => options.frameFilter(e, f) !== false);
	e.stacks = stackFrames;
	return stackFrames;
}
class DecodedMap {
	map;
	_encoded;
	_decoded;
	_decodedMemo;
	url;
	version;
	names = [];
	resolvedSources;
	constructor(map, from) {
		this.map = map;
		const { mappings, names, sources } = map;
		this.version = map.version;
		this.names = names || [];
		this._encoded = mappings || "";
		this._decodedMemo = memoizedState();
		this.url = from;
		this.resolvedSources = (sources || []).map((s) => resolve$1(from, "..", s || ""));
	}
}
function memoizedState() {
	return {
		lastKey: -1,
		lastNeedle: -1,
		lastIndex: -1
	};
}
function getOriginalPosition(map, needle) {
	const result = originalPositionFor(map, needle);
	if (result.column == null) return null;
	return result;
}

export { DecodedMap as D, TraceMap as T, getSafeTimers as a, serializeValue as b, createStackString as c, diffSequences as d, parseErrorStacktrace as e, parseSingleStack as f, getOriginalPosition as g, delay as h, generatedPositionFor as i, eachMapping as j, stackIgnorePatterns as k, originalPositionFor as o, parseStacktrace as p, setSafeTimers as s };
