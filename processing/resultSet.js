class ResultSet {
  constructor() {
    this.declareResultSet();
  }

  /*
   * ====================================================================
   *   DECLARE SECTION
   * ====================================================================
   */
  declareResultSet() {
    this.totalPins = 10;
    this.strike = this.totalPins;

    this.validRegularResultPatterns = [
      { pattern: "^[X]{1}$", validateBallThrowIndex: null },
      { pattern: "^[F0-9-][/]$", validateBallThrowIndex: null },
      { pattern: "^[F0-9-][F0-9-]$", validateBallThrowIndex: [0, 2] }
    ];
    this.validTenthFrameResultPatterns = [
      { pattern: "[X]{3}$", validateBallThrowIndex: null },
      { pattern: "^XX[F0-9-]$", validateBallThrowIndex: null },
      { pattern: "^X[F0-9-][F0-9-/]$", validateBallThrowIndex: [1, 3] },
      { pattern: "^[F0-9-][/][XF0-9-]$", validateBallThrowIndex: null },
      { pattern: "^[F0-9-][F0-9-]$", validateBallThrowIndex: [0, 2] }
    ];
    this.resultSymbolMapping = {
      X: () => this.strike,
      F: () => 0,
      "-": () => 0,
      "/": value => this.totalPins - value,
      " ": () => 0
    };
  }

  /*
   * ====================================================================
   *   PRIVATE METHODS
   * ====================================================================
   */
  /**
   * -------------------------------------------------------------------
   * Transform a result symbol to a numerical ball trow value
   * @param {*} resultSymbol
   * @param {*} previousThrowValue
   * -------------------------------------------------------------------
   */
  resultSymbolToValue(resultSymbol, previousThrowValue = 0) {
    return this.resultSymbolMapping[resultSymbol](previousThrowValue);
  }

  /**
   * --------------------------------------------------------------------
   * Validates the frame result against the total number of availble pins
   * -------------------------------------------------------------------
   */
  validatePinValue(frameResult) {
    let totalValue = 0;
    for (let ballThrow of frameResult) {
      if (!(ballThrow in this.resultSymbolMapping))
        totalValue = totalValue + parseInt(ballThrow);
    }
    if (totalValue > this.totalPins) return false;
    else return true;
  }

  /*
   * ====================================================================
   *   SETTERS
   * ====================================================================
   */
  set setFrameResult(balls) {
    this.frameResult = balls.toLocaleUpperCase();
  }

  /*
   * ====================================================================
   *   GETTERS
   * ====================================================================
   */

  get getBallValues() {
    return this.ballValues;
  }

  /*
   * ====================================================================
   *   PUBLIC METHODS
   * ====================================================================
   */

  /**
   * --------------------------------------------------------------------
   * Validate the entered frame result set
   * -------------------------------------------------------------------
   */
  validateResult(frameResult, isTenthFrame = false) {
    frameResult = frameResult.toLocaleUpperCase();

    let isValidResult = false;
    const resultPatternSet = isTenthFrame
      ? this.validTenthFrameResultPatterns
      : this.validRegularResultPatterns;

    for (let currentTest of resultPatternSet) {
      const { pattern, validateBallThrowIndex } = currentTest;
      const ballThrowPattern = new RegExp(pattern);
      if (ballThrowPattern.test(frameResult)) {
        //We have found a valid matching result pattern
        //Based on this result do we need to do any addition validation
        if (validateBallThrowIndex) {
          const testThrowPair = frameResult.substring(
            validateBallThrowIndex[0],
            validateBallThrowIndex[1]
          );
          isValidResult = this.validatePinValue(testThrowPair);
        } else {
          isValidResult = true;
        }
        break;
      }
    }

    return isValidResult;
  }

  /**
   * --------------------------------------------------------------------
   * Parses the result set on the frame  - **this.frameResult**
   * into corresponding throw values  - **this.ballValues**
   * -------------------------------------------------------------------
   */
  parseResultSet() {
    let lastThrowValue = 0;
    let ballThrows = [];
    for (let ballThrow of this.frameResult) {
      if (ballThrow in this.resultSymbolMapping) {
        ballThrows.push(this.resultSymbolToValue(ballThrow, lastThrowValue));
      } else {
        ballThrows.push(parseInt(ballThrow));
      }
      if (ballThrows.length >= 1)
        lastThrowValue = ballThrows[ballThrows.length - 1];
      // With the exception of the 10th Frame
      //Ensure a strike score one strike value in the array - [10]
      if (
        ballThrows.length === 1 &&
        ballThrows[0] === this.strike &&
        this.frameCount < this.totalFrames
      )
        break;
    }
    this.ballValues = ballThrows;
  }
}

module.exports = ResultSet;
