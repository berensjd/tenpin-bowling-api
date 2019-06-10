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
    this.validRegularResultPattern = "^[XF0-9-]{1}[F0-9-/]?$";
    this.validTenthFrameResultPatterns = [
      { pattern: "[X]{3}", validateBallThrowIndex: null },
      { pattern: "[XX[F0-9-]", validateBallThrowsIndex: null },
      { pattern: "X[F0-9-][F0-9-/]", validateBallThrowsIndex: [1, 2] },
      { pattern: "[F0-9][/][XF0-9]", validateBallThrowsIndex: [1, 2] }
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
  //Public Method in develpoment
  validateResult(isTenthFrame = false) {
    if (!isTenthFrame) {
      const ballThrowPattern = new RegExp(this.validRegularResultPattern);
      if (!ballThrowPattern.test(this.frameResult)) return false;
      return this.validatePinValue();
    } else {
      //todo - perform deep pattern matching onj the 10th frame
      //todo - depending on the given match perform addition ball pair value checks
    }
  }

  /**
   * --------------------------------------------------------------------
   * Validates the frame result agains the total number of availble pins
   * -------------------------------------------------------------------
   */
  validatePinValue() {
    let totalValue = 0;
    for (let ballThrow of this.frameResult) {
      if (!(ballThrow in this.resultSymbolMapping))
        totalValue = totalValue + parseInt(ballThrow);
    }
    if (totalValue > this.totalPins) return false;
    else return true;
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
